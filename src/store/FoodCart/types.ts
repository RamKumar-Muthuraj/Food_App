export type CartItem = {
  docId: string;
  id: string;
  userId: string;
  vendorId: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};
