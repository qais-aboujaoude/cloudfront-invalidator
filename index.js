#!/usr/bin/env node
const program    = require('commander')
      cloudfront = require('./src/cloudfront')

program
  .version('1.0.0')
  .option('-b, --bucket [bucket]', 'Name of S3 Bucket to invalidate')
  .parse(process.argv)

program.bucket.length
  ? (() => {
    const buckets = process.argv.splice(3)
    buckets.forEach(async e => await cloudfront.invalidateBucket((e)))
  })()
  : (() => { throw new Error('No S3 Bucket provided') })()

