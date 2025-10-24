import { useState, useEffect } from "react";

type CatData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const useCatApi = (cacheKey = "") => {
  const key = `cat-api-cache-${cacheKey}`;
  const [data, setData] = useState(() => getCachedData<CatData[]>(key, []));

  useEffect(() => {
    if (data.length > 0) {
      return;
    }

    (async () => {
      const API = "https://api.thecatapi.com/v1/images/search?limit=10";
      try {
        const response = await fetch(API);
        const fetchedData: CatData[] = await response.json();
        sessionStorage.setItem(key, JSON.stringify(fetchedData));
        setData(fetchedData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [key, data]);

  return data;
};

const getCachedData = <T>(key: string, fallback: T): T => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
};
