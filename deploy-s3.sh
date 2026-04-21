#!/bin/bash
# ============================================================
# S3 Deployment Script for React/Vite SPA
# Usage: ./deploy-s3.sh YOUR_BUCKET_NAME YOUR_AWS_REGION
# Example: ./deploy-s3.sh thestarrypath.com.au ap-southeast-2
# ============================================================

BUCKET_NAME=${1:-"thestarrypath.com.au"}
AWS_REGION=${2:-"ap-southeast-2"}
CF_DISTRIBUTION_ID="EKVV8ZPV9ZX2P"

echo "🔍 Using bucket: $BUCKET_NAME in region: $AWS_REGION"
echo ""

echo "🚀 Building project..."
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Aborting."
  exit 1
fi

echo ""
echo "🗑️  Clearing old files from S3 bucket: s3://$BUCKET_NAME"
aws s3 rm s3://$BUCKET_NAME --recursive --region $AWS_REGION

echo ""
echo "📦 Uploading HTML files (no cache)..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading JavaScript files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading CSS files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading SVG files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.svg" \
  --content-type "image/svg+xml" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading PNG files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.png" \
  --content-type "image/png" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading font files (TTF)..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.ttf" \
  --content-type "font/ttf" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading font files (WOFF2)..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.woff2" \
  --content-type "font/woff2" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

echo ""
echo "📦 Uploading ICO, JSON, and remaining files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --exclude "*.html" \
  --exclude "*.js" \
  --exclude "*.css" \
  --exclude "*.svg" \
  --exclude "*.png" \
  --exclude "*.ttf" \
  --exclude "*.woff2" \
  --region $AWS_REGION

echo ""
echo "✅ Upload complete!"
echo ""
echo "⚡ Invalidating CloudFront cache (Distribution: $CF_DISTRIBUTION_ID)..."
aws configure set region us-east-1
aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths "/*"
aws configure set region $AWS_REGION
echo ""
echo "🎉 All done! Your site should be live in ~1-2 minutes at https://thestarrypath.com.au"

