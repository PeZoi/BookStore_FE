class UserModel {
   idUser: number;
   dateOfBirth: Date;
   deliveryAddress: string;
   purchaseAddress: string;
   email: string;
   firstName: string;
   lastName: string;
   gender: string;
   password: string;
   phoneNumber: string;
   username: string;
   avtar: string;

   constructor(idUser: number,
      dateOfBirth: Date,
      deliveryAddress: string,
      purchaseAddress: string,
      email: string,
      firstName: string,
      lastName: string,
      gender: string,
      password: string,
      phoneNumber: string,
      username: string, avtar: string) {
      this.idUser = idUser;
      this.dateOfBirth = dateOfBirth;
      this.deliveryAddress = deliveryAddress;
      this.purchaseAddress = purchaseAddress;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.username = username;
      this.avtar = avtar;
   }
}

export default UserModel;