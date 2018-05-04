const util = require('util')
const aws = require('aws-sdk')
      cloudfront = new aws.CloudFront()
aws.config.setPromisesDependency();

const listDistributions = () => (
  new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      err ? reject(err)
          : resolve(data)
    })
  })
)
listDistributions()
  //.then(r => console.log(util.inspect(r, {showHidden: false, depth: null}))
  .then(r => console.log(r))
  .catch(e => console.log(e))

