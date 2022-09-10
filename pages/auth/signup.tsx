import Link from "next/link";
import { supabase } from "../../lib/initSupabase";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import TextInput from "../../components/Inputs/TextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import * as Yup from "yup";
import {useState} from "react";

export interface FormValuesProps {
  user_email: string;
  user_password?: string;
}

function SignUp() {
  const initialValues = {
    user_email: "",
    user_password: "",
    repeat_password: "",
  };

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)

  const handleSignUpWithEmail = async ({
    user_email,
    user_password,
  }: FormValuesProps) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: user_email,
      password: user_password,
    });
    if (error) console.log(error);
    else setIsRegistrationSuccessful(true)
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSignUpWithEmail(values);
        actions.resetForm();
      }}
      validationSchema={Yup.object({
        user_email: Yup.string()
          .email("Invalid email adress")
          .required("Required"),
        user_password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Required"),
        repeat_password: Yup.string().oneOf(
          [Yup.ref("user_password"), null],
          "Password must match"
        ),
      })}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form>
          <div className="max-w-screen flex h-full min-h-screen w-full flex-col items-center justify-center bg-slate-100">
            <div className="flex max-w-md flex-col rounded-xl border border-gray-300 bg-white p-[30px] shadow-xl shadow-indigo-200">
              <div className="flex w-full flex-col items-center justify-center">
                <h1 className="w-full text-center text-4xl font-bold text-indigo-600">
                  Register to your account
                </h1>

                <p className="mt-6 text-center">
                  {`Already have an account?`}
                  <span className="ml-2 cursor-pointer font-semibold text-indigo-600 underline hover:text-indigo-500 hover:no-underline">
                    <Link href="/auth/login">Signin</Link>
                  </span>
                </p>
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
                  <PasswordInput
                    inputName="user_password"
                    value={values.user_password}
                    placeholder="Password"
                    handleChange={handleChange}
                  />
                  <PasswordInput
                    inputName="repeat_password"
                    value={values.repeat_password}
                    placeholder="Repeat Password"
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
                  !isRegistrationSuccessful && "hidden"
                } mt-4 flex flex-col justify-center rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800`}
                role="alert"
              >
                <span className="mr-2 font-semibold">
                  Registration successful!
                </span>
                Confirm your email and start using the app
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
