import { Typography } from "@mui/material";
import Button from "@material-ui/core/Button";
import { Field, Form, Formik } from "formik";
import InputWithErrorMessage from "./InputWithErrors";
import { loginSchema } from "./Validations";

type LoginFormProps = {
  handleSubmit: () => void;
};

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <>
          <Form>
            <Typography variant="h2">Login</Typography>
            <br />
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Email" />
            <br />
            <label htmlFor="email">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <br />
            <Button color="primary" variant="contained">
              Submit
            </Button>
          </Form>
        </>
      </Formik>
    </div>
  );
};

export default LoginForm;
