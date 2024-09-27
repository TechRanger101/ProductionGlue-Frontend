import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await ddbDocClient.send(
    new QueryCommand({ 
      TableName: "VenuesAndVendors",
      IndexName: "type-rating-index",
      Limit: 3,
      KeyConditionExpression: "#type = :type AND #rating >= :rating",
      ScanIndexForward: false,
      ExpressionAttributeNames: {
        "#type": "type",
        "#rating": "rating",
      },
      ExpressionAttributeValues: {
        ":type": "vendor",
        ":rating": '4',
      },
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
      message: `Vendors fetched successfully`,
      vendors: response.Items,
    },
    {
      status: 200,
    }
  );
}
