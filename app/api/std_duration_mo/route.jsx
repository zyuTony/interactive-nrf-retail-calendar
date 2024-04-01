import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { yearNum, moNum } = await req.json();
//   console.log(`the date returned is ${yearNum}`);
//   console.log(`the offset is ${moNum}`);

//   const date_nbrs = await prisma.calendar_data.findFirst({
//     where: {
//       fis_yr_nbr: yearNum,
//       fis_mo_nbr: moNum,
//     },
//     select: {
//       mo_strt_dt: true,
//       mo_end_dt: true,
//     },
//   });

//   date_nbrs.mo_strt_dt = date_nbrs.mo_strt_dt.toISOString().substring(0, 10);
//   date_nbrs.mo_end_dt = date_nbrs.mo_end_dt.toISOString().substring(0, 10);

//   return NextResponse.json(date_nbrs);
// }

export async function POST(req) {
  const distinctDates = await prisma.calendar_data.groupBy({
    by: ["fis_yr_nbr", "fis_mo_nbr", "mo_strt_dt", "mo_end_dt"],
    _max: {
      fis_yr_nbr: true,
      fis_mo_nbr: true,
      mo_strt_dt: true,
      mo_end_dt: true,
    },
    orderBy: [
      { _max: { fis_yr_nbr: "desc" } },
      { _max: { fis_mo_nbr: "desc" } },
    ],
  });

  const distinctFormattedDates = distinctDates.map((date) => ({
    fis_yr_nbr: date._max.fis_yr_nbr,
    fis_mo_nbr: date._max.fis_mo_nbr,
    mo_strt_dt: date._max.mo_strt_dt.toISOString().substring(0, 10),
    mo_end_dt: date._max.mo_end_dt.toISOString().substring(0, 10),
  }));

  return NextResponse.json(distinctFormattedDates);
}
