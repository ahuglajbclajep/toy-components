import { useMemo } from "react";
import clsx from "clsx/lite";

type Props = {
  users: { id: string; url: string }[];
};

export const RecentUserIcons = ({ users }: Props) => {
  const recentUsers = useMemo(() => users.slice(0, 6).reverse(), [users]);

  return (
    <div className="flex flex-row-reverse justify-end">
      {recentUsers.length >= 6 && <DummyIcons />}
      {recentUsers.map((user) => (
        <img
          key={user.id}
          // NOTE: -ml-12 と last:ml-0 で、フクロウセレクタと同じことをする（-space-x-12 は厳密にはフクロウセレクタと定義が違うので使えない）
          className={clsx(
            userIconStyle,
            "z-10 -ml-12 cursor-pointer transition-all last:ml-0 hover:z-20 hover:not-last:-ml-6",
          )}
          src={user.url}
        />
      ))}
    </div>
  );
};

const DummyIcons = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <div key={i} className={clsx(userIconStyle, "z-10 -ml-18")} />
    ))}
  </>
);

const userIconStyle = clsx(
  "box-content size-24 rounded-full border-4 border-white bg-gray-300 object-cover",
);
