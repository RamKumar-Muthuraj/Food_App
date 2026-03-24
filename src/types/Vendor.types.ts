// export type Vendor = {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   rating: string;
//   phone: string;
//   address: string;
//   type: string;
//   deliveryTime: string;
//   location: string;
//   isTopChoice: string;
// };


export type Vendor = {
  docId: string;
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  logo: string;
  rating: number;
  address: string;
  location: string;
  deliveryTime: string;
  type: string;
  phone: string;
  isTopChoice: boolean;

  cuisine: string[];
  offers: string[];
  reviews: number;
  minOrder: number;
  deliveryFee: number;
  openingHours: string;

  menu: any[];
};