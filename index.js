const aws = require('aws-sdk'),
  cloudfront = new aws.CloudFront()

const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
)

const params =  JSON.parse(event["CodePipeline.job"].data.actionConfiguration
  .configuration.UserParameters)
listDistributions()
  .then(r => {
    const distributionItems = r.DistributionList.Items.map(e => e.Origins.Items)
    const listOfOrigins = [].concat.apply([],
      distributionItems.map(e => e.map(i => i.Id.substring(3))))
    const distributionId = r.DistributionList.Items[listOfOrigins.findIndex(i => i === params.S3Bucket)].Id
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
      err ? putJob.failure(event["CodePipeline.job"].id, context.invokeid, err)
        : putJob.success(event["CodePipeline.job"].id,'Success: invalidated')
    })
  })
  .catch(e => putJob.failure(event["CodePipeline.job"].id, context.invokeid, e))

