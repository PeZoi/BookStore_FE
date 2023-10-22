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

   const optionsShow = `size=${size}&page=${page}`;

   // Endpoint mặc định
   let endpoint: string = `http://localhost:8080/books?` + optionsShow;

   let filterEndpoint = '';
   if (filter === 1) {
      filterEndpoint = "sort=nameBook";
   } else if (filter === 2) {
      filterEndpoint = "sort=nameBook,desc";
   } else if (filter === 3) {
      filterEndpoint = "sort=sellPrice";
   } else if (filter === 4) {
      filterEndpoint = "sort=sellPrice,desc";
   } else if (filter === 5) {
      filterEndpoint = "sort=soldQuantity,desc";
   }

   // Nếu có key search và không có lọc thể loại
   if (keySearch !== '') {
      // Mặc đinh nếu không có filter
      endpoint = `http://localhost:8080/books/search/findByNameBookContaining?nameBook=${keySearch}&` + optionsShow + '&' + filterEndpoint;
   }

   // Nếu idGenre không undifined
   if (idGenre !== undefined) {
      // Nếu có không có key search và có lọc thể loại
      if (keySearch === '' && idGenre > 0) {
         // Mặc định nếu không có filter
         endpoint = `http://localhost:8080/books/search/findByListGenres_idGenre?idGenre=${idGenre}&` + optionsShow + '&' + filterEndpoint;
      }

      // Nếu có key search và có lọc thể loại
      if (keySearch !== '' && idGenre > 0) {
         endpoint = `http://localhost:8080/books/search/findByNameBookContainingAndListGenres_idGenre?nameBook=${keySearch}&idGenre=${idGenre}&` + optionsShow + '&' + filterEndpoint;
      }

      // Chỉ lọc filter
      if (keySearch === '' && (idGenre === 0 || typeof (idGenre) === 'string')) {
         endpoint = "http://localhost:8080/books?" + optionsShow + '&' + filterEndpoint;
      }

      // console.log("idGenre: " + typeof (idGenre) + idGenre + ", filter: " + typeof (filter) + filter + ", keySearch" + +typeof (keySearch) + keySearch);
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