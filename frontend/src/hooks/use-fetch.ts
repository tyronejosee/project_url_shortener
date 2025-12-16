export const useFetch = () => {
  const fetchClient = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: { ...options?.headers },
    });
  };

  return fetchClient;
};
