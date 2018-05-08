const aws = require('aws-sdk'),
      log = require('./utils'),
      cloudfront = new aws.CloudFront()
const dist = 'haulo-driver-client-master'

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
    const x = m.map(e => e.map(i => i.Id.substring(3)))
    log(x[0])
    const kousa = [].concat.apply([], x)
    log(kousa)
    console.log(kousa.includes(dist))
    console.log(kousa.findIndex(i => i === dist))
    console.log(r.DistributionList.Items[0].Id)
  })
  .catch(e => log(e))

