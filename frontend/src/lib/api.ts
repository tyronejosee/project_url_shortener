interface Props {
  endpoint: string;
  params?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}

export async function fetchData<T>({
  endpoint,
  params = {},
  method = "GET",
  body,
}: Props): Promise<T | null> {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const verificationCode = process.env.NEXT_PUBLIC_VERIFICATION_CODE;

    const query = new URLSearchParams(params).toString();
    const url = `${apiURL}${endpoint}${query ? `?${query}` : ""}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Verification-Code": verificationCode || "",
    };

    // TODO: Add token
    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate: 86400 }, // 24 hrs.
    };

    const res = await fetch(url, options);

    if (res.status === 404) {
      console.warn(`Resource not found: ${endpoint}`);
      return null;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage =
        errorData?.detail || errorData?.error || "Failed to fetch data";
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Data Fetching Error", error);
    throw error;
  }
}
