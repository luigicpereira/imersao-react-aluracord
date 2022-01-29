import { useState } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./4028-coins-grow.json";

export default function Loading() {
	const [isStopped, setIsStopped] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	return (
		<div>
			<Lottie
				options={{
					loop: true,
					autoplay: true,
					animationData: loadingAnimation,
					rendererSettings: {
						preserveAspectRatio: "none",
					},
				}}
				width={400}
				height={200}
				isStopped={isStopped}
				isPaused={isPaused}
			/>
		</div>
	);
}
