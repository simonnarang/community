import { Center } from "@mantine/core";
import Link from "next/link";

export default function index() {
  return (
    <>
    <div className="header">
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
    <div>
      <Center>
        <img src="/landing-image.png" alt="image" id="landing-image" width={300} />
      </Center>
    </div>
	</div>
  </>
  )
}

