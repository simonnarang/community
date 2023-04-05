import { Center } from '@mantine/core';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <Link href="/login">
        <button id="purple-landing-button">Get Started</button>
      </Link>
        <div className="header">
            <img src="/logo.png" alt="logo" id="landing-logo" width={300} />
        </div>
    </div>
  )
}