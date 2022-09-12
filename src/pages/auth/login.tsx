import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaDiscord,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import { useTasksContext } from "../../context/TaskContext";

interface ProviderProps {
  name: string;
  icon: JSX.Element;
}

function LogIn() {
  const providers: ProviderProps[] = [
    { name: "google", icon: <FaGoogle /> },
    { name: "github", icon: <FaGithub /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "discord", icon: <FaDiscord /> },
    { name: "twitch", icon: <FaTwitch /> },
  ];
  const { handleOAuthSignIn } = useTasksContext();

  return (
    <div className="max-w-screen flex h-full min-h-screen w-full flex-col items-center justify-center bg-slate-100">
      <div className="flex w-full max-w-md flex-col rounded-xl border border-gray-300 bg-white p-[30px] shadow-xl shadow-indigo-200">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="w-full text-center text-4xl font-bold text-indigo-600">
            Login with Social Media
          </h1>

          <p className="mt-6 text-center text-sm font-semibold">
            {`Choose any social media you want from below`}
          </p>
          <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4 whitespace-nowrap">
            {providers.map((provider, index) => (
              <button
                key={index}
                onClick={handleOAuthSignIn(provider.name)}
                className={`flex h-full w-full items-center justify-center gap-1.5 rounded capitalize ${
                  provider.name === "google"
                    ? "bg-[#DB4437]"
                    : provider.name === "github"
                    ? "bg-[#333]"
                    : provider.name === "facebook"
                    ? "bg-[#4267B2]"
                    : provider.name === "twitter"
                    ? "bg-[#1DA1F2]"
                    : provider.name === "discord"
                    ? "bg-[#5865F2]"
                    : provider.name === "twitch"
                    ? "bg-[#9146FF]"
                    : ""
                } py-2 px-3 text-white hover:brightness-90`}
              >
                <div className="text-xl">{provider.icon}</div>
                <span className="font-semibold">{provider.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
