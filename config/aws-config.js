import AWS from 'aws-sdk';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig(); 
const {  AWS_ACCESS_KEY_ID ,AWS_SECRET_ACCESS_KEY,AWS_REGION} = publicRuntimeConfig;
const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey : AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
})

export { s3 };