import Input from "@/components/loginForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/auth");
    }
  };

  const Signup = () => {
    router.push("/signup");
  };

  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="bg-black/50 min-h-screen w-full flex flex-col">
        <nav className="px-12 py-5">
          <div onClick={() => router.push('/')} className="cursor-pointer">
            <img src="/images/logo.png" alt="logo" className="h-12" />
          </div>
        </nav>
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold text-center">Sign In</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={handleSubmit}
            >
              Login
            </button>
            <p className="text-neutral-500 mt-12 text-center">
              First time using Netflix?{" "}
              <span
                onClick={Signup}
                className="text-white mt-1 hover:underline cursor-pointer"
              >
                Create an Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;