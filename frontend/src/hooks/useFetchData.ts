import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Props<T> {
  url: string;
  method?: string;
  body?: object;
  headers?: Record<string, string>;
}

export default function useFetchData<T>({
  url,
  method = "GET",
  body,
  headers,
}: Props<T>) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const verificationCode = process.env.NEXT_PUBLIC_VERIFICATION_CODE;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("access_token");
        const authHeaders = token ? { Authorization: `Bearer ${token}` } : "";

        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Verification-Code": verificationCode || "",
            ...authHeaders,
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(`${apiURL}${url}`, options);

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData?.detail || errorData?.error || "Error fetching data";
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, JSON.stringify(body), JSON.stringify(headers)]);

  return { data, loading, error };
}
