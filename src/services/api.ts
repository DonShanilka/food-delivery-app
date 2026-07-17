export const BASE_URL = "http://localhost:3000/api";

export function normalizeImageValue(value: any): string | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    if (value.startsWith("http") || value.startsWith("data:")) {
      return value;
    }

    return `data:image/jpeg;base64,${value}`;
  }

  const contentType =
    value.contentType || value.mimetype || value.type || "image/jpeg";

  if (typeof value.data === "string") {
    return value.data.startsWith("data:")
      ? value.data
      : `data:${contentType};base64,${value.data}`;
  }

  const bytes = Array.isArray(value.data)
    ? value.data
    : Array.isArray(value.buffer?.data)
    ? value.buffer.data
    : Array.isArray(value._data)
    ? value._data
    : undefined;

  if (bytes && bytes.length > 0) {
    return `data:${contentType};base64,${bytesToBase64(bytes)}`;
  }

  return undefined;
}

function bytesToBase64(bytes: number[]): string {
  const encTable =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  let i = 0;

  while (i < bytes.length) {
    const byte1 = bytes[i++]!;
    const byte2 = i < bytes.length ? bytes[i++]! : NaN;
    const byte3 = i < bytes.length ? bytes[i++]! : NaN;

    const enc1 = byte1 >> 2;
    const enc2 = ((byte1 & 3) << 4) | (isNaN(byte2) ? 0 : byte2 >> 4);
    const enc3 = isNaN(byte2)
      ? 64
      : ((byte2 & 15) << 2) | (isNaN(byte3) ? 0 : byte3 >> 6);
    const enc4 = isNaN(byte3) ? 64 : byte3 & 63;

    result +=
      encTable.charAt(enc1) +
      encTable.charAt(enc2) +
      encTable.charAt(enc3) +
      encTable.charAt(enc4);
  }

  return result;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.message || "Server error");
  }

  return json;
}

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

export async function apiPut<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
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
