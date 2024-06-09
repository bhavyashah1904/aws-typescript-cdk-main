import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsCdkService } from './aws-cdk-service';

export class AwsTypescriptCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new AwsCdkService(this, 'cdk-service')
  }
}
