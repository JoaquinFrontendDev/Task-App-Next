import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import NotLogged from "../components/NotLogged/NotLogged";
import TaskList from "../components/TaskList/TaskList";
import { supabase } from "../lib/initSupabase";

const Home: NextPage = () => {
  const { data: thirdPartySession, status } = useSession();
  const session = supabase.auth.session()
  console.log(session)
  const handleSignOut =  () => {
    signOut();
  };


  return (
    <div>
      <Head>
        <title>Sintaxis Todo App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {status === "loading" ? (
        <div className="flex h-full min-h-screen w-full max-w-full items-center justify-center gap-2">
          <span className="animate-bounce text-4xl">🤖</span>
          <span className="animate-pulse text-4xl font-semibold">
            Loading...
          </span>
        </div>
      ) : (thirdPartySession && status === "authenticated") || session ? (
        <Layout>
          <button
            onClick={handleSignOut}
            className="absolute top-10 right-10 rounded-full bg-gray-900 py-2 px-3 font-semibold text-white"
          >
            Log out
          </button>
          <Header />
          <TaskList />
        </Layout>
      ) : (
        <NotLogged />
      )}
    </div>
  );
};

export default Home;
