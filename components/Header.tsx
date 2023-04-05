import Link from 'next/link';

export default function Header() {
    return (
      <div className="header">
        <div className="">
        </div>
        <img src="/logo.png" alt="logo" id="landing-logo" width={300}/>
        <Link href="/login">
            <button>Login</button>
        </Link>
        <div className="flex-end flex">
        </div>
      </div>
    )
  }