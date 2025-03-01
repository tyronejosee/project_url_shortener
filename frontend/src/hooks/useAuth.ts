import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  id: string;
  email: string;
  username: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8050/api/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;
