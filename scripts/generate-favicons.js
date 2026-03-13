import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import os from 'os';

const OUT = path.join(os.tmpdir(), 'dag-favicons');
fs.mkdirSync(OUT, { recursive: true });

// Create a 512x512 base icon matching the DAG logo
const size = 512;
const padding = 60;
const barWidth = 50;
const barGap = 20;
const barCount = 5;
const totalBarsWidth = barCount * barWidth + (barCount - 1) * barGap;
const startX = Math.round((size - totalBarsWidth) / 2);
const maxBarHeight = size - padding * 2 - 40;
const barHeights = [0.35, 0.5, 0.65, 0.8, 1.0];

const barsSVG = barHeights.map((h, i) => {
  const x = startX + i * (barWidth + barGap);
  const barH = Math.round(maxBarHeight * h);
  const y = size - padding - barH;
  return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="8" fill="white"/>`;
}).join('\n  ');

const svgIcon = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5b6abf"/>
      <stop offset="100%" style="stop-color:#14b8a6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="80" fill="url(#bg)"/>
  ${barsSVG}
</svg>`;

const svgBuffer = Buffer.from(svgIcon);

// 32x32 light
const light32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
fs.writeFileSync(path.join(OUT, 'icon-light-32x32.png'), light32);
console.log('icon-light-32x32.png:', light32.length, 'bytes');
console.log('FAVICON_LIGHT_BASE64:' + light32.toString('base64'));

// 32x32 dark
const dark32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
fs.writeFileSync(path.join(OUT, 'icon-dark-32x32.png'), dark32);
console.log('icon-dark-32x32.png:', dark32.length, 'bytes');
console.log('FAVICON_DARK_BASE64:' + dark32.toString('base64'));

// 180x180 apple icon
const apple = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
fs.writeFileSync(path.join(OUT, 'apple-icon.png'), apple);
console.log('apple-icon.png:', apple.length, 'bytes');
console.log('APPLE_ICON_BASE64:' + apple.toString('base64'));

// OG image
const ogWidth = 1200;
const ogHeight = 630;
const logoSize = 200;

const resizedLogo = await sharp(svgBuffer).resize(logoSize, logoSize).png().toBuffer();

const ogTextSVG = Buffer.from(`<svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <text x="${ogWidth / 2}" y="${ogHeight / 2 + logoSize / 2 + 60}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="32" font-weight="600">Dental Associate Growth</text>
</svg>`);

const textOverlay = await sharp(ogTextSVG).png().toBuffer();

const og = await sharp({
  create: { width: ogWidth, height: ogHeight, channels: 4, background: { r: 15, g: 23, b: 42, alpha: 255 } }
})
  .composite([
    { input: resizedLogo, left: Math.round((ogWidth - logoSize) / 2), top: Math.round((ogHeight - logoSize) / 2 - 40) },
    { input: textOverlay, left: 0, top: 0 }
  ])
  .png()
  .toBuffer();
fs.writeFileSync(path.join(OUT, 'og-image.png'), og);
console.log('og-image.png:', og.length, 'bytes');
console.log('OG_IMAGE_BASE64:' + og.toString('base64'));

console.log('All generated to', OUT);
