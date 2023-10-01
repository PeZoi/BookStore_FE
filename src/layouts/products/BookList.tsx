import React from "react";
import Book from "../../model/Book";
import BookProps from "./components/BookProps";

const BookList: React.FC = () => {
	const books: Book[] = [
		{
			id: 1,
			name: "Book 1",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/8/9/8935278607311.jpg",
		},
		{
			id: 1,
			name: "Book 2",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh2_bia-01.jpg",
		},
		{
			id: 1,
			name: "Book 3",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/8/9/8935280913288.jpg",
		},
		{
			id: 1,
			name: "Book 1",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/8/9/8935278607311.jpg",
		},
		{
			id: 1,
			name: "Book 2",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh2_bia-01.jpg",
		},
		{
			id: 1,
			name: "Book 3",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/8/9/8935280913288.jpg",
		},
		{
			id: 1,
			name: "Book 1",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/8/9/8935278607311.jpg",
		},
		{
			id: 1,
			name: "Book 2",
			author: "John",
			isbn: "123",
			description: "Description Book 1",
			listPrice: 50000,
			sellPrice: 45000,
			quantity: 45,
			avgRating: 4.5,
			imgURL:
				"https://cdn0.fahasa.com/media/catalog/product/m/u/muonkiepnhansinh2_bia-01.jpg",
		},
	];
	return (
		<div className='container mb-5'>
			<div className='row mt-4'>
				{books.map((book) => (
					<BookProps key={book.id} book={book} />
				))}
			</div>
		</div>
	);
};

export default BookList;
