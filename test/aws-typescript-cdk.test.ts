import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsTypescriptCdkStack } from '../lib/aws-typescript-cdk-stack';

test('S3 bucket created', () => {
  const app = new App();

  const stack = new AwsTypescriptCdkStack(app, 'test-stack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
});

test('Lambda function created', () => {
  const app = new App();

  const stack = new AwsTypescriptCdkStack(app, 'test-stack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Architectures: ['arm64'],
    MemorySize: 1024
  });
});

test('REST API created', () => {
  const app = new App();

  const stack = new AwsTypescriptCdkStack(app, 'test-stack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'POST'
  });
});
