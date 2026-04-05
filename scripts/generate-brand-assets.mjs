/**
 * Rasterizes SVG brand assets to PNG + favicon.ico (run after SVG edits).
 * Usage: node scripts/generate-brand-assets.mjs
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const pngToIco = require("png-to-ico");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public");

async function main() {
  const iconSvg = fs.readFileSync(path.join(pub, "logo-icon.svg"));
  const ogSvg = fs.readFileSync(path.join(pub, "og-source.svg"));

  for (const s of [16, 32, 192, 512]) {
    await sharp(iconSvg).resize(s, s).png().toFile(path.join(pub, `favicon-${s}x${s}.png`));
  }

  await sharp(iconSvg).resize(512, 512).png().toFile(path.join(pub, "app-icon.png"));
  await sharp(iconSvg).resize(512, 512).png().toFile(path.join(pub, "logo.png"));
  await sharp(ogSvg).png().toFile(path.join(pub, "og-image.png"));

  const buf16 = await sharp(iconSvg).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(iconSvg).resize(32, 32).png().toBuffer();
  const ico = await pngToIco([buf16, buf32]);
  fs.writeFileSync(path.join(pub, "favicon.ico"), ico);

  console.log("Brand PNGs and favicon.ico written to public/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
