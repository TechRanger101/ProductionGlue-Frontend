import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { sendEmail } from "@/lib/sendMail";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { email, senderMail } = data;
  if (!email) {
    return NextResponse.json({
      status: 400,
      message: "Email is required",
    });
  }

  // Send email

  function generateCode(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 12;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  const invitaionCard = {
    recipientEmail: email,
    inviteCode: generateCode(),
    senderMail: senderMail,
    status: "pending",
    createdAt: Date.now(),
  };

  const response = await ddbDocClient.send(
    new PutCommand({
      TableName: "Invites",
      Item: invitaionCard,
    })
  );
  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json({
      body: {
        message: "Not able to create invite",
        data: response,
        status: 400,
      },
    });
  }

  const link = `${process.env.DEPLOY_DOMAIN}/sign-up?recipientEmail=${email}&inviteCode=${invitaionCard.inviteCode}`;
  // console.log(link, " link");
  const subject = "Invitation to join the ProductionGlue";
  const emailResponse = await sendEmail(email, subject, link);
  console.log(emailResponse, " emailResponse");

  return NextResponse.json({
    status: 200,
    message: `Invitation sent to ${email}`,
  });
}
