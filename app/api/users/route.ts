import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await ddbDocClient.send(
    new ScanCommand({
      TableName: "Users",
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch Users",
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
      message: `Users fetched successfully`,
      data: response.Items,
    },
    {
      status: 200,
    }
  );
}
