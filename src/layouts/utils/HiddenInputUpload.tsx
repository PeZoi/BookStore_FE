import React from "react";
import { styled } from "@mui/material/styles";

interface HiddenInputUploadProps {
	handleImageUpload?: any;
}

const HiddenInputUpload: React.FC<HiddenInputUploadProps> = (props) => {
	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});
	return (
		<VisuallyHiddenInput type='file' onChange={props.handleImageUpload} />
	);
};

export default HiddenInputUpload;
