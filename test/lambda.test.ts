import { S3Client } from '@aws-sdk/client-s3';
import { handler } from '../resources/lambda';

jest.mock('@aws-sdk/client-s3');

const send = jest.mocked(S3Client.prototype.send);

beforeEach(() => send.mockClear());

test('POST convert JSON request to CSV file', async () => {
  const request: any = {
    queryStringParameters: {
      fileName: 'test-file-name'
    },
    body: '[{"a": "test"}]'
  };

  const response = await handler(request);

  expect(response.statusCode).toBe(202);
  expect(send).toHaveBeenCalled();
});
