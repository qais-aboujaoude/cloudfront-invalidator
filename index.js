#!/usr/bin/env node
const util = require('util')
const log = o => console.log(util.inspect(o, false, null))

const cloudfront = require('./src/cloudfront')
const distributionItems = list => list.DistributionList.Items.map(e => e.Origins.Items)

cloudfront.listDistributions()
  .then(r => {
    log(distributionItems(r))
  })
  .catch(e => log(e))

