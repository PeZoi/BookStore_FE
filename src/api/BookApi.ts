import BookModel from '../model/BookModel'
import { request } from './Request';


export async function getAllBook(): Promise<BookModel[]> {
   // const result: BookModel[] = [];

   // Xác định endpoint
   const endpoint: string = "http://localhost:8080/books";

   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.books.map((bookData: any) => ({
      ...bookData,
   }));

   // Lấy ra json sách
   // const responseData = response._embedded.books;

   // for (const key in responseData) {
   //    result.push({
   //       idBook: responseData[key].idBook,
   //       nameBook: responseData[key].nameBook,
   //       author: responseData[key].author,
   //       isbn: responseData[key].isbn,
   //       description: responseData[key].description,
   //       listPrice: responseData[key].listPrice,
   //       sellPrice: responseData[key].sellPrice,
   //       quantity: responseData[key].quantity,
   //       avgRating: responseData[key].avgRating
   //    })
   // }

   // return result;
}

export async function getHotBook(): Promise<BookModel[]> {
   // Xác định endpoint
   const endpoint: string = "http://localhost:8080/books?sort=avgRating,desc&size=4";

   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.books.map((bookData: any) => ({
      ...bookData,
   }));
}

export async function getNewBook(): Promise<BookModel[]> {
   // Xác định endpoint
   const endpoint: string = "http://localhost:8080/books?sort=idBook,desc&size=4";

   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.books.map((bookData: any) => ({
      ...bookData,
   }));
}