class BookModel {
   idBook: number;
   nameBook?: string; // Có thể NULL
   author?: string;
   isbn?: string;
   description?: string;
   listPrice: number;
   sellPrice: number;
   quantity?: number;
   avgRating?: number;
   soldQuantity?: number;
   discountPercent?: number;

   constructor(idBook: number, nameBook: string, author: string, isbn: string, description: string, listPrice: number, sellPrice: number, quantity: number, avgRating: number, soldQuantity: number, discountPercent: number) {
      this.idBook = idBook;
      this.nameBook = nameBook;
      this.author = author;
      this.isbn = isbn;
      this.description = description;
      this.listPrice = listPrice;
      this.sellPrice = sellPrice;
      this.quantity = quantity;
      this.avgRating = avgRating;
      this.soldQuantity = soldQuantity;
      this.discountPercent = discountPercent;
   }
}

export default BookModel;