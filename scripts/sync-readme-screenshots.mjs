import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const readmePath = path.join(root, "README.md");
const screenshotsDir = path.join(root, "docs/screenshots");

const SCREENSHOTS = [
  { file: "01-landing.png", label: "Landing" },
  { file: "02-demo-page.png", label: "Demo page" },
  { file: "03-dashboard.png", label: "Dashboard" },
  { file: "04-create-request.png", label: "Create request" },
  { file: "05-request-escrow.png", label: "Request escrow" },
  { file: "06-profile.png", label: "Profile" },
  { file: "07-qie-pass-badge.png", label: "QIE Pass badge" },
  { file: "08-qie-ecosystem.png", label: "QIE ecosystem" },
];

const START = "<!-- SCREENSHOTS_START -->";
const END = "<!-- SCREENSHOTS_END -->";

let readme = fs.readFileSync(readmePath, "utf8");
const lines = [];

for (const { file, label } of SCREENSHOTS) {
  const fullPath = path.join(screenshotsDir, file);
  if (fs.existsSync(fullPath)) {
    lines.push(`![${label}](docs/screenshots/${file})`);
  }
}

const block =
  lines.length > 0
    ? lines.join("\n") + "\n"
    : "_No screenshot files in docs/screenshots/ yet. Run this script after adding PNGs._\n";

const replacement = `${START}\n${block}${END}`;

if (!readme.includes(START) || !readme.includes(END)) {
  console.error("README.md missing SCREENSHOTS_START/END markers");
  process.exit(1);
}

readme = readme.replace(
  new RegExp(`${START}[\\s\\S]*?${END}`, "m"),
  replacement
);
fs.writeFileSync(readmePath, readme);
console.log(
  lines.length > 0
    ? `Embedded ${lines.length} screenshot(s) in README.md`
    : "Cleared screenshot embeds (no PNG files found)"
);
