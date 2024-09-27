import { ddbDocClient } from "@/database/dynamodbClient";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { cookies } from "next/headers";
import { verifyJwt } from "@/utils/verifyJwt";
import type { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
//   const accessToken = req.cookies.get("accessToken")?.value;
const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        message: "failed",
        data: "Unauthorized",
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const { email } = verifyJwt(accessToken, true) as JwtPayload;
  if (!email) {
    return NextResponse.json(
      {
        message: "failed",
        data: "Unauthorized",
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const params = {
    TableName: "Users",
    Key: {
      email,
    },
    UpdateExpression: "set refreshToken = :r",
    ExpressionAttributeValues: {
      ":r": "",
    },
  };

  const response = await ddbDocClient.send(new UpdateCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "failed",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("userRole");
  cookies().delete("isVerified");

  return NextResponse.json(
    {
      message: "success",
      data: "Logged out successfully",
      status: 200,
    },
    {
      status: 200,
    }
  );
}
