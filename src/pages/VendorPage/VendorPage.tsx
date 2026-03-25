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
  Leaf,
  Flame,
  TrendingUp,
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
  motion,
  ChefCustomLoader,
} from "@/shared";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";
import { FoodService } from "@/service/food.service";
import VegIndicator from "./components/VegIndicator";
import RatingDisplay from "./components/RatingDisplay";
import { InfoPill, InfoRow } from "./components/InfoRow";

export default function VendorPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const vendorRes: any = await VendorService.getById(id);
      const foodsRes: any = await FoodService.getAll();
      const v = vendorRes.content;
    
      const menu = foodsRes
        .filter((f: any) => f.content.vendorId === id)
        .map((f: any) => ({
          id: f.content.id,
          docId: f.id,
          name: f.content.name,
          description: f.content.description,
          image: f.content.image,
          price: f.content.price,
          category: f.content.category,
          chefRecommended:
            f.content.isChefRecommended === "true" ||
            f.content.isChefRecommended === true,
          isVeg: f.content.isVeg === "true" || f.content.isVeg === true,
          rating: parseFloat(f.content.rating) || 4.5,
          reviews: parseInt(f.content.reviews) || 0,
        }));

          console.log(menu,"jdbkdn d");

      setVendor({
        ...v,
        banner: v.image,
        logo: v.image,
        cuisine: v.type ? [v.type] : [],
        offers: v.offers ?? [],
        menu,
        // Normalize types
        rating: parseFloat(v.rating) || 0,
        reviews: parseInt(v.reviews) || 0,
        isTopChoice: v.isTopChoice === "true" || v.isTopChoice === true,
        deliveryFee: v.deliveryFee ?? "Free",
        minOrder: v.minOrder ?? "0",
        openingHours: v.openingHours ?? "9:00 AM – 10:00 PM",
      });
    };

    load();
  }, [id]);

  if (!vendor) {
    return <ChefCustomLoader />;
  }

  const chefPicks = vendor.menu.filter((item: any) => item.chefRecommended);
  const vegItems = vendor.menu.filter((item: any) => item.isVeg);
  const nonVegItems = vendor.menu.filter((item: any) => !item.isVeg);

  console.log(vendor,"vendor data form vendor page");
  console.log(chefPicks,"chefPicks");
  console.log(vegItems,"vegItems");
  console.log(nonVegItems, "nonevegIttems");

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Vendor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-28 md:w-32 sm:h-28 md:h-32 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-xs">
                <Award className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold truncate">
                      {vendor.name}
                    </h1>
                    {vendor.isTopChoice && (
                      <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Top Choice
                      </Badge>
                    )}
                  </div>

                  {/* Cuisine badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {vendor.cuisine.map((c: string, i: number) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-primary/30 text-xs"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    {vendor.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                        <span className="font-semibold">
                          {Number(vendor.rating).toFixed(1)}
                        </span>
                        {vendor.reviews > 0 && (
                          <span className="text-muted-foreground">
                            ({vendor.reviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                    {vendor.deliveryTime && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                    )}
                    {vendor.location && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{vendor.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 border-primary/30 hover:bg-primary/10"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 border-primary/30 hover:bg-primary/10"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Offers Banner */}
        {vendor.offers?.length > 0 && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Special Offers
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              {vendor.offers.map((offer: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
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

          {/* ── MENU TAB ── */}
          <TabsContent value="menu" className="space-y-10">

            {/* Menu empty state */}
            {vendor.menu.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <ChefHat className="w-12 h-12 text-muted-foreground/40" />
                <p className="text-muted-foreground text-lg">
                  No menu items available yet.
                </p>
              </div>
            )}

            {/* Chef Recommended Section */}
            {chefPicks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    Chef's Recommendations
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {chefPicks.map((item: any, index: number) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/food/${item.docId ?? item.id}`}>
                        <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 h-full">
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Chef pick badge */}
                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-xs">
                              <ChefHat className="w-3 h-3 mr-1" />
                              Chef's Pick
                            </Badge>
                            {/* Veg / Non-veg indicator */}
                            <VegIndicator isVeg={item.isVeg} className="absolute top-3 right-3" />
                          </div>
                          <div className="p-4 sm:p-5">
                            <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <RatingDisplay rating={item.rating} reviews={item.reviews} />
                              <span className="text-lg sm:text-xl font-bold text-primary">
                                ₹{item.price}
                              </span>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm">
                              Add to Cart
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Menu */}
            {vendor.menu.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5">
                  Full Menu
                </h2>

                {/* Veg / Non-veg legend */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {vegItems.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                      <span className="inline-flex w-5 h-5 border-2 border-green-500 rounded items-center justify-center bg-background shrink-0">
                        <span className="w-2 h-2 rounded-full bg-green-500 block" />
                      </span>
                      Veg ({vegItems.length})
                    </div>
                  )}
                  {nonVegItems.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                      <span className="inline-flex w-5 h-5 border-2 border-red-500 rounded items-center justify-center bg-background shrink-0">
                        <span className="w-2 h-2 rounded-full bg-red-500 block" />
                      </span>
                      Non-Veg ({nonVegItems.length})
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {vendor.menu.map((item: any) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <Link to={`/food/${item.docId ?? item.id}`}>
                        <Card className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                          <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                            {/* Thumbnail */}
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <VegIndicator isVeg={item.isVeg} className="absolute top-1.5 right-1.5" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                    <h3 className="font-bold text-sm sm:text-lg group-hover:text-primary transition-colors truncate">
                                      {item.name}
                                    </h3>
                                    {item.chefRecommended && (
                                      <Badge className="bg-primary/20 text-primary text-xs shrink-0">
                                        <ChefHat className="w-2.5 h-2.5 mr-1" />
                                        Recommended
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {item.description}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <RatingDisplay rating={item.rating} reviews={item.reviews} small />
                                    {item.category && (
                                      <Badge variant="outline" className="text-xs">
                                        {item.category}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Price + CTA */}
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                  <span className="text-lg sm:text-2xl font-bold text-primary">
                                    ₹{item.price}
                                  </span>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-xs sm:text-sm"
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
            )}
          </TabsContent>

          {/* ── ABOUT TAB ── */}
          <TabsContent value="about">
            <Card className="p-5 sm:p-8 border-primary/10">
              <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">
                About {vendor.name}
              </h2>
              {vendor.description && (
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed">
                  {vendor.description}
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Restaurant Info */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">Restaurant Info</h3>
                  <div className="space-y-3">
                    {vendor.address && (
                      <InfoRow icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />} label="Address" value={vendor.address} />
                    )}
                    {vendor.openingHours && (
                      <InfoRow icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />} label="Opening Hours" value={vendor.openingHours} />
                    )}
                    {vendor.phone && (
                      <InfoRow icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />} label="Contact" value={vendor.phone} />
                    )}
                    {vendor.isTopChoice && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-sm font-medium text-amber-400">Top Choice Restaurant</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">Delivery Info</h3>
                  <div className="space-y-3">
                    {vendor.deliveryTime && (
                      <InfoPill label="Delivery Time" value={vendor.deliveryTime} />
                    )}
                    <InfoPill label="Delivery Fee" value={vendor.deliveryFee ? `₹${vendor.deliveryFee}` : "Free"} />
                    {vendor.minOrder && (
                      <InfoPill label="Minimum Order" value={`₹${vendor.minOrder}`} />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* ── REVIEWS TAB ── */}
          <TabsContent value="reviews">
            <Card className="p-5 sm:p-8 border-primary/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-bold">Customer Reviews</h2>
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full sm:w-auto">
                  Write a Review
                </Button>
              </div>

              {/* Rating Summary */}
              <div className="p-4 sm:p-6 bg-muted/30 rounded-xl">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  <div className="text-center shrink-0">
                    <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                      {Number(vendor.rating).toFixed(1)}
                    </div>
                    <div className="flex items-center gap-0.5 mb-1 justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < Math.floor(Number(vendor.rating))
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {vendor.reviews} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 sm:gap-3 mb-1.5">
                        <span className="text-xs sm:text-sm w-10 text-right">{rating} ★</span>
                        <div className="flex-1 h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground w-8">
                          {rating === 5 ? "70%" : rating === 4 ? "20%" : "10%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {vendor.reviews === 0 && (
                <p className="text-center text-muted-foreground text-sm mt-8">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

