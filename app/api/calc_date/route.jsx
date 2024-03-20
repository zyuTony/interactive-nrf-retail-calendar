import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { anchorDate } = await req.json();
  console.log(`the date returned is ${anchorDate}`);
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
