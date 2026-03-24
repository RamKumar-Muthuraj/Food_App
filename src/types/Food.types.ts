export type Food = {
  docId?: string;
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  isChefRecommended: string;
  isVeg: string;
  isTrending: string;
  isShowAsSlide: string;
};


export type Review = {
  id: string;
  userId: string;
  foodId: string;
  rating: string;
  isHelpful: string;
  comment: string;
  createdAt: string;
  userName?: string;
};