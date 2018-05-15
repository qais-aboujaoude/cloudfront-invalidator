const aws        = require('aws-sdk'),
      cloudfront = new aws.CloudFront()

const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
)

const distributionItems = list => list.DistributionList.Items.map(e => e.Origins.Items)

listDistributions()
  .then(r => {
    const distributionItems = r.DistributionList
      .Items.map(e => e.Origins.Items)
    const listOfOrigins = [].concat.apply([],
      distributionItems.map(e => e.map(i => i.Id.substring(3))))
    const distributionId = r.DistributionList
      .Items[listOfOrigins.findIndex(i => i === arg)].Id
    cloudfront.createInvalidation({
      DistributionId: distributionId,
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

module.exports.listDistributions = listDistributions