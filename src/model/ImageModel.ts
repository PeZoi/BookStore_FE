class ImageModel {
   idImage: number;
   nameImage?: string;
   isThumbnail?: boolean;
   urlImage?: string;
   dataImage?: string;

   constructor(idImage: number, nameImage: string, isThumbnail: boolean, urlImage: string, dataImage: string) {
      this.idImage = idImage;
      this.nameImage = nameImage;
      this.isThumbnail = isThumbnail;
      this.urlImage = urlImage;
      this.dataImage = dataImage;
   }
}

export default ImageModel;