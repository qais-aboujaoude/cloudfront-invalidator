const util = require('util')
const aws = require('aws-sdk')
      cloudfront = new aws.CloudFront()

cloudfront.listDistributions({}, function (err, data) {
  err ? console.log(err) : console.log(util.inspect(data, {showHidden: false, depth: null}))
})


