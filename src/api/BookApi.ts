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

export async function getAllBook(size?: number, page?: number): Promise<resultInterface> {
   // Nếu không truyền size thì mặc định là 8
   if (!size) {
      size = 8;
   }

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

export async function searchBook(keySearch?: string, idGenre?: number, filter?: number, size?: number, page?: number): Promise<resultInterface> {

   // Nếu key search không undifined
   if (keySearch) {
      keySearch = keySearch.trim();
   }

   // console.log(idGenre);


   const optionsShow = `size=${size}&page=${page}&sort=idBook,desc`;

   // Endpoint mặc định
   let endpoint: string = `http://localhost:8080/books?` + optionsShow;

   // Nếu có key search và không có lọc thể loại
   if (keySearch !== '') {
      // Mặc đinh nếu không có filter
      endpoint = `http://localhost:8080/books/search/findByNameBookContaining?nameBook=${keySearch}&` + optionsShow;
      // Nếu có filter
      if (filter === 1) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContaining?sort=nameBook&nameBook=${keySearch}&` + optionsShow;
      } else if (filter === 2) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContaining?sort=nameBook,desc&nameBook=${keySearch}&` + optionsShow;
      } else if (filter === 3) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContaining?sort=sellPrice&nameBook=${keySearch}&` + optionsShow;
      } else if (filter === 4) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContaining?sort=sellPrice,desc&nameBook=${keySearch}&` + optionsShow;
      } else if (filter === 5) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContaining?sort=soldQuantity&nameBook=${keySearch}&` + optionsShow;
      }
   }

   // Nếu idGenre không undifined
   if (idGenre !== undefined) {
      // Nếu có không có key search và có lọc thể loại
      if (keySearch === '' && idGenre > 0) {
         // Mặc định nếu không có filter
         endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?idGenre=${idGenre}&` + optionsShow;

         if (filter === 1) {
            endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?sort=nameBook&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 2) {
            endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?sort=nameBook,desc&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 3) {
            endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?sort=sellPrice&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 4) {
            endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?sort=sellPrice,desc&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 5) {
            endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?sort=soldQuantity&idGenre=${idGenre}&` + optionsShow;
         }
      }

      // Nếu có key search và có lọc thể loại
      if (keySearch !== '' && idGenre > 0) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;

         if (filter === 1) {
            endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?sort=nameBook&nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 2) {
            endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?sort=nameBook,desc&nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 3) {
            endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?sort=sellPrice&nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 4) {
            endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?sort=sellPrice,desc&nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;
         } else if (filter === 5) {
            endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?sort=soldQuantity&nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow;
         }
      }

      // Chỉ lọc filter
      if (keySearch === '' && idGenre === 0) {
         if (filter === 1) {
            endpoint = "http://localhost:8080/books?sort=nameBook&" + optionsShow;
         } else if (filter === 2) {
            endpoint = "http://localhost:8080/books?sort=nameBook,desc&" + optionsShow;
         } else if (filter === 3) {
            endpoint = "http://localhost:8080/books?sort=sellPrice&" + optionsShow;
         } else if (filter === 4) {
            endpoint = "http://localhost:8080/books?sort=sellPrice,desc&" + optionsShow;
         } else if (filter === 5) {
            endpoint = "http://localhost:8080/books?sort=soldQuantity&" + optionsShow;
         }
      }

      // console.log("idGenre: " + idGenre + ", filter: " + filter + ", keySearch" + keySearch);
   }

   // console.log(endpoint);




   return getBook(endpoint);
}

export async function getBookById(idBook: number): Promise<BookModel | null> {
   const endpoint = `http://localhost:8080/books/${idBook}`;

   try {
      // Gọi phương thức request()
      const response = await request(endpoint);

      // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
      if (response) {
         // Trả về quyển sách
         return response;
      } else {
         throw new Error("Sách không tồn tại");
      }

   } catch (error) {
      console.error('Error: ', error);
      return null;
   }
}