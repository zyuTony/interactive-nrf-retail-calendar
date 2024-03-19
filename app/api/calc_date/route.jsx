// pages/api/dates.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// app/api/getdate/route.js

// Export the HTTP method you want to handle as a named export
export async function GET() {
  // Perform actions for a GET request
  const result =
    await prisma.$queryRaw`SELECT cal_dt_hash_key FROM retail_dates limit 522`;

  const values = result.map((item) => item.cal_dt_hash_key);
  return NextResponse.json(values);
}

export async function POST(req) {
  const { anchorDate } = await req.json();
  console.log(anchorDate);
  const anchorDateObject = new Date(anchorDate);
  const result = await prisma.retail_dates.findFirst({
    where: {
      cal_dt: anchorDateObject,
    },
    select: {
      dy_of_wk_desc: true,
    },
  });

  console.log(result);
  const values = result.dy_of_wk_desc;
  console.log(values);
  return NextResponse.json(values);
}
