const aws        = require('aws-sdk'),
      cloudfront = new aws.CloudFront()

const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
)

const getDistributionId = (list, bucket) => (
  list.DistributionList.Items[[].concat.apply([],
    list.DistributionList.Items
      .map(e => e.Origins.Items)
      .map(e => e.map(i => i.Id.substring(3)))).findIndex(i => i === bucket)].Id
)

const invalidateBucket = bucket => {
  listDistributions()
    .then(r => {
      cloudfront.createInvalidation({
        DistributionId: getDistributionId(r, bucket),
        InvalidationBatch: {
          CallerReference: Date.now().toString(),
          Paths: {
            Quantity: 1,
            Items: ['/*']
          }
        }
      }, (err, data) => {
        err ? console.log(err)
            : console.log(data)
      })
    })
    .catch(e => console.log(e))
}

module.exports.invalidateBucket = invalidateBucket
