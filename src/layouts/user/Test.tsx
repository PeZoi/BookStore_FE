import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = () => {
	const [username, setUsername] = useState<String | undefined>(undefined);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const data = jwtDecode(token);
			console.log(data);
			if (data) {
				setUsername(data.sub);
			}
		}
	}, []);
	return (
		<div>
			{username && <p className='text-primary p-5'>Xin chào, {username}</p>}
		</div>
	);
};

export default Test;