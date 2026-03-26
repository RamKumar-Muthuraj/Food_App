import { Badge, Button, Card, motion } from "@/shared";
import { Clock, Package, MapPin, ChefHat } from "lucide-react";

interface ParsedItem  { name: string; price: number; quantity: number; image?: string }
interface ParsedAddress { street: string; city: string; state: string; zip: string; country?: string }

export interface NormalisedOrder {
  id: string; docId: string; restaurant: string;
  items: ParsedItem[]; itemCount: number;
  total: string | number; status: string; date: string;
  address?: ParsedAddress | null; vendorId?: string;
}

const statusStyle: Record<string, string> = {
  delivered:  "bg-green-500/15 text-green-400 border-green-500/20",
  pending:    "bg-amber-500/15  text-amber-400  border-amber-500/20",
  cancelled:  "bg-red-500/15    text-red-400    border-red-500/20",
  placed:     "bg-blue-500/15   text-blue-400   border-blue-500/20",
  processing: "bg-purple-500/15 text-purple-400 border-purple-500/20",
};
const getStatusStyle = (s: string) =>
  statusStyle[s?.toLowerCase()] ?? "bg-muted text-muted-foreground";

const formatAddress = (addr: ParsedAddress | null | undefined) => {
  if (!addr) return "";
  return [addr.street, addr.city, addr.state, addr.zip, addr.country].filter(Boolean).join(", ");
};

interface OrdersTabProps { orders: NormalisedOrder[]; loading: boolean }

export function OrdersTab({ orders, loading }: OrdersTabProps) {
  return (
    <Card className="p-4 sm:p-6 lg:p-8 border-primary/10">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Order History</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {orders.length} order{orders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 sm:h-24 rounded-xl bg-muted/30 animate-pulse" />)}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3 text-center">
          <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/30" />
          <p className="text-muted-foreground text-sm">No orders yet. Start exploring!</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order, index) => (
            <motion.div key={order.docId}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}>
              <Card className="p-3 sm:p-4 lg:p-5 border-primary/10 hover:border-primary/25 transition-all">
                <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-bold text-sm sm:text-base">{order.id}</span>
                      <Badge className={`text-xs border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {order.items.map((item, i) => (
                        <span key={i}
                          className="text-xs bg-muted/40 px-2 py-0.5 rounded-full text-foreground/80">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{order.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
                      </span>
                      {order.address && (
                        <span className="flex items-center gap-1 truncate max-w-[180px] sm:max-w-[220px]">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {formatAddress(order.address)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Right */}
                  <div className="flex xs:flex-col items-center xs:items-end gap-3 xs:gap-2 shrink-0">
                    <div className="xs:text-right">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-xl font-bold text-primary">₹{order.total}</p>
                    </div>
                    <Button variant="outline" size="sm"
                      className="border-primary/25 hover:bg-primary/8 text-xs whitespace-nowrap">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}