export async function request(endpoint: string) {
   // Truy cập đến đường dẫn
   const response = await fetch(endpoint);

   // Thất bại
   if (!response.ok) {
      throw new Error(`Không thể truy cập ${endpoint}`);
   }

   // Thành công
   return response.json();
}