import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(data)
  useEffect(() => {
    let isMounted = true;

    axios.get(url)
      .then(res => isMounted && setData(res.data))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}
