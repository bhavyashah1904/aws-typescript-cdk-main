import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Function, Runtime, Code, Architecture } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class AwsCdkService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new Bucket(this, 's3-bucket');
    const handler = new Function(this, 'lambda-function', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset('resources'),
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      functionName: 'csv-file-lambda-uploader',
      handler: 'lambda.handler',
      timeout: Duration.seconds(5),
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler);

    const api = new RestApi(this, 'rest-api', {
      restApiName: 'csv-file-api-uploader',
      description: 'This service converts JSON requests to CSV files'
    });

    const apiIntegration = new LambdaIntegration(handler, {
      requestTemplates: {
        "application/json": '{ "statusCode": "202" }'
      }
    });

    api.root.addMethod('POST', apiIntegration);
  }
}
