/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== "node_modules" && f !== ".next" && f !== ".git") {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

function runScan() {
  console.log("Starting security scan based on security-rules.json...");

  // Check if .env file exists
  if (fs.existsSync(".env")) {
    console.error("Security Deviation: .env file found in repository root. Do not commit secrets!");
    process.exit(1);
  }

  // Load security-rules.json
  const rulesContent = fs.readFileSync("security-rules.json", "utf8");
  const rules = JSON.parse(rulesContent);
  const bannedPatterns = rules.security_standards.secrets.banned_patterns.map(
    (p) => new RegExp(p)
  );

  let hasViolations = false;

  walkDir("src", (filePath) => {
    // Only scan text-like source files
    if (!/\.(ts|tsx|js|jsx|json|css)$/.test(filePath)) return;

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, idx) => {
      bannedPatterns.forEach((regex) => {
        if (regex.test(line)) {
          console.error(
            `Security Deviation: Banned pattern match found in ${filePath}:${idx + 1}`
          );
          console.error(`  Line: ${line.trim()}`);
          hasViolations = true;
        }
      });
    });
  });

  if (hasViolations) {
    console.error("Security Scan FAILED. Fix the violations before building/committing.");
    process.exit(1);
  }

  console.log("Security Scan PASSED successfully.");
}

runScan();
