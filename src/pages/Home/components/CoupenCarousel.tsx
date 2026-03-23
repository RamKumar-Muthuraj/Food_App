import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { coupons } from "@/data/mockData";
import { motion } from "framer-motion";

export default function CoupenCarousel() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Exclusive Offers</h2>
        <p className="text-muted-foreground text-lg">
          Limited time deals just for you
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((coupon, index) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-accent/20 rounded-full -mr-16 -mt-16"></div>
              <div className="p-6">
                <Badge className="mb-3 bg-linear-to-r from-primary to-accent">
                  {coupon.discount}
                </Badge>
                <h3 className="text-2xl font-bold mb-2">{coupon.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {coupon.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Min order: ${coupon.minOrder}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Expires: {coupon.expiry}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-primary/20">
                  <code className="text-primary font-bold text-lg">
                    {coupon.code}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-primary/10"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
