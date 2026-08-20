#!/usr/bin/env node
// Minimal secret scanner — a deliberately small stand-in for a real tool
// (gitleaks, Trufflehog, GitHub Advanced Security's own scanner). It exists
// to make the point from AGENTS.md concrete: this check runs automatically,
// pre-commit AND in CI, so it can't be skipped by bypassing a local hook.
//
// Usage: node scripts/scan-secrets.mjs [files...]
// With no args, scans every tracked, non-ignored file in the repo.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const PATTERNS = [
  { name: "AWS Access Key ID", re: /AKIA[0-9A-Z]{16}/ },
  { name: "Generic API key assignment", re: /(api[_-]?key|secret|token)\s*[:=]\s*["'][A-Za-z0-9_-]{20,}["']/i },
  { name: "Private key header", re: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/ },
  { name: "Slack token", re: /xox[baprs]-[0-9A-Za-z-]{10,}/ },
];

const SKIP_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".ico", ".lock"]);

function getTargetFiles(argv) {
  if (argv.length > 0) return argv;
  try {
    const output = execSync("git ls-files", { encoding: "utf8" });
    return output.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function shouldSkip(path) {
  const dot = path.lastIndexOf(".");
  const ext = dot === -1 ? "" : path.slice(dot);
  return SKIP_EXTENSIONS.has(ext) || path.includes("node_modules/");
}

function scan(files) {
  const findings = [];
  for (const file of files) {
    if (shouldSkip(file)) continue;
    let content;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue; // deleted/staged-but-missing file, directory, etc.
    }
    const lines = content.split("\n");
    lines.forEach((line, idx) => {
      for (const { name, re } of PATTERNS) {
        if (re.test(line)) {
          findings.push({ file, line: idx + 1, pattern: name });
        }
      }
    });
  }
  return findings;
}

const files = getTargetFiles(process.argv.slice(2));
const findings = scan(files);

if (findings.length > 0) {
  console.error("\nscan-secrets: possible credential(s) found:\n");
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  [${f.pattern}]`);
  }
  console.error(
    "\nIf this is a false positive, rename the variable to avoid the pattern " +
      "or add a narrower rule — don't just remove the check.\n",
  );
  process.exit(1);
} else {
  console.log(`scan-secrets: clean (${files.length} files scanned).`);
}
