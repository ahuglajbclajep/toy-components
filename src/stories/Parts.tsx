import { RecentUserIcons } from "../recent-user-icons/RecentUserIcons";
import { useState, useEffect } from "react";

export const RecentUserIcons_ = () => {
  const [data, setData] = useState<{ id: string; url: string }[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10",
      );
      const result = await response.json();
      setData(result);
    })();
  }, []);

  return <RecentUserIcons users={data} />;
};
