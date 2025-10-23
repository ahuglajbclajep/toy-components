import { useCatApi } from "./hooks";

import { RecentUserIcons } from "../recent-user-icons/RecentUserIcons";

export const RecentUserIcons_ = () => {
  const data = useCatApi();
  return <RecentUserIcons users={data} />;
};
