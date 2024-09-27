import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "@/database/dynamodbClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type EvaluatedKeyType = {
  eventEntityId: string;
  createdBy: string;
  type: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 100;
  const lastEventEntityId = searchParams.get("lastEventEntityId") || null;
  const currentItemsCount = searchParams.get("currentItemsCount") || 0;
  const totalItemsCounts = searchParams.get("totalItemsCount") || 0;

  if ((Number(totalItemsCounts)>0) && (Number(currentItemsCount) >= Number(totalItemsCounts))) {
    return NextResponse.json(
      {
        status: 200,
        message: `Venues fetched successfully`,

        pagination: {
          limit,
          lastEventEntityId: null,
          currentItemsCount: Number(currentItemsCount),
          totalItemsCount: totalItemsCounts,
        },
        venues: [],
      },
      {
        status: 200,
      }
    );
  }

  const totalItemsCount = await ddbDocClient.send(
    new QueryCommand({
      TableName: "VenuesAndVendors",
      IndexName: "createdBy-type-index",
      KeyConditionExpression: "#createdBy = :createdBy and #type = :type",
      ExpressionAttributeNames: {
        "#createdBy": "createdBy",
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":createdBy": "admin",
        ":type": "venue",
      },
      Select: "COUNT",
    })
  );

  // console.log(totalItemsCount);

  const lastKey: EvaluatedKeyType = {
    eventEntityId: lastEventEntityId as string,
    createdBy: "admin",
    type: "venue",
  };

  const QueryResult: any[] = [];
  let startKey = lastKey?.eventEntityId ? lastKey : undefined;
  let response;

  if (lastKey !== undefined) {
    response = await ddbDocClient.send(
      new QueryCommand({
        TableName: "VenuesAndVendors",
        Limit: limit,
        ExclusiveStartKey: startKey,
        IndexName: "createdBy-type-index",
        KeyConditionExpression: "#createdBy = :createdBy and #type = :type",
        ExpressionAttributeNames: {
          "#createdBy": "createdBy",
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":createdBy": "admin",
          ":type": "venue",
        },
      })
    );

    response?.Items?.forEach((item) => QueryResult.push(item));
  }

  return NextResponse.json(
    {
      status: 200,
      message: `Venues fetched successfully`,

      pagination: {
        limit,
        lastEventEntityId: response?.LastEvaluatedKey?.eventEntityId || null,
        currentItemsCount:
          Number(currentItemsCount) + (response?.Items?.length || 0),
        totalItemsCount: totalItemsCount.Count,
      },
      venues: QueryResult,
    },
    {
      status: 200,
    }
  );
}
