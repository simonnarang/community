import { Center } from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
	const session = useSession()
	const router = useRouter();

	useEffect(() => {
        if (session) router.push('/homepage')
    })
	
	return (
		<div className="idx">
			<div className="header" id="headerLanding">
				<ul>
					<li>
						<a href="https://snarang.notion.site/CommUnity-e44a3d0716384918873b9cb174bbecac">About</a>
					</li>
					<li>
						<Link href="/login">
						<button id="purple-landing-button">Get Started</button>
						</Link>
					</li>

				</ul>
				<h2>CommUnity</h2>
				<p>A new  platform that redefines community engagement for college students, on and off campus.</p>
			</div>
			<div className="vid">
				<video autoPlay muted loop id="myVideo">
					<source src="video.mp4" type="video/mp4" />
				</video>
			</div>
		</div>
	)
}

