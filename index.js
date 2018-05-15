#!/usr/bin/env node
const cloudfront = require('./src/cloudfront')

const distributionItems = list => list.DistributionList.Items.map(e => e.Origins.Items)

// cloudfront.invalidateBucket('haulo-admin-client-testing')