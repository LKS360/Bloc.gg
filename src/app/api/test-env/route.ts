export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SITE_URL,
    secret: process.env.SESSION_SECRET ? "OK" : "Missing",
  });
}
