export async function GET() {
  return Response.json({
    SITE_URL: process.env.SITE_URL,
    JWT_SECRET: process.env.JWT_SECRET?.slice(0, 10) + "...",
  });
}
