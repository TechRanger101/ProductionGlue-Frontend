import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import {DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb'

const dbClient = new DynamoDBClient({
    region: process.env.NEXT_AUTH_AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_ACCESS_KEY || ''
    }
})

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDocClient = DynamoDBDocumentClient.from(dbClient, translateConfig);

export {ddbDocClient}