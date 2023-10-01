class BookModel {
   idBook: string;
   nameBook?: string; // Có thể NULL
   author?: string;
   isbn?: string;
   description?: string;
   listPrice?: number;
   sellPrice?: number;
   quantity?: number;
   avgRating?: number;

   constructor(idBook: string, nameBook: string, author: string, isbn: string, description: string, listPrice: number, sellPrice: number, quantity: number, avgRating: number) {
      this.idBook = idBook;
      this.nameBook = nameBook;
      this.author = author;
      this.isbn = isbn;
      this.description = description;
      this.listPrice = listPrice;
      this.sellPrice = sellPrice;
      this.quantity = quantity;
      this.avgRating = avgRating;
   }
}

export default BookModel;