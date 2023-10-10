import BookModel from '../model/BookModel'
import { request } from './Request';

interface resultInterface { // Tạo ra các biến trả về
   bookList: BookModel[];
   totalPage: number;
   size: number;
}

async function getBook(endpoint: string): Promise<resultInterface> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   // Lấy ra thông tin trang
   const totalPage: number = response.page.totalPages;
   const size: number = response.page.totalElements;

   // Lấy ra danh sách quyển sách
   const bookList: any = response._embedded.books.map((bookData: any) => ({
      ...bookData,
   }))

   return { bookList: bookList, totalPage: totalPage, size: size };
}

export async function getAllBook(size: number, page: number): Promise<resultInterface> {
   // Xác định endpoint
   const endpoint: string = `http://localhost:8080/books?sort=idBook,desc&size=${size}&page=${page}`;

   return getBook(endpoint);
}

export async function getHotBook(): Promise<resultInterface> {
   // Xác định endpoint
   const endpoint: string = "http://localhost:8080/books?sort=avgRating,desc&size=4";

   return getBook(endpoint);
}

export async function getNewBook(): Promise<resultInterface> {
   // Xác định endpoint
   const endpoint: string = "http://localhost:8080/books?sort=idBook,desc&size=4";

   return getBook(endpoint);
}