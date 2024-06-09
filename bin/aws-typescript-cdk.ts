#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { AwsTypescriptCdkStack } from '../lib/aws-typescript-cdk-stack';

const app = new App();
new AwsTypescriptCdkStack(app, 'aws-typescript-cdk-stack', {
  env: { account: 'ACCOUNT_NUMBER', region: 'REGION' }
});
