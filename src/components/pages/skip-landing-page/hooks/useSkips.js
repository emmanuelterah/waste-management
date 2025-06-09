import { useState, useEffect } from "react";

export default function useSkips(apiUrl) {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skips");
        return res.json();
      })
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return { skips, loading, error, setSkips };
} 