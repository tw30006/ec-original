import { Link, useNavigate } from "react-router";

export function DashboardHeader() {
  const apiUrl = import.meta.env.VITE_APP;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ec-token="))
      ?.substring("ec-token=".length);

    if (!token) {
      console.error("沒有找到 token，重新導向登入");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        headers: {
          Authorization: decodeURIComponent(token),
        },
      });
      const data = await res.json();
      if (data.success === true) {
        document.cookie =
          "ec-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login", { replace: true });
      } else {
        console.error("登出失敗", res.status);
      }
    } catch (error) {
      console.error("登出錯誤", error);
    }
  };

  return (
    <header className="bg-blue-200/50 text-white">
      <div className="w-full mx-auto md:w-[90%]">
        <nav className="flex justify-end text-xl">
          <Link to="/" className="p-2 hover:bg-yellow-500 hover:text-black">
            首頁
          </Link>
          <Link className="p-2 hover:bg-yellow-500 hover:text-black">
            商品管理
          </Link>
          <Link className="p-2 hover:bg-yellow-500 hover:text-black">
            訂單管理
          </Link>
          <Link
            className="p-2 hover:bg-yellow-500 hover:text-black"
            onClick={handleLogout}
          >
            登出
          </Link>
        </nav>
      </div>
    </header>
  );
}
