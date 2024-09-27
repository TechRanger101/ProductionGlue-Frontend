import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
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

  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "SharedVenueVendor",
      IndexName: "userEmail-index",
      KeyConditionExpression: "#userEmail = :userEmail ",
      ExpressionAttributeNames: {
        "#userEmail": "userEmail",
      },
      ExpressionAttributeValues: {
        ":userEmail": userEmail,
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

// @ts-ignore
    const groupedItems = groupVenuesVendors(response.Items);
    // console.log('groupedItems',groupedItems);

  return NextResponse.json(
    {
      status: 200,
      message: `Data fetched successfully`,
      data: groupedItems,
    },
    {
      status: 200,
    }
  );
}



const groupVenuesVendors = (items:any[]) => {
     const groupItems:Record<string,any[]> = {};
     
    items.forEach((item) => {
      const eventEntityId = item.EntityListNameId;

      if(!groupItems[eventEntityId]){
        groupItems[eventEntityId] = [];
      }
        groupItems[eventEntityId].push(item);
    })

    return groupItems;
}
