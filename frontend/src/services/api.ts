const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "An error occurred");
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      console.warn("The response is an empty list.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
