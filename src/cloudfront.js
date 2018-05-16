process.env.AWS_SDK_LOAD_CONFIG = true

const aws        = require('aws-sdk'),
      cloudfront = new aws.CloudFront()

/**
 * @async
 * @method listDistributions A wrapper around Cf SDK listDistributions 
 * @return {Promise<{object}>} returns an object containing information about
 * all the distributions associated with the user account
 */
const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => 
      err ? reject(err) : resolve(data))
  })
)

/**
 * @method getDistributionId takes the object outcome of @method listDistributions
 * and checks against the bucket name @param bucket
 * and returns the distributionId ID of that bucket
 * @param {object} list list distributions object to iterate over
 * @param {string} bucket name of the bucket to check against
 * @return {string} Id of the bucket
 */
const getDistributionId = (list, bucket) => (
  list.DistributionList.Items[[].concat.apply([],
    list.DistributionList.Items
      .map(e => e.Origins.Items)
      .map(e => e.map(i => i.Id.substring(3)))).findIndex(i => i === bucket)].Id
)

/**
 * @async
 * @method invalidateBucket invalidates the distributions of the bucket 
 * calls @method listDistributions and @method getDistributionId to retrieve 
 * the Id and CF SDK @method createInvalidation to create an invalidation
 * @param {string} bucket name of the bucket to invalidate
 * @return {Promise<{object}>} data object of @method createInvalidation
 */
const invalidateBucket = bucket => (
  new Promise((resolve, reject) => {
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
        }, (err, data) => err ? reject(err) : resolve(data))
      })
  })
)

module.exports.invalidateBucket = invalidateBucket