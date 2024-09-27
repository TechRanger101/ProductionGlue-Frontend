import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
      IndexName: "type-rating-index",
      Limit: 3,
      KeyConditionExpression: "#type = :type AND #rating >= :rating",
      ExpressionAttributeNames: {
        "#type": "type",
        "#rating": "rating",
      },
      ExpressionAttributeValues: {
        ":type": "venue",
        ":rating": '4',
      },
      ScanIndexForward: false,
    })
  );

  // console.log("response ", response);

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
      venues: response.Items,
    },
    {
      status: 200,
    }
  );
}
