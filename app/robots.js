const baseUrl = process.env.NEXT_PUBLIC_HOST;

export default function robots() {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
