import LoginLeftSide from './LoginLeftSide'
import LoginRightSide from './LoginRightSide'

const Login = () => {
  return (
    <div className="grid max-h-screen grid-cols-1 p-2 lg:grid-cols-2">
      <LoginLeftSide />
      <LoginRightSide />
    </div>
  )
}

export default Login
