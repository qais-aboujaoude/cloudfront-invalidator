const aws = require('aws-sdk'),
      log = require('./utils'),
      cloudfront = new aws.CloudFront()

const dist = 'haulo-driver-client-master'

const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
)

listDistributions()
  .then(r => {
    const distributionItems = r.DistributionList.Items.map(e => e.Origins.Items)
    //const listOfOrigins = distributionItems.map(e => e.map(i => i.Id.substring(3)))
    //const kousa = [].concat.apply([], listOfOrigins)
    const listOfOrigins = [].concat.apply(
      [], distributionItems.map(e => e.map(i => i.Id.substring(3)))
    )
    //console.log(kousa.findIndex(i => i === dist))
    const distributionId = r.DistributionList.Items[listOfOrigins.findIndex(i => i === dist)].Id
    log(distributionId)

    cloudfront.createInvalidation({
      DistributionId: distributionId,
      InvalidationBatch: { 
        CallerReference: Date.now().toString(), 
        Paths: { 
          Quantity: 1, 
          Items: [
            '/*',
          ]
        }
      }
    }, (err, data) => {
      err ? console.log(err, err.stack)
          : console.log(data)
    })

  })
  .catch(e => log(e))

