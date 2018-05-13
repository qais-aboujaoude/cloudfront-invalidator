# EB-environment-manager

A command line tool that invalidates the cahce of a web hosting CloudFront distribution 
### Installing

install globally via npm:

```
npm i -g cloudfront-invalidator
```

### Usage

This program will assume the AWS region to be defined as a global variable.  

If the region is not defined as a global variable, then it will retrieve the region from the ~/.aws/credentials  or the ~/.aws/config. 

You can read more about how the aws-sdk handles the region [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html#setting-region-order-of-precedence)

Easiest way to switch/modify the region would be to set the AWS_REGION global variable

~~~
export AWS_REGION=<your region>
// example:
export AWS_REGION=us-west-2
~~~

Examples: 

## Built With

* [aws-sdk](https://aws.amazon.com/sdk-for-node-js/) - SDK for managing AWS resources

## Authors

* **Qais Aboujaoude** 

## License

This project is licensed under the Mozilla Public License MPL  License - see the [LICENSE.md](LICENSE.md) file for details
