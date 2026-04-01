import { Badge, Button, Card, motion } from "@/shared";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export interface NormalisedAddress {
  docId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  isDefault: boolean;
  userId: string;
  id: string;
}

interface AddressesTabProps {
  addresses: NormalisedAddress[];
  loading: boolean;
}

export function AddressesTab({ addresses, loading }: AddressesTabProps) {
  return (
    <Card className="p-4 sm:p-6 lg:p-8 border-primary/10">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
            Delivery Addresses
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your saved delivery locations
          </p>
        </div>
        {/* <Button
          size="sm"
          className="bg-linear-to-r from-primary to-accent hover:opacity-90 gap-1.5 text-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Add New</span>
        </Button> */}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 sm:h-32 rounded-xl bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && addresses.length === 0 && (
        <div className="flex flex-col items-center py-12 sm:py-14 gap-3 text-center">
          <MapPin className="w-9 h-9 sm:w-10 sm:h-10 text-muted-foreground/30" />
          <p className="text-muted-foreground text-sm">
            No saved addresses found.
          </p>
        </div>
      )}

      {!loading && addresses.length > 0 && (
        <div className="min-h-[65vh] overflow-y-auto scroll-smooth .custom-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {addresses.map((addr, index) => (
            <motion.div
              key={addr.docId}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="p-3 sm:p-4 border-primary/10 hover:border-primary/25 transition-all group h-full">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <Badge
                    className={`text-xs border ${
                      addr.isDefault
                        ? "bg-primary/15 text-primary border-primary/20"
                        : "bg-muted/50 text-muted-foreground border-border"
                    }`}
                  >
                    {addr.isDefault ? "🏠 Default" : `Address ${index + 1}`}
                  </Badge>
                  {/* <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 hover:bg-primary/8"
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 hover:bg-destructive/8 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div> */}
                </div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <div className="text-sm leading-relaxed space-y-0.5 min-w-0">
                    <p className="font-medium truncate">{addr.street}</p>
                    <p className="text-muted-foreground text-xs">
                      {[addr.city, addr.state, addr.zip]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {addr.country && (
                      <p className="text-muted-foreground text-xs">
                        {addr.country}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div></div>
      )}
    </Card>
  );
}
