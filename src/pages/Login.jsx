import { MainLayout } from '../layouts'
import { SignIn } from '../components'


export const Login = ({onLoginHandler}) => {
  const onClickLogInHandler = (loginDetails) => {
    onLoginHandler?.(loginDetails)
  }
  return (
    <MainLayout component={<SignIn onClickLogInHandler={onClickLogInHandler}/>} />
  )
}
