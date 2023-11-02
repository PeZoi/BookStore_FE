import React from "react";
import FavoriteBooksList from "../products/FavoriteBooksList";

interface MyFavoriteBooksPageProps {
	setTotalCart: any;
}

const MyFavoriteBooksPage: React.FC<MyFavoriteBooksPageProps> = (props) => {
	return (
		<>
			<FavoriteBooksList setTotalCart={props.setTotalCart} />
		</>
	);
};

export default MyFavoriteBooksPage;
