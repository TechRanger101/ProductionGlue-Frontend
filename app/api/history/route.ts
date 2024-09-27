import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const QueryResult: any[] = [];
  let startKey = undefined;
  let response;

  do {
    response = await ddbDocClient.send(
      new QueryCommand({
        TableName: "SharedVenueVendor",
        Limit: 100,
        ExclusiveStartKey: startKey,
        IndexName: "sendBy-index",
        KeyConditionExpression: "#sendBy = :sendBy",
        ExpressionAttributeNames: {
          "#sendBy": "sendBy",
        },
        ExpressionAttributeValues: {
          ":sendBy": "admin",
        },
      })
    );
    response?.Items?.forEach((item) => QueryResult.push(item));

    startKey = response.LastEvaluatedKey;
  } while (typeof startKey != "undefined");

  return NextResponse.json(
    {
      status: 200,
      message: `History fetched successfully`,
      history: QueryResult,
    },
    {
      status: 200,
    }
  );
}
