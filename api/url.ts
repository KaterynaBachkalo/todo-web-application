export const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
  console.error("Missing NEXT_PUBLIC_API_URL");
}
