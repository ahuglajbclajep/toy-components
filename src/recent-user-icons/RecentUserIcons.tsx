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
          // NOTE: -ml-6 と last:ml-0 で、フクロウセレクタと同じことをやっている（-space-x-6 は厳密にはフクロウセレクタと定義が違うので使えない）
          // NOTE: 24px は、アイコン同士の画像の重なり 16px と、お互いの border-x-4 を足した長さ
          className={clsx(userIconStyle, "z-10 -ml-6 last:ml-0")}
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
  "box-content size-24 rounded-full border-x-4 border-white bg-gray-300 object-cover",
);
