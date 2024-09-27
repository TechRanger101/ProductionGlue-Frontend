import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
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
      "Select": "COUNT"   
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch venues",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `Venues fetched successfully`,
      data: response.Count,
    },
    {
      status: 200,
    }
  );
}
