import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const sharedVenueVendorId = searchParams.get("sharedVenueVendorId");

  if (!sharedVenueVendorId) {
    return NextResponse.json(
      {
        status: 400,
        message: "sharedVenueVendor ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "SharedVenueVendor",
      Key: {
        sharedVenueVendorId,
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        status: 400,
        message: "sharedVenueVendor not found",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: 200,
      message: `SharedVenueVendor found successfully`,
      data: response.Item,
    },
    {
      status: 200,
    }
  );
}
