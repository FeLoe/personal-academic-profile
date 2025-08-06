// app/api/orcid/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://pub.orcid.org/v3.0/${process.env.ORCID_ID}/works`,
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) throw new Error(`Upstream ORCID failed ${res.status}`);
  const data = await res.json();
  return NextResponse.json(data);
}
