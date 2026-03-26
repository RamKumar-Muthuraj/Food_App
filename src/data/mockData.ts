export const CollectionName = {
  FOODAPP_USERS: "FoodApp_Users",
  FOODAPP_ORDERS: "FoodApp_Orders",
  FOODAPP_VENDORS: "FoodApp_Vendors",
  FOODAPP_FOODS: "FoodApp_Foods",
  FOODAPP_ADDRESSES: "FoodApp_UserAddresses",
  FOODAPP_REVIEWS: "FoodApp_Reviews",
  FOODAPP_CART: "FoodApp_Cart",
  NEWSELTTER: "NewSeltter",
} as const;

export const ProviderName = {
  GOOGLE: "Google",
  LOCAL: "Local",
} as const;

export const AuthRole = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export const categories = [
  {
    id: 1,
    name: "Pizza",
    icon: "🍕",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    id: 2,
    name: "Indian",
    icon: "🍛",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  },
  {
    id: 3,
    name: "Chinese",
    icon: "🥡",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400",
  },
  {
    id: 4,
    name: "Burgers",
    icon: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 5,
    name: "Sushi",
    icon: "🍱",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
  },
  {
    id: 6,
    name: "Desserts",
    icon: "🍰",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
  },
  {
    id: 7,
    name: "Italian",
    icon: "🍝",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
  },
  {
    id: 8,
    name: "Mexican",
    icon: "🌮",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  },
];

export const featuredRestaurants = [
  {
    id: 1,
    name: "Golden Palace",
    cuisine: "Indian",
    rating: 4.8,
    reviews: 1250,
    deliveryTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    badge: "Chef's Choice",
  },
  {
    id: 2,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.6,
    reviews: 890,
    deliveryTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.9,
    reviews: 2100,
    deliveryTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    badge: "Premium",
  },
  {
    id: 4,
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.7,
    reviews: 1580,
    deliveryTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800",
    badge: "New",
  },
];

export const trendingFoods = [
  {
    id: 1,
    name: "Truffle Mushroom Pizza",
    restaurant: "Bella Italia",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600",
    category: "Pizza",
    isVeg: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Butter Chicken Deluxe",
    restaurant: "Golden Palace",
    price: 18.99,
    rating: 4.8,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
    category: "Indian",
    isVeg: false,
    badge: "Chef Special",
  },
  {
    id: 3,
    name: "Premium Sushi Platter",
    restaurant: "Sushi Master",
    price: 45.99,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600",
    category: "Sushi",
    isVeg: false,
    badge: "Premium",
  },
  {
    id: 4,
    name: "Wagyu Beef Burger",
    restaurant: "The Burger House",
    price: 28.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
    category: "Burgers",
    isVeg: false,
    badge: "Hot Deal",
  },
  {
    id: 5,
    name: "Szechuan Noodles",
    restaurant: "Dragon Wok",
    price: 16.99,
    rating: 4.6,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600",
    category: "Chinese",
    isVeg: true,
    badge: "Spicy",
  },
  {
    id: 6,
    name: "Tiramisu Classic",
    restaurant: "Bella Italia",
    price: 12.99,
    rating: 4.8,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    category: "Desserts",
    isVeg: true,
    badge: "Sweet",
  },
];

export const coupons = [
  {
    id: 1,
    code: "FEAST50",
    title: "50% Off First Order",
    description: "New users only. Max discount $20",
    discount: "50%",
    minOrder: 30,
    expiry: "Mar 30, 2026",
  },
  {
    id: 2,
    code: "GOLD20",
    title: "Flat $20 Off",
    description: "On orders above $50",
    discount: "$20",
    minOrder: 50,
    expiry: "Apr 15, 2026",
  },
  {
    id: 3,
    code: "PREMIUM25",
    title: "25% Off Premium",
    description: "Premium restaurants only",
    discount: "25%",
    minOrder: 40,
    expiry: "Apr 30, 2026",
  },
];

export const vendorDetails = {
  id: 1,
  name: "Golden Palace",
  cuisine: ["Indian", "North Indian", "Mughlai"],
  rating: 4.8,
  reviews: 1250,
  deliveryTime: "25-30 min",
  deliveryFee: 2.99,
  minOrder: 15,
  banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200",
  description:
    "Experience authentic Indian cuisine with a modern twist. Our chef brings 25 years of culinary expertise.",
  address: "123 Food Street, Culinary District",
  openingHours: "11:00 AM - 11:00 PM",
  offers: ["Free delivery on orders above $30", "20% off on weekdays"],
  menu: [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Tender chicken in rich tomato cream sauce",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
      category: "Main Course",
      isVeg: false,
      chefRecommended: true,
      rating: 4.9,
      reviews: 345,
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "Grilled cottage cheese in spiced gravy",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400",
      category: "Main Course",
      isVeg: true,
      chefRecommended: true,
      rating: 4.8,
      reviews: 289,
    },
    {
      id: 3,
      name: "Biryani Special",
      description: "Fragrant basmati rice with aromatic spices",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
      category: "Main Course",
      isVeg: false,
      chefRecommended: true,
      rating: 4.9,
      reviews: 567,
    },
    {
      id: 4,
      name: "Garlic Naan",
      description: "Fresh baked bread with garlic butter",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?w=400",
      category: "Breads",
      isVeg: true,
      rating: 4.7,
      reviews: 432,
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils in butter",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
      category: "Main Course",
      isVeg: true,
      rating: 4.6,
      reviews: 198,
    },
    {
      id: 6,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in rose syrup",
      price: 6.99,
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.8,
      reviews: 276,
    },
  ],
  reviews: [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "Mar 15, 2026",
      comment:
        "Absolutely incredible! The butter chicken was divine and the naan was perfectly crispy.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      id: 2,
      userName: "Michael Chen",
      rating: 4,
      date: "Mar 12, 2026",
      comment:
        "Great food and fast delivery. The biryani was aromatic and flavorful.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      rating: 5,
      date: "Mar 10, 2026",
      comment:
        "Best Indian food in town! Chef's recommendations are always on point.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ],
};

export const userOrders = [
  {
    id: "#ORD-2456",
    date: "Mar 20, 2026",
    restaurant: "Golden Palace",
    items: 3,
    total: 45.99,
    status: "Delivered",
    statusColor: "text-accent",
  },
  {
    id: "#ORD-2455",
    date: "Mar 18, 2026",
    restaurant: "Bella Italia",
    items: 2,
    total: 38.5,
    status: "Delivered",
    statusColor: "text-accent",
  },
  {
    id: "#ORD-2454",
    date: "Mar 15, 2026",
    restaurant: "Dragon Wok",
    items: 4,
    total: 52.3,
    status: "Cancelled",
    statusColor: "text-destructive",
  },
];

export const adminStats = [
  { label: "Total Revenue", value: "$48,574", change: "+12.5%", trend: "up" },
  { label: "Active Orders", value: "124", change: "+8", trend: "up" },
  { label: "Total Users", value: "8,549", change: "+245", trend: "up" },
  { label: "Restaurants", value: "156", change: "+12", trend: "up" },
];

export const recentOrders = [
  {
    id: "#2456",
    customer: "John Doe",
    restaurant: "Golden Palace",
    amount: "$45.99",
    status: "Preparing",
    time: "5 min ago",
  },
  {
    id: "#2455",
    customer: "Jane Smith",
    restaurant: "Bella Italia",
    amount: "$38.50",
    status: "Delivered",
    time: "12 min ago",
  },
  {
    id: "#2454",
    customer: "Mike Johnson",
    restaurant: "Dragon Wok",
    amount: "$52.30",
    status: "On the way",
    time: "18 min ago",
  },
  {
    id: "#2453",
    customer: "Sarah Wilson",
    restaurant: "Sushi Master",
    amount: "$67.80",
    status: "Preparing",
    time: "25 min ago",
  },
  {
    id: "#2452",
    customer: "Tom Brown",
    restaurant: "The Burger House",
    amount: "$28.90",
    status: "Delivered",
    time: "32 min ago",
  },
];

const mockVendors = [
  {
    id: "v1",
    name: "Golden Palace",
    description: "Authentic Indian cuisine",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    rating: "4.8",
    phone: "9876543210",
    address: "T Nagar, Chennai",
    type: "Restaurant",
    deliveryTime: "30-40 mins",
    location: "Chennai",
    isTopChoice: "true",
  },
  {
    id: "v2",
    name: "Dragon Wok",
    description: "Chinese street food",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: "4.6",
    phone: "9123456789",
    address: "Indiranagar, Bangalore",
    type: "Restaurant",
    deliveryTime: "25-35 mins",
    location: "Bangalore",
    isTopChoice: "false",
  },
];

const mockFoods = [
  {
    id: "f1",
    vendorId: "v1",
    name: "Butter Chicken",
    description: "Creamy rich butter chicken",
    price: "250",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Indian",
    isChefRecommended: "true",
    isVeg: "false",
    isTrending: "true",
    isShowAsSlide: "true",
  },
  {
    id: "f2",
    vendorId: "v2",
    name: "Veg Hakka Noodles",
    description: "Spicy veg noodles",
    price: "180",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841",
    category: "Chinese",
    isChefRecommended: "false",
    isVeg: "true",
    isTrending: "true",
    isShowAsSlide: "false",
  },
];

const mockOrders = [
  {
    id: "o1",
    userId: "u1",
    vendorId: "v1",
    items: JSON.stringify([{ foodId: "f1", qty: 2 }]),
    totalAmount: "500",
    status: "DELIVERED",
    createdAt: "2026-03-23",
  },
  {
    id: "o2",
    userId: "u2",
    vendorId: "v2",
    items: JSON.stringify([{ foodId: "f2", qty: 1 }]),
    totalAmount: "180",
    status: "PLACED",
    createdAt: "2026-03-23",
  },
];

const mockAddresses = [
  {
    id: "a1",
    userId: "u1",
    street: "12 Gandhi Street",
    city: "Chennai",
    state: "Tamil Nadu",
    zip: "600001",
    country: "India",
    isDefault: "true",
  },
  {
    id: "a2",
    userId: "u2",
    street: "45 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560001",
    country: "India",
    isDefault: "true",
  },
];

const mockReviews = [
  {
    id: "r1",
    userId: "u1",
    foodId: "f1",
    rating: "5",
    isHelpful: "true",
    comment: "Amazing taste and quality!",
    createdAt: "2026-03-23",
  },
  {
    id: "r2",
    userId: "u2",
    foodId: "f1",
    rating: "4",
    isHelpful: "false",
    comment: "Good but slightly spicy",
    createdAt: "2026-03-22",
  },
  {
    id: "r3",
    userId: "u1",
    foodId: "f2",
    rating: "4",
    isHelpful: "true",
    comment: "Very tasty noodles",
    createdAt: "2026-03-23",
  },
];

export const mockDatabase = {
  vendors: mockVendors,
  foods: mockFoods,
  orders: mockOrders,
  addresses: mockAddresses,
  reviews: mockReviews,
};
