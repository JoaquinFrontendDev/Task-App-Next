import Link from "next/link";

function NotLogged() {

  return (
    <div className="flex min-h-screen max-w-full flex-col items-center justify-center px-12">
      <h1 className="max-w-xl text-center text-4xl">
        Hi <span className="text-indigo-600">visitor</span>! 🤖 We realized that
        youre not signed in
      </h1>
      <button className="mt-8 rounded-full bg-indigo-600 px-3 py-2 font-semibold text-white hover:bg-indigo-500">
        <Link href="/auth/login">Continue to Login</Link>
      </button>
    </div>
  );
}

export default NotLogged;
