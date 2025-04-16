/**
 * Script to prepare a simple static site for Netlify Drop
 * This creates a standalone HTML site that can be directly dropped into Netlify
 */

const fs = require('fs');
const path = require('path');

// Function to recursively remove directory
function deleteFolderRecursive(pathToDelete) {
  if (fs.existsSync(pathToDelete)) {
    fs.readdirSync(pathToDelete).forEach((file) => {
      const curPath = path.join(pathToDelete, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recurse
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathToDelete);
  }
}

console.log('🚀 Preparing files for Netlify Drop...');

// Directory for the static files
const dropDir = path.join(process.cwd(), 'netlify-drop');
if (fs.existsSync(dropDir)) {
  // Clean the directory first to ensure no old files remain
  console.log('🧹 Cleaning netlify-drop directory...');
  deleteFolderRecursive(dropDir);
}

// Recreate the directory
console.log('📁 Creating netlify-drop directory...');
fs.mkdirSync(dropDir, { recursive: true });

// Create _redirects file for SPA routing - THE MOST IMPORTANT FILE
console.log('📄 Creating _redirects file...');
// This specific format is crucial for Netlify SPA routing
const redirectsContent = `/*    /index.html   200`;
fs.writeFileSync(path.join(dropDir, '_redirects'), redirectsContent);

// Create _headers file for caching and security
console.log('📄 Creating _headers file...');
const headersContent = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable`;
fs.writeFileSync(path.join(dropDir, '_headers'), headersContent);

// Create netlify.toml with minimal configuration
console.log('📄 Creating netlify.toml file...');
const netlifyTomlContent = `# Static site configuration for Netlify Drop
[build]
  publish = "."
  command = "echo 'No build command needed for static site'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true

# Cache headers for assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "same-origin"`;
fs.writeFileSync(path.join(dropDir, 'netlify.toml'), netlifyTomlContent);

// Create a minimal package.json file
console.log('📄 Creating package.json file...');
const packageJsonContent = `{
  "name": "eiwaa-home-static",
  "version": "1.0.0",
  "private": true,
  "description": "Static website for Eiwaa Home",
  "scripts": {
    "start": "echo 'This is a static site, no server needed.'"
  },
  "dependencies": {},
  "engines": {
    "node": ">=14.x"
  }
}`;
fs.writeFileSync(path.join(dropDir, 'package.json'), packageJsonContent);

// Create assets directory
console.log('📁 Creating assets directory...');
const assetsDir = path.join(dropDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

// Create a simple placeholder SVG logo
console.log('📄 Creating logo image...');
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <style>
    .text { font-family: Arial, sans-serif; font-weight: bold; fill: #F43F5E; }
    .house { fill: #F43F5E; }
  </style>
  <rect width="200" height="200" fill="white" rx="20" ry="20"/>
  <path class="house" d="M50,110 L50,160 L150,160 L150,110 L100,70 Z" />
  <path class="house" d="M75,160 L75,130 L125,130 L125,160 Z" fill="white" />
  <text x="100" y="190" text-anchor="middle" class="text" font-size="24">إيواء هوم</text>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'logo.svg'), logoSvg);

// Create a simple CSS file to ensure proper structure
console.log('📄 Creating styles.css file...');
const cssContent = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Tajawal', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #F43F5E;
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-left: 10px;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-image {
  width: 200px;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #F43F5E;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.cta-button {
  background-color: #F43F5E;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #E11D48;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #F43F5E;
}

footer {
  background-color: #333;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}`;
fs.writeFileSync(path.join(dropDir, 'styles.css'), cssContent);

// Create a simple JS file
console.log('📄 Creating script.js file...');
const jsContent = `document.addEventListener('DOMContentLoaded', function() {
  console.log('Eiwaa Home website loaded successfully');
  
  // Add click event listeners to buttons
  const buttons = document.querySelectorAll('.cta-button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Thank you for your interest! This is a demo site.');
    });
  });

  // Handle SPA routing
  function handleRoute() {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      console.log('Handling route:', path);
      // You can implement specific route handling here
      // For now, we'll just ensure the main content is shown
      document.querySelector('main').style.display = 'block';
    }
  }

  // Run on page load
  handleRoute();

  // Handle browser navigation events
  window.addEventListener('popstate', handleRoute);
});`;
fs.writeFileSync(path.join(dropDir, 'script.js'), jsContent);

// Create 404.html file
console.log('📄 Creating 404.html file...');
const notFoundHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | إيواء هوم</title>
  <meta http-equiv="refresh" content="0;url=/">
  <style>
    body {
      font-family: 'Tajawal', sans-serif;
      background-color: #f5f5f5;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    h1 {
      color: #F43F5E;
    }
  </style>
</head>
<body>
  <h1>جاري التحويل...</h1>
  <p>سيتم توجيهك إلى الصفحة الرئيسية تلقائياً.</p>
  <script>
    window.location.href = '/';
  </script>
</body>
</html>`;
fs.writeFileSync(path.join(dropDir, '404.html'), notFoundHtmlContent);

// Update the index.html to use external CSS and JS files
console.log('📄 Creating a simpler version of index.html with external files...');
const simpleHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eiwaa Home</title>
    <meta name="description" content="Your Home in Saudi Arabia">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="icon" href="assets/logo.svg" type="image/svg+xml">
    <!-- Prevent 404 issues with common favicon requests -->
    <link rel="shortcut icon" href="assets/logo.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="assets/logo.svg">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="assets/logo.svg" alt="Eiwaa Home Logo">
                إيواء هوم
            </div>
            <div>
                <button class="cta-button">تسجيل الدخول</button>
            </div>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <img src="assets/logo.svg" alt="Eiwaa Home" class="hero-image">
            <h1>أهلاً بك في إيواء هوم</h1>
            <p>منصتك المثالية للعثور على المنزل المناسب في السعودية</p>
            <button class="cta-button">استكشف العقارات</button>
        </section>
        
        <section class="features">
            <div class="feature-card">
                <h2 class="feature-title">عقارات متميزة</h2>
                <p>اكتشف مجموعة واسعة من العقارات المتميزة في جميع أنحاء المملكة العربية السعودية.</p>
            </div>
            <div class="feature-card">
                <h2 class="feature-title">حجز سريع</h2>
                <p>عملية حجز سهلة وسريعة تتيح لك الانتقال إلى منزلك الجديد بكل سهولة.</p>
            </div>
            <div class="feature-card">
                <h2 class="feature-title">تجربة مميزة</h2>
                <p>نقدم لك تجربة مميزة من البحث حتى الانتقال إلى منزلك الجديد.</p>
            </div>
        </section>
    </main>
    
    <footer>
        <p>جميع الحقوق محفوظة &copy; 2024 إيواء هوم</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(dropDir, 'index.html'), simpleHtmlContent);

console.log('✅ Files prepared successfully for Netlify Drop!');
console.log('📋 Instructions:');
console.log('1. Go to https://app.netlify.com/drop');
console.log('2. Drag and drop the "netlify-drop" folder');
console.log('3. Your site will be deployed with proper routing'); 