import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import LoginForm from '@/components/molecules/form/LoginForm'

const LoginLeftSide = () => {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <LoginForm />
      <ButtonToggleTheme className="absolute right-2 top-2" />
    </div>
  )
}

export default LoginLeftSide
