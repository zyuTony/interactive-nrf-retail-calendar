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
      fis_yr_nbr: true,
      fis_qtr_nbr: true,
      fis_mo_nbr: true,
      fis_wk_nbr: true,
      yr_strt_dt: true,
      yr_end_dt: true,
      qtr_strt_dt: true,
      qtr_end_dt: true,
      mo_strt_dt: true,
      mo_end_dt: true,
      dy_of_wk_desc: true,
    },
  });

  // console.log(result);
  // const values = result.dy_of_wk_desc;
  // console.log(values);

  const response = {
    // result1:
    // result2:
  };
  return NextResponse.json(result);
}
