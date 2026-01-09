import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_APP;
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setError("");
    try {
      const res = await fetch(`${apiUrl}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        document.cookie = `ec-token=${encodeURIComponent(
          data.token
        )}; expires=${new Date(
          data.expired
        ).toUTCString()}; path=/; SameSite=Strict; Secure`;
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-black text-lg">
              帳號
            </label>
            <input
              id="username"
              type="email"
              placeholder="請輸入Email"
              {...register("username", {
                required: "請輸入帳號",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "請輸入有效的Email格式",
                },
              })}
              className="border-2 border-blue-900 rounded-md p-2 text-black"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black text-lg">
              密碼
            </label>
            <input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              {...register("password", {
                required: "請輸入密碼",
                minLength: {
                  value: 6,
                  message: "密碼至少需要6個字元",
                },
              })}
              className="border-2 border-blue-900 rounded-md p-2 text-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-lg">{error}</p>}
          <button
            type="submit"
            className="bg-[#5b7493] hover:bg-yellow-500 hover:text-black p-2 rounded-md w-full cursor-pointer text-xl"
          >
            登入
          </button>
        </form>
      </section>
    </div>
  );
};
