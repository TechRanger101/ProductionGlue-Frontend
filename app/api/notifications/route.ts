import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        status: 400,
        message: "email is required",
      },
      {
        status: 400,
      }
    );
  }

  const projectionExpression = "notifications";
  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
      ProjectionExpression: projectionExpression,
    })
  );

  if (!response.Item) {
    return NextResponse.json(
      {
        status: 404,
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      notifications: response.Item.notifications,
      message: "Successfully fetched notifications",
    },
    {
      status: 200,
    }
  );
}


