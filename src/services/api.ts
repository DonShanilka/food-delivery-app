export const BASE_URL = "http://localhost:3000/api";

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.message || "Server error");
  }

  return json;
}
