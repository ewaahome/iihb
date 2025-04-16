# Netlify Drop Deployment Guide

This guide explains how to prepare your files for Netlify Drop (drag & drop deployment).

## Step 1: Build Your Site

First, build your site to generate static files:

```bash
npm run build
```

This will create the `out` directory with all your static files.

## Step 2: Prepare Files for Drag & Drop

1. Take the contents of the `out` directory
2. The `out` directory contains all the HTML, CSS, JS, and assets needed for your site
3. These files are ready for drag and drop deployment

## Step 3: Deploy with Netlify Drop

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your `out` directory onto the drop zone
3. Netlify will automatically deploy your site and provide a URL

## Additional Files to Include

For proper functionality, make sure these files are in your deployment:

- `_redirects` file (if you have custom redirects)
- `netlify.toml` (which contains configuration for SPA redirect and function settings)

## After Deployment

After deploying, you can:

1. Set a custom domain
2. Configure environment variables in the Netlify dashboard
3. Set up continuous deployment from your Git repository

## Important Notes

- SPA routing has been configured in the `netlify.toml` file
- API requests to `/api/*` will be routed to Netlify Functions
- Static assets have proper caching headers 