import { useState } from "react";
import { useNavigate } from "react-router";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_APP;
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("請輸入帳號和密碼");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        document.cookie = `ec-token=${encodeURIComponent(
          data.token
        )}; expires=${new Date(
          data.expired
        ).toUTCString()}; path=/; SameSite=Strict`;
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("登入失敗");
    }
  };

  return (
    <div className="flex justify-center">
      <section className="w-[400px] rounded-md p-8 flex flex-col gap-8 bg-white">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          管理者登入
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black text-lg">
              帳號
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="請輸入Email"
              required
              className="border-2 border-blue-900 rounded-md p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black text-lg">
              密碼
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="請輸入密碼"
              required
              className="border-2 border-blue-900 rounded-md p-2 text-black"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <button
          type="button"
          className="bg-[#5b7493] hover:bg-yellow-500 hover:text-black p-2 rounded-md w-full cursor-pointer text-xl"
          onClick={handleLogin}
        >
          登入
        </button>
      </section>
    </div>
  );
};
