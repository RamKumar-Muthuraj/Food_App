import { Link } from "react-router";
import {
  Star,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ChefHat,
  Award,
  Heart,
  Share2,
} from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  vendorDetails,
  motion,
} from "@/shared";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";
import { FoodService } from "@/service/food.service";

export default function VendorPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const vendorRes: any = await VendorService.getById(id);
      const foodsRes: any = await FoodService.getAll();
      console.log(vendorRes, "VendorRes");
      console.log(foodsRes, "Food Res");
      const v = vendorRes.content;

      const menu = foodsRes
        .filter((f: any) => f.content.vendorId === v.id)
        .map((f: any) => ({
          id: f.content.id,
          name: f.content.name,
          description: f.content.description,
          image: f.content.image,
          price: f.content.price,
          category: f.content.category,
          chefRecommended: f.content.isChefRecommended === "true",
          isVeg: f.content.isVeg === "true",
          rating: 4.5,
          reviews: 0,
        }));

        console.log(menu,"menu");

      setVendor({
        ...v,
        banner: v.image,
        logo: v.image,
        cuisine: [v.type],
        offers: [],
        menu,
      });
    };

    load();
  }, [id]);

  console.log(vendor,"vendor");

  if (!vendor) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading vendor...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"></div>

        {/* Vendor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -bottom-2 -right-2 bg-linear-to-r from-primary to-accent">
                <Award className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {vendor.cuisine.map((c, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-primary/30"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{vendor.rating}</span>
                      <span className="text-muted-foreground">
                        ({vendor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>Min order: ${vendor.minOrder}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Offers Banner */}
        {vendor.offers.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Special Offers
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {vendor.offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{offer}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-8">
            {/* Chef Recommended */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ChefHat className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Chef's Recommendations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendor.menu
                  .filter((item) => item.chefRecommended)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/food/${item.id}`}>
                        <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <Badge className="absolute top-4 left-4 bg-linear-to-r from-primary to-accent">
                              <ChefHat className="w-3 h-3 mr-1" />
                              Chef's Pick
                            </Badge>
                            {item.isVeg && (
                              <div className="absolute top-4 right-4 w-6 h-6 border-2 border-accent rounded flex items-center justify-center bg-background/80">
                                <div className="w-2 h-2 rounded-full bg-accent"></div>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="font-semibold text-sm">
                                  {item.rating}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({item.reviews})
                                </span>
                              </div>
                              <span className="text-xl font-bold text-primary">
                                ${item.price}
                              </span>
                            </div>
                            <Button className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90">
                              Add to Cart
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* All Menu Items */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Full Menu</h2>
              <div className="space-y-4">
                {vendor.menu.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/food/${item.id}`}>
                      <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                        <div className="flex gap-4 p-4">
                          <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {item.isVeg && (
                              <div className="absolute top-2 right-2 w-5 h-5 border border-accent rounded flex items-center justify-center bg-background/80">
                                <div className="w-2 h-2 rounded-full bg-accent"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                                  {item.name}
                                  {item.chefRecommended && (
                                    <Badge className="ml-2 bg-primary/20 text-primary">
                                      <ChefHat className="w-3 h-3 mr-1" />
                                      Recommended
                                    </Badge>
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.description}
                                </p>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-primary text-primary" />
                                    <span className="text-sm font-semibold">
                                      {item.rating}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      ({item.reviews})
                                    </span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {item.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-2xl font-bold text-primary">
                                  ${item.price}
                                </span>
                                <Button
                                  size="sm"
                                  className="bg-linear-to-r from-primary to-accent hover:opacity-90"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="p-8 border-primary/10">
              <h2 className="text-3xl font-bold mb-6">About {vendor.name}</h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                {vendor.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Restaurant Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {vendor.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Opening Hours</p>
                        <p className="text-sm text-muted-foreground">
                          {vendor.openingHours}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-sm text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Delivery Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Delivery Time</span>
                      <span className="font-semibold">
                        {vendor.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Delivery Fee</span>
                      <span className="font-semibold">
                        ${vendor.deliveryFee}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Minimum Order</span>
                      <span className="font-semibold">${vendor.minOrder}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="p-8 border-primary/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Customer Reviews</h2>
                <Button className="bg-linear-to-r from-primary to-accent hover:opacity-90">
                  Write a Review
                </Button>
              </div>

              {/* Rating Summary */}
              <div className="mb-8 p-6 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {vendor.rating}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(vendor.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {vendor.reviews} reviews
                    </p>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center gap-3 mb-2"
                      >
                        <span className="text-sm w-12">{rating} star</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-accent"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {rating === 5 ? "70%" : rating === 4 ? "20%" : "10%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              {/* <div className="space-y-6">
                {vendor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-6 border-b border-border last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage
                          src={review.avatar}
                          alt={review.userName}
                        />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.userName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
