import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { yearNum, moNum } = await req.json();
  console.log(`the date returned is ${typeof yearNum}`);
  console.log(`the offset is ${moNum}`);

  const date_nbrs = await prisma.calendar_data.findFirst({
    where: {
      fis_yr_nbr: yearNum,
      fis_mo_nbr: moNum,
    },
    select: {
      mo_strt_dt: true,
      mo_end_dt: true,
    },
  });

  date_nbrs.mo_strt_dt = date_nbrs.mo_strt_dt.toISOString().substring(0, 10);
  date_nbrs.mo_end_dt = date_nbrs.mo_end_dt.toISOString().substring(0, 10);

  return NextResponse.json(date_nbrs);
}
