import { NextRequest, NextResponse } from "next/server";
import { sendForgotMail } from "@/lib/sendForgotMail";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email } = data;
  if (!email) {
    return NextResponse.json({
      status: 400,
      message: "Email is required",
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

  const payload = {
    userId: user.userId,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "4m",
  });

  // Send email

  const link = `${process.env.DEPLOY_DOMAIN}/forgot-password?userEmail=${email}&token=${token}`;
  const subject = "Forgot Password Link";
  const emailResponse = await sendForgotMail(email, subject, link);
  console.log(emailResponse, " emailResponse");

  return NextResponse.json({
    status: 200,
    message: `Password reset link has been sent to ${email}`,
  });
}
