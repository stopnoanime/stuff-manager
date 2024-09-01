import { fetchAutocompleteItemsByQuery } from "@/app/_lib/data-fetches";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";

  return Response.json(await fetchAutocompleteItemsByQuery(query));
}
