// Setup script to ensure schema.prisma is in the correct location
const fs = require('fs');
const path = require('path');

console.log('🔍 Running setup script to ensure Prisma schema is properly set up...');

// Create necessary directories for Netlify
if (process.env.NETLIFY === 'true') {
  const directories = [
    'netlify/functions',
    '.netlify/functions-internal'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Creating directory for Netlify: ${dir}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// Check if schema.prisma exists in the root or prisma directory
const rootSchemaPath = path.join(process.cwd(), 'schema.prisma');
const prismaDir = path.join(process.cwd(), 'prisma');
const prismaSchemaPath = path.join(prismaDir, 'schema.prisma');

// Create prisma directory if it doesn't exist
if (!fs.existsSync(prismaDir)) {
  console.log('📁 Creating prisma directory...');
  fs.mkdirSync(prismaDir, { recursive: true });
  console.log('✅ Created prisma directory');
}

// Copy schema from root to prisma directory if needed
if (fs.existsSync(rootSchemaPath)) {
  console.log('📄 Found schema.prisma in root, copying to prisma directory...');
  fs.copyFileSync(rootSchemaPath, prismaSchemaPath);
  console.log('✅ Copied schema.prisma to prisma directory');
} else if (!fs.existsSync(prismaSchemaPath)) {
  // Create a basic schema if none exists
  console.log('⚠️ No schema.prisma found, creating basic schema...');
  const basicSchema = `// Basic Prisma schema for MongoDB
generator client {
  provider        = "prisma-client-js"
  binaryTargets   = ["native", "rhel-openssl-1.0.x"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Basic models for the application
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}`;
  
  fs.writeFileSync(prismaSchemaPath, basicSchema);
  console.log('✅ Created basic schema.prisma in prisma directory');
}

// Create an empty Netlify function if we're in Netlify
if (process.env.NETLIFY === 'true') {
  const functionsDir = path.join(process.cwd(), 'netlify/functions');
  const indexFunctionPath = path.join(functionsDir, 'index.js');
  
  if (!fs.existsSync(indexFunctionPath)) {
    console.log('📄 Creating basic Netlify function...');
    const basicFunction = `// Simple Netlify function
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!'
    })
  };
};`;
    
    fs.writeFileSync(indexFunctionPath, basicFunction);
    console.log('✅ Created basic Netlify function');
  }
}

console.log('✅ Setup complete, Prisma schema is properly configured'); 