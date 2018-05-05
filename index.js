const aws = require('aws-sdk'),
      log = require('./utils'),
      cloudfront = new aws.CloudFront()
const dist = 'S3-haulo-admin-client-testing'
const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err)
          : resolve(data)
    })
  })
)
listDistributions()
  .then(r => {
    const m = r.DistributionList.Items.map(e => e.Origins.Items)
    console.log(m[0][0])
    console.log(m[0][0].Id)
    const x = m.map(e => e.map(i => i.Id))
    log(x)
  })
  .catch(e => log(e))

