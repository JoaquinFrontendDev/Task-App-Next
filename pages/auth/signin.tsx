import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/initSupabase";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

function SignIn() {
  const { data: session } = useSession();
  const handleOAuthSignIn = (provider: string) => () => signIn(provider)
  return (
    <div className="max-w-screen flex h-full min-h-screen w-full flex-col items-center justify-center bg-slate-100">
      <div className="flex max-w-md flex-col rounded-xl border border-gray-300 bg-white p-[30px] shadow-xl shadow-indigo-200">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="w-full text-center text-4xl font-bold text-indigo-600">
            Login to your account
          </h1>

          <p className="mt-6 text-center">
            {`Don't have an account yet?`}
            <span className="ml-2 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
              <Link href="#">Signup</Link>
            </span>
          </p>
          <div className="mt-4 flex w-full gap-2 whitespace-nowrap">
            <button
              onClick={handleOAuthSignIn('google')}
              className="flex w-full max-w-[125px] items-center justify-center gap-1.5 rounded bg-[#DB4437] py-2 px-3 text-white hover:brightness-90"
            >
              <FaGoogle className="text-xl" />
              <span className="font-semibold">Google</span>
            </button>
            <button className="flex w-full max-w-[125px] items-center justify-center gap-1.5 rounded bg-[#333] py-2 px-3 text-white hover:brightness-90">
              <FaGithub className="text-xl" />
              <span className="font-semibold">Github</span>
            </button>
            <button className="flex w-full max-w-[125px] items-center justify-center gap-1.5 rounded bg-[#4267B2] py-2 px-3 text-white hover:brightness-90">
              <FaFacebook className="text-xl" />
              <span className="font-semibold">Facebook</span>
            </button>
          </div>
        </div>
        <div>
          <div className="mt-6 flex w-full flex-col gap-4">
            <input
              type="text"
              className="rounded border border-gray-400 font-semibold placeholder:font-normal hover:outline-none active:ring-1 active:ring-indigo-600"
              placeholder="Email"
            />
            <input
              type="text"
              className="rounded border border-gray-400 font-semibold placeholder:font-normal hover:outline-none active:ring-1 active:ring-indigo-600"
              placeholder="Password"
            />
          </div>
          <div className="mt-2 cursor-pointer text-[13px] font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
            <Link href="#">Forgot your password?</Link>
          </div>
        </div>
        <button className="mt-4 w-full rounded bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-500">
          Login
        </button>
      </div>
    </div>
  );
}

export default SignIn;
