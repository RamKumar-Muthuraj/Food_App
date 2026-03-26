import { Badge, Button, Card, motion } from "@/shared";
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react";

export function PaymentTab() {
  return (
    <Card className="p-4 sm:p-6 lg:p-8 border-primary/10">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Payment Methods</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your saved cards</p>
        </div>
        <Button size="sm"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-1.5 text-xs shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Add Card</span>
        </Button>
      </div>

      <div className="space-y-3">
        {(["Visa", "Mastercard"] as const).map((type, index) => (
          <motion.div key={type}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}>
            <Card className="p-3 sm:p-4 lg:p-5 border-primary/10 hover:border-primary/25 transition-all group">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center border border-primary/15 shrink-0">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{type} •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {index === 0 && (
                    <Badge className="bg-accent/15 text-accent border border-accent/20 text-xs hidden xs:flex">
                      Default
                    </Badge>
                  )}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-primary/8">
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon"
                      className="w-7 h-7 hover:bg-destructive/8 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}