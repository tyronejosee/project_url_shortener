import { useEffect } from "react";
import useFetchData from "./useFetchData";

type User = {
  id: string;
  email: string;
  username: string;
};

export default function useUser() {
  const { data: user, loading, error } = useFetchData<User>({
    url: "api/users/me",
  });

  return { user, loading };
}
