import { MainLayout } from "../layouts";
import { SignUp } from "../components";

export const Register = ({ onRegisterHandler }) => {
  const onClickRegisterHandler = (registeredDetails) => {
    onRegisterHandler?.(registeredDetails);
  };
  return (
    <MainLayout
      component={<SignUp onClickRegisterHandler={onClickRegisterHandler} />}
    />
  );
};
