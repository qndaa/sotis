import { Input } from "@mui/material";
import { ErrorMessage, useField } from "formik";

type InputFormProps = {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
};

const InputWithErrorMessage = ({
  name,
  type,
  placeholder,
  required,
}: InputFormProps) => {
  const [field] = useField({ name, type, placeholder });
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        required={required}
        {...field}
      />

      <br />
      <ErrorMessage name={name}></ErrorMessage>
    </div>
  );
};

export default InputWithErrorMessage;
