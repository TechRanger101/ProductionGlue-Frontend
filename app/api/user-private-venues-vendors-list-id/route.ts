import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const EntityListNameId = searchParams.get("EntityListNameId");

  if (!EntityListNameId) {
    return NextResponse.json(
      {
        status: 400,
        message: "Id is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "SharedVenueVendor",
      IndexName: "EntityListNameId-index",
      KeyConditionExpression: "#EntityListNameId = :EntityListNameId ",
      ExpressionAttributeNames: {
        "#EntityListNameId": "EntityListNameId",
      },
      ExpressionAttributeValues: {
        ":EntityListNameId": EntityListNameId,
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch venues and vendors",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  if (response.Count === 0) {
    return NextResponse.json(
      {
        message: "No Venue or Vendor found",
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
      message: `Data fetched successfully`,
      data: response.Items,
    },
    {
      status: 200,
    }
  );
}




