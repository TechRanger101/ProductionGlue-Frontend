import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { GetCommand, UpdateCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { recipientEmail, inviteCode } = data;
  if (!recipientEmail || !inviteCode) {
    return NextResponse.json(
      {
        message: "failed",
        data: "email or inviteCode is missing",
        status: 400,
        isVerified: false,
      },
      {
        status: 400,
      }
    );
  }

  const response = await ddbDocClient.send(
    new GetCommand({
      TableName: "Invites",
      Key: {
        recipientEmail,
      },
    })
  );
  // console.log("")
  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "failed",
        data: response,
        status: 400,
        isVerified: false,
      },
      {
        status: 400,
      }
    );
  }

  if (response?.Item === undefined) {
    return NextResponse.json(
      {
        message: "failed",
        data: "Invitation not found for this email",
        status: 401,
        isVerified: false,
      },
      {
        status: 401,
      }
    );
  }

  const invite = response.Item;

  // if(invite.createdAt + 86400000 < Date.now()){
  //   return NextResponse.json(
  //     {
  //       message: "failed",
  //       data: "Invitation expired",
  //       status: 400,
  //       isVerified: false,
  //     },
  //     {
  //       status: 400,
  //     }
  //   );
  // }

  if (invite.inviteCode !== inviteCode) {
    return NextResponse.json(
      {
        message: "failed",
        data: "Invalid invite code",
        status: 400,
        isVerified: false,
      },
      {
        status: 400,
      }
    );
  }

  if (invite.status === "accepted") {
    cookies().set("isVerified", "true",{
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    });
    return NextResponse.json(
      {
        data: "Invitation already accepted",
        isVerified: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  }

  if (invite.status === "declined") {
    return NextResponse.json(
      {
        message: "failed",
        data: "Invitation already declined",
        status: 400,
        isVerified: false,
      },
      {
        status: 400,
      }
    );
  }

  const updateResponse = await ddbDocClient.send(
    new UpdateCommand({
      TableName: "Invites",
      Key: {
        recipientEmail,
      },
      UpdateExpression: "set #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "accepted",
      },
    })
  );

  if (updateResponse.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "failed",
        data: updateResponse,
        status: 400,
        isVerified: false,
      },
      {
        status: 400,
      }
    );
  }

  const deleteResponse = await ddbDocClient.send(
    new DeleteCommand({
      TableName: "Invites",
      Key: {
        recipientEmail,
      },
    })
  );

  cookies().set("isVerified", "true",{
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });
  return NextResponse.json({
    message: "success",
    data: "Invitation verified successfully",
    status: 200,
    isVerified: true,
  });
}
