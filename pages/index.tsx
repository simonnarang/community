import { Center } from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
	const session = useSession()
	const router = useRouter();

	useEffect(() => {
        if (session) router.push('/Homepage')
    })
	
	return (
		<>
		<div className="header">
			<ul>
				<li>
					<a href="#">About</a>
				</li>
				<li>
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

