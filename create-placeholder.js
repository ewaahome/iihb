// Script to create placeholder SVG files
const fs = require('fs');
const path = require('path');

console.log('🎨 Creating placeholder images...');

// Function to create an SVG placeholder
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
fs.writeFileSync(path.join(publicDir, 'placeholder.svg'), mainPlaceholder);
console.log('✅ Created placeholder.svg');

// Create city-specific placeholders
const cities = [
  { name: 'الرياض', color: '#e1f5fe' },
  { name: 'جدة', color: '#e8f5e9' },
  { name: 'مكة', color: '#fff3e0' },
  { name: 'المدينة المنورة', color: '#f3e5f5' },
  { name: 'الدمام', color: '#e0f2f1' }
];

// Create cities directory if it doesn't exist
const citiesDir = path.join(publicDir, 'images', 'cities');
if (!fs.existsSync(citiesDir)) {
  fs.mkdirSync(citiesDir, { recursive: true });
  console.log('📁 Created images/cities directory');
}

// Create a placeholder for each city
cities.forEach(city => {
  const fileName = city.name.toLowerCase().replace(/\s+/g, '_') + '.svg';
  const cityPlaceholder = createSvgPlaceholder(600, 400, city.color, '#333333', city.name);
  fs.writeFileSync(path.join(citiesDir, fileName), cityPlaceholder);
  console.log(`✅ Created ${fileName}`);
});

console.log('🎉 All placeholder images created successfully!'); 