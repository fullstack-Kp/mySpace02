import { MainLayout } from "../layouts";
import { SignIn } from "../components";

export const Login = ({
  onLoginHandler,
  setLoginErrorAlert,
  loginErrorAlert,
  passwordError,
  navigateToRegisterScreen,
}) => {
  return (
    <MainLayout
      component={
        <SignIn
          onClickLogInHandler={onLoginHandler}
          setLoginErrorAlert={setLoginErrorAlert}
          loginErrorAlert={loginErrorAlert}
          passwordError={passwordError}
          navigateToRegisterScreen={navigateToRegisterScreen}
        />
      }
    />
  );
};
