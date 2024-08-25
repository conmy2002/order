import React from "react";
import bg from "@/../public/images/bg.png";

function Background() {
	return (
		<div
			style={{
				zIndex: -1,
				position: "absolute",
				height: bg.height * 1.5,
				width: bg.width * 1.5,
				right: 0,
				bottom: 0,
				opacity: 0.5,
				backgroundImage: `url(${bg.src})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		></div>
	);
}

export default Background;
