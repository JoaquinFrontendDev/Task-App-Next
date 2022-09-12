import { ErrorMessage, Field, useField } from "formik";


interface TextInputProps {
  inputName: string;
  placeholder: string;
  value: string;
  type: string;
  handleChange?: any;
}

function TextInput({
  inputName,
  placeholder,
  value,
  type,
  handleChange
}: TextInputProps) {
  const [, meta, helpers] = useField(inputName);
  const { setTouched } = helpers;
  return (
    <div className="flex flex-col">
      <Field
        type={type}
        name={inputName}
        value={value}
        className={`rounded border border-gray-400 font-semibold placeholder:font-normal hover:outline-none active:ring-1 active:ring-indigo-600 ${
          meta.error && meta.touched && "border-red-600"
        }`}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className="mt-1 text-sm font-semibold text-red-600">
        <ErrorMessage name={inputName} />
      </div>
    </div>
  );
}

export default TextInput;
