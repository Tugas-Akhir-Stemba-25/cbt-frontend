import Image from 'next/image'

const LoginRightSide = () => {
  return (
    <div className="hidden w-full flex-col gap-28 rounded-sm bg-[#7e73fa] p-16 text-white lg:flex">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-medium">Selamat Datang di LuminaQA</h2>
        <p className="w-2/3 text-sm">
          Website Computer Based-Test ini digunakan untuk keperluan pengelolaan dan pelaksanaan ujian di STEMBA.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/assets/images/login-illustration.svg" alt="Login illustration" width={400} height={400} />
      </div>
    </div>
  )
}

export default LoginRightSide
