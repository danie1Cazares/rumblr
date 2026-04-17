import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // track mount status

    const token = localStorage.getItem("token");

    if (!token) {
      if (isMounted) setLoading(false);
      console.log('No token!');
      return;
    }

    fetch("http://localhost:5000/users/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          if (isMounted) {
            setUser(null);
            setLoading(false);
          }
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return; // was a 401/403, already handled above

        if (isMounted) {
          // console.log(data);
          setUser(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        }
      });

    // cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};