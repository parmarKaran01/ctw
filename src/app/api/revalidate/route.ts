import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const TYPE_TO_TAG: Record<string, string> = {
  video: "video",
  pricingTier: "pricingTier",
  testimonial: "testimonial",
  siteSettings: "siteSettings",
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType: string = body?._type ?? "";
    const tag = TYPE_TO_TAG[docType];

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    } else {
      Object.values(TYPE_TO_TAG).forEach((t) => revalidateTag(t));
      console.log("Revalidated all tags (unknown type)");
    }

    return NextResponse.json({ revalidated: true, tag: tag ?? "all" });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
