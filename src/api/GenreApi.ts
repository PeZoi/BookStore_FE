import GenreModel from "../model/GenreModel";
import { request } from "./Request";

interface resultInterface {
   genreList: GenreModel[];
}

async function getGenre(endpoint: string): Promise<resultInterface> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   // Lấy ra danh sách quyển sách
   const genreList: any = response._embedded.genres.map((genreData: any) => ({
      ...genreData,
   }))

   return { genreList: genreList };
}

export async function getAllGenres(): Promise<resultInterface> {
   const endpoint = "http://localhost:8080/genre?sort=nameGenre";

   return getGenre(endpoint);
}