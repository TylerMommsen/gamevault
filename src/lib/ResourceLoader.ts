const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default async function ResourceLoader(resourceUrl: string) {
  const res = await fetch(`${resourceUrl}key=${RAWG_API_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
