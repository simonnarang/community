import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Center } from '@mantine/core'

export default function LandingPage() {
  const supabase = useSupabaseClient()
  return (
    <>
    <div class="header">
		<ul>
			<li>
				<a href="#">Home</a>
			</li>
			<li>
				<a href="#">About</a>
			</li>
			<li>
				<a href="#">Contact</a>
			</li>
			<li>
				{/* <a href="#">Get Started</a> */}
        <Link href="/login">
        <button id="purple-landing-button">Get Started</button>
      </Link>
			</li>

		</ul>
		<h2>CommUnity</h2>
		<p>A new  platform that redefines community engagement for college students, on and off campus.</p>
    <div align="center">
      <img src="/landing-image.png" alt="image" id="landing-image" width={300} />
    </div>
	</div>
  </>
    // <>
    //   <Header />
    //   <div>
    //     {/* centerred text */}
    //     <h1 id="landing-text">A new  platform that redefines community engagement for college students, on and off campus.</h1>
    //   </div>
    //   <div align="center">
    //     <img src="/landing-image.png" alt="image" width={600} />
    //   </div>
    //   <div>
    //     <h3>
    //       Maintain engagement within your own community by exploring what events CommUnity has to offer. Get Started by creating an account or logging in.
    //     </h3>
    //   </div>
    //   <Footer />
    // </>
  )
}

