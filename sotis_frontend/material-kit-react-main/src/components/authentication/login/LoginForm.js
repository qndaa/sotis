import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

// material
import { Link, Stack, Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function LoginForm({ handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { isSubmitting } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email here!"
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Email"
          ></Input>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password here!"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></Input>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
