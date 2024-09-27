import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
      Limit: 5,
      IndexName: "createdBy-type-index",
      KeyConditionExpression: "#createdBy = :createdBy and #type = :type",
      ExpressionAttributeNames: {
        "#createdBy": "createdBy",
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":createdBy": "admin",
        ":type": "vendor",
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch vendors",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const response2 = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
      Limit: 5,
      IndexName: "createdBy-type-index",
      KeyConditionExpression: "#createdBy = :createdBy and #type = :type",
      ExpressionAttributeNames: {
        "#createdBy": "createdBy",
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":createdBy": "admin",
        ":type": "venue",
      },
    })
  );

  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch venues",
        data: response2,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const data =
    response.Items && response2.Items
      ? [...response.Items, ...response2.Items]
      : [];

  return NextResponse.json(
    {
      message: "Successfully fetched vendors and venues",
      data: data,
      status: 200,
    },
    {
      status: 200,
    }
  );
}
