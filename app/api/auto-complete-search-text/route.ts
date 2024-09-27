import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchTerm = request.nextUrl.searchParams.get("input");
  const type = request.nextUrl.searchParams.get("type");
//   console.log(searchTerm, " searchTerm ", type, " type");
  const response = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
      Limit: 5,
      IndexName: "createdBy-type-index",
      ProjectionExpression: "#address, zipCode,eventEntityId,#type,city,lat,lng,#name,rating,images,category",
      KeyConditionExpression: "#createdBy = :createdBy and #type = :type",
      ExpressionAttributeNames: {
        "#createdBy": "createdBy",
        "#type": "type",
        "#name": "name",
        "#address": "address",
      },
      FilterExpression:
        "contains(address, :searchTerm) OR contains(zipCode, :searchTerm)",
      ExpressionAttributeValues: {
        ":createdBy": "admin",
        ":type": type,
        ":searchTerm": searchTerm,
      },
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    return NextResponse.json(
      {
        message: "Not able to fetch vendors",
        data: response,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

//   console.log(response.Items, " response");

  return NextResponse.json(
    {
      message: "Successfully fetched vendors",
      data: response.Items,
      status: 200,
    },
    {
      status: 200,
    }
  );
}
