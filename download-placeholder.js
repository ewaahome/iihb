// Script to create a placeholder image locally
const fs = require('fs');
const path = require('path');

console.log('🎨 Creating placeholder image...');

// Function to create a simple placeholder SVG
function createSvgPlaceholder(width, height, bgColor, textColor, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" 
      dominant-baseline="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('📁 Created public directory');
}

// Create a main placeholder image
const mainPlaceholder = createSvgPlaceholder(600, 400, '#f5f5f5', '#333333', 'Ewaa Home');
fs.writeFileSync(path.join(publicDir, 'placeholder.jpg'), mainPlaceholder);
console.log('✅ Created placeholder.jpg'); 