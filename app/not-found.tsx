import Link from 'next/link'
 import Image from 'next/image'
export default function NotFound() {
  return (
    <div className="flex bg-sky-100 items-center justify-center h-screen flex-col">
       <Image src="/logo.svg" width={190} height={40} alt="logo" />
      <h1 className="text-4xl font-bold text-primary mt-5 mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mt-4">
        The page you{"'"}re looking for does not exist. Go back to{' '}
        <br/>
        <Link href="/">
          <p className="text-blue-500 text-center">home</p>
        </Link>
        .
      </p>
    </div>
  )
}