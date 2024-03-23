import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { anchorDate, offset } = await req.json();
  console.log(`the date returned is ${anchorDate}`);
  console.log(`the offset is ${offset}`);

  const anchorDateObject = new Date(anchorDate);

  const date_nbrs = await prisma.calendar_data.findFirst({
    where: {
      cal_dt: anchorDateObject,
    },
    select: {
      fis_yr_nbr: true,
      fis_wk_nbr: true,
      dy_of_wk_desc: true,
    },
  });

  const compday = await prisma.calendar_data.findFirst({
    where: {
      fis_yr_nbr: date_nbrs.fis_yr_nbr - offset,
      fis_wk_nbr: date_nbrs.fis_wk_nbr,
      dy_of_wk_desc: date_nbrs.dy_of_wk_desc,
    },
    select: {
      cal_dt: true,
    },
  });

  compday.cal_dt = compday.cal_dt.toISOString().substring(0, 10);
  return NextResponse.json(compday);
}
