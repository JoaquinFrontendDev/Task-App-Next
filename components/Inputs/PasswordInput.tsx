import { useState } from "react";
import { ErrorMessage, Field, useField } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  inputName?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  handleChange?: any;
}

function PasswordInput({
  inputName = "password",
  placeholder,
  value,
  handleChange
}: PasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [field, meta] = useField(inputName);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Field
          type={passwordVisible ? "text" : "password"}
          className={`w-full rounded border border-gray-400 font-semibold placeholder:font-normal hover:outline-none active:ring-1 active:ring-indigo-600 ${
            meta.error && meta.touched && "border-red-600"
          }`}
          name={inputName}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <div
          className="ml-[-45px] flex items-center px-[13px]"
          onClick={toggleVisibility}
        >
          {passwordVisible ? (
            <AiFillEye className="text-grey-700 cursor-pointer text-[20px]" />
          ) : (
            <AiFillEyeInvisible className="text-grey-700 cursor-pointer text-[20px]" />
          )}
        </div>
      </div>
      <div className="mt-1 text-sm font-semibold text-red-600">
        <ErrorMessage name={inputName} />
      </div>
    </div>
  );
}

export default PasswordInput;
