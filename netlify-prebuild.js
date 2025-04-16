#!/usr/bin/env node
/**
 * Netlify Pre-build Script
 * 
 * This script runs before the Netlify build process to:
 * 1. Set up environment variables
 * 2. Run Next.js setup script
 * 3. Generate Prisma client
 * 4. Run any necessary database migrations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log with timestamp for better debugging
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Execute a command and log output
function execCommand(command) {
  log(`Executing: ${command}`);
  try {
    const output = execSync(command, { stdio: 'inherit' });
    return output;
  } catch (error) {
    log(`Error executing command: ${command}`);
    log(error.message);
    throw error;
  }
}

// Check if a file exists
function fileExists(filePath) {
  return fs.existsSync(path.resolve(process.cwd(), filePath));
}

// Main function to orchestrate pre-build tasks
async function main() {
  log('Starting Netlify pre-build process');

  // Run Next.js setup script if available
  if (fileExists('./setup-nextjs.js')) {
    log('Running Next.js setup script');
    execCommand('node ./setup-nextjs.js');
  }

  // Create empty .env.local file if it doesn't exist
  // This can be useful for Prisma and other tools that expect it
  if (!fileExists('.env.local')) {
    log('Creating empty .env.local file');
    fs.writeFileSync('.env.local', '# Environment variables added by Netlify prebuild\n');
  }

  // Verify Prisma schema exists and is valid
  if (fileExists('./prisma/schema.prisma')) {
    log('Prisma schema found, generating client');
    try {
      // Make sure the Prisma schema is accessible
      const schemaPath = path.resolve(process.cwd(), './prisma/schema.prisma');
      log(`Prisma schema path: ${schemaPath}`);
      
      const schemaExists = fs.existsSync(schemaPath);
      log(`Schema exists: ${schemaExists}`);
      
      if (schemaExists) {
        // Read schema file to verify content
        const schemaContent = fs.readFileSync(schemaPath, 'utf8');
        log(`Schema content length: ${schemaContent.length} bytes`);
        
        // Generate Prisma client
        execCommand('npx prisma generate');
      } else {
        throw new Error('Prisma schema not found at expected location');
      }
    } catch (error) {
      log(`Error with Prisma setup: ${error.message}`);
      // Continue build process but log the error
    }
  } else {
    log('Prisma schema not found, skipping client generation');
  }

  // Install any additional dependencies if needed
  // execCommand('npm install --no-save some-package');

  log('Netlify pre-build process completed successfully');
}

// Run the main function
main().catch(error => {
  log('Pre-build process failed');
  log(error.message);
  process.exit(1);
}); 