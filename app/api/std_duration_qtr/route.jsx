import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { yearNum, qtrNum } = await req.json();
  console.log(`the date returned is ${typeof yearNum}`);
  console.log(`the offset is ${qtrNum}`);

  const date_nbrs = await prisma.calendar_data.findFirst({
    where: {
      fis_yr_nbr: yearNum,
      fis_qtr_nbr: qtrNum,
    },
    select: {
      qtr_strt_dt: true,
      qtr_end_dt: true,
    },
  });

  date_nbrs.qtr_strt_dt = date_nbrs.qtr_strt_dt.toISOString().substring(0, 10);
  date_nbrs.qtr_end_dt = date_nbrs.qtr_end_dt.toISOString().substring(0, 10);

  return NextResponse.json(date_nbrs);
}
