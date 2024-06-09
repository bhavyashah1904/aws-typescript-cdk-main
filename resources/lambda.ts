import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const s3Client = new S3Client({
  region: 'REGION'
});

export const handler = async (event: APIGatewayProxyEventV2)=> {
  const fileName = event.queryStringParameters?.fileName;

  const body = JSON.parse(event.body ?? '[]');
  const csv = convertToCSV(body);

  const command = new PutObjectCommand(
  {
    Key: fileName,
    Bucket: process.env.BUCKET,
    Body: csv
  });

  await s3Client.send(command);

  return {
    statusCode: 202
  }
}

function convertToCSV(arr: string[]) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n');
}
