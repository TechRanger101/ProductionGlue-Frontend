import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, token, newPassword } = data;
  if (!email) {
    return NextResponse.json({
      status: 400,
      message: "Email is Not Found",
    });
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Users",
      Key: {
        email,
      },
    })
  );
  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: response,
        status: 400,
      },
    });
  }

  if (response?.Item === undefined) {
    return NextResponse.json({
      body: {
        message: "failed",
        data: "User not found",
        status: 401,
      },
    });
  }

  const user = response.Item;

  const secret = user.role + "access-token-secret" + user.password;

  //   const payload = {
  //     userId: user.userId,
  //     role: user.role,
  //     email: user.email,
  //   };

  const payload = jwt.verify(token, secret) as JwtPayload;

  if (!payload) {
    return NextResponse.json({
      status: 400,
      message: "Invalid Token",
    });
  }

  if (payload.email !== email) {
    return NextResponse.json({
      status: 400,
      message: "Invalid Token",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const response2 = await ddbDocClient.send(
    new PutCommand({
      TableName: "Users",
      Item: {
        ...user,
        password: hash,
      },
    })
  );

  if (response2.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "Not Updated",
        status: 400,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Password has been reset for ${email}`,
  });
}
