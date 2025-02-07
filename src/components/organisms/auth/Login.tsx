import LoginLeftSide from './LoginLeftSide'
import LoginRightSide from './LoginRightSide'

const Login = () => {
  return (
    <div className="grid h-screen grid-cols-2 p-2">
      <LoginLeftSide />
      <LoginRightSide />
    </div>
  )
}

export default Login
