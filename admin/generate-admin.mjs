import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  'registrations',
  'ecells',
  'participants',
  'competitions',
  'schedule',
  'results',
  'leaderboard',
  'announcements',
  'users',
  'settings'
];

const basePath = path.join(__dirname, 'app', '(dashboard)');

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

for (const page of pages) {
  const pagePath = path.join(basePath, page);
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, { recursive: true });
  }

  const Title = page.charAt(0).toUpperCase() + page.slice(1);
  
  const content = `import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"

export default function ${Title}Page() {
  return (
    <div className="space-y-6">
      <SectionHeading title="${Title}" />
      <div className="p-6 bg-surface border border-border rounded-xl">
        <p className="text-text-secondary">Manage ${page} here.</p>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(path.join(pagePath, 'page.tsx'), content);
}
console.log("Admin pages created");
