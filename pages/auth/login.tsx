import Link from "next/link";
import { supabase } from "../../lib/initSupabase";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import { FormValuesProps } from "./signup";
import * as Yup from "yup";
import TextInput from "../../components/Inputs/TextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { useState } from "react";
import { useRouter } from "next/router";

interface ProviderProps {
  name: string;
  icon: JSX.Element;
}

function LogIn() {
  const providers: ProviderProps[] = [
    { name: "google", icon: <FaGoogle /> },
    { name: "github", icon: <FaGithub /> },
    { name: "facebook", icon: <FaFacebook /> },
  ];
  const [isLoginCorrect, setIsLoginCorrect] = useState(true);
  const initialValues = {
    user_email: "",
  };
  const router = useRouter();

  const handleOAuthSignIn = (provider: string) => () => {
    signIn(provider, { callbackUrl: "/" });
  };

  const handleSignInWithEmail = async ({
    user_email,
    user_password,
  }: FormValuesProps) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: user_email,
    });
    if (error) setIsLoginCorrect(false);
    else {
      console.log(user, session)
      setIsLoginCorrect(true);
      router.push("/");
      setTimeout(() => setIsLoginCorrect(false), 3000);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSignInWithEmail(values);
        actions.resetForm();
      }}
      validationSchema={Yup.object({
        user_email: Yup.string()
          .email("Invalid email adress")
          .required("Required"),
      })}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form>
          <div className="max-w-screen flex h-full min-h-screen w-full flex-col items-center justify-center bg-slate-100">
            <div className="flex max-w-md flex-col rounded-xl border border-gray-300 bg-white p-[30px] shadow-xl shadow-indigo-200">
              <div className="flex w-full flex-col items-center justify-center">
                <h1 className="w-full text-center text-4xl font-bold text-indigo-600">
                  Login to your account
                </h1>

                <p className="mt-6 text-center">
                  {`Don't have an account yet?`}
                  <span className="ml-2 cursor-pointer font-semibold text-indigo-600 underline hover:text-indigo-500 hover:no-underline">
                    <Link href="/auth/signup">Signup</Link>
                  </span>
                </p>
                <div className="mt-4 flex w-full items-center justify-between whitespace-nowrap">
                  {providers.map((provider, index) => (
                    <button
                      key={index}
                      onClick={handleOAuthSignIn(provider.name)}
                      className={`flex w-full max-w-[123px] items-center justify-center gap-1.5 rounded capitalize ${
                        provider.name === "google"
                          ? "bg-[#DB4437]"
                          : provider.name === "github"
                          ? "bg-[#333]"
                          : "bg-[#4267B2]"
                      } py-2 px-3 text-white hover:brightness-90`}
                    >
                      <div className="text-xl">{provider.icon}</div>
                      <span className="font-semibold">{provider.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mt-6 flex w-full flex-col gap-4">
                  <TextInput
                    type="text"
                    inputName="user_email"
                    value={values.user_email}
                    placeholder="Email"
                    handleChange={handleChange}
                  />
                </div>
                <div className="mt-2 cursor-pointer text-[13px] font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                  <Link href="#">Forgot your password?</Link>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-500"
              >
                Login
              </button>
              <div
                className={`${
                  isLoginCorrect && "hidden"
                } mt-4 flex flex-col justify-center rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800`}
                role="alert"
              >
                <span className="mr-2 font-semibold">Something went wrong</span>
                Change a few things up and try submitting again.
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LogIn;
