const aws = require('aws-sdk')
const codepipeline = new aws.CodePipeline()

module.exports = {
  success: (jobId, message) => {
    const params = {
      jobId: jobId
    }
    codepipeline.putJobSuccessResult(params, (err, data) => {
      if(err) {
        context.fail(err)
      } else {
        context.succeed(message)
      }
    })
  },
  
  failure: (jobId, invokeid, message) => {
    const params = {
      jobId: jobId,
      failureDetails: {
        message: JSON.stringify(message),
        type: 'JobFailed',
        externalExecutionId: invokeid
      }
    }
    codepipeline.putJobFailureResult(params, (err, data) => {
      context.fail(message, err)
    })
  }
}