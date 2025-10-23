import { useState, useEffect } from "react";

type CatData = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const useCatApi = () => {
  const [data, setData] = useState<CatData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10",
        );
        setData(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return data;
};
