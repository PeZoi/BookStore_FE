import React, { useEffect } from "react";
import FavoriteBooksList from "../products/FavoriteBooksList";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

interface MyFavoriteBooksPageProps {}

const MyFavoriteBooksPage: React.FC<MyFavoriteBooksPageProps> = (props) => {
	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});

	if (!isLoggedIn) {
		return null;
	}

	return (
		<>
			<FavoriteBooksList />
		</>
	);
};

export default MyFavoriteBooksPage;
