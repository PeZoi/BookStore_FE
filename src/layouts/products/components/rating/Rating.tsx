/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Rate from "@mui/material/Rating";

const Rating: React.FC = () => {
	const [value, setValue] = React.useState<number | null>(5);

	return (
		<Rate
			name='simple-controlled'
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		/>
	);
};

export default Rating;
