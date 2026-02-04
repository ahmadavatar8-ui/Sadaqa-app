/**
 * Default Avatar Generator Script
 * 
 * This script creates a simple default avatar SVG that can be:
 * 1. Used directly as a data URL
 * 2. Uploaded to Cloudinary for permanent storage
 * 
 * Run: npx ts-node scripts/generate-default-avatar.ts
 */

import { uploadImage } from '../lib/cloudinary';
import fs from 'fs';
import path from 'path';

// Create SVG default avatar
const createDefaultAvatarSVG = (): string => {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#DFF5EE;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#c8ebe0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b5e0d3;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="200" cy="200" r="200" fill="url(#bg-gradient)"/>
  
  <!-- Silhouette Icon -->
  <g fill="#0F6B55" opacity="0.7" filter="url(#shadow)">
    <!-- Head -->
    <circle cx="200" cy="140" r="55"/>
    <!-- Body -->
    <ellipse cx="200" cy="320" rx="90" ry="80"/>
  </g>
</svg>
    `.trim();
};

// Save SVG locally
const saveSVGLocally = () => {
    const svg = createDefaultAvatarSVG();
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, 'default-avatar.svg');

    fs.writeFileSync(filePath, svg);
    console.log(`✅ Default avatar SVG saved to: ${filePath}`);
    console.log('   You can use this locally: /default-avatar.svg');
};

// Upload to Cloudinary
const uploadToCloudinary = async () => {
    const svg = createDefaultAvatarSVG();
    const buffer = Buffer.from(svg);

    try {
        const result = await uploadImage(buffer, 'sadaqa/default-avatar');
        console.log('✅ Uploaded to Cloudinary!');
        console.log(`   URL: ${result.url}`);
        console.log(`   Public ID: ${result.publicId}`);
        console.log('\n📝 Update lib/constants.ts with this URL:');
        console.log(`   export const DEFAULT_AVATAR_URL = '${result.url}';`);
    } catch (error) {
        console.error('❌ Upload failed:', error);
    }
};

// Main
const main = async () => {
    console.log('🎨 Generating Default Avatar...\n');

    // Save locally first
    saveSVGLocally();

    // Optionally upload to Cloudinary
    const shouldUpload = process.argv.includes('--upload');
    if (shouldUpload) {
        console.log('\n☁️  Uploading to Cloudinary...');
        await uploadToCloudinary();
    } else {
        console.log('\n💡 To upload to Cloudinary, run:');
        console.log('   npx ts-node scripts/generate-default-avatar.ts --upload');
    }
};

main();
