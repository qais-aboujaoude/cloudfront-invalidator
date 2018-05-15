#!/usr/bin/env node
const program    = require('commander')
      cloudfront = require('./src/cloudfront')

program
  .version('1.0.0')
  .option('-b, --bucket [bucket]', 'Name of S3 Bucket to invalidate')
  .parse(process.argv)

program.bucket 
  ? cloudfront.invalidateBucket(program.bucket)
  :  (() => { throw new Error('No S3 Bucket provided') })()