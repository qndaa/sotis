import { Card } from "@mui/material";
import LoginForm from "../../components/login/LoginForm";
import "./styles.scss";

const Login = () => {
  return (
    <div className="login-form-container">
      <Card className="card-container">
        <LoginForm handleSubmit={() => alert("Submitted")} />
      </Card>
    </div>
  );
};

export default Login;
