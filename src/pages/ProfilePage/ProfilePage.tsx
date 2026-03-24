import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, Input, Label, Separator, Tabs, TabsContent, TabsList, TabsTrigger, userOrders, motion } from "@/shared";
import { User, Mail, Phone, MapPin, Clock, Package, CreditCard, Settings, LogOut } from "lucide-react";


export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground text-lg">Manage your account and view order history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Card className="p-6 border-primary/10">
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
              <Badge className="mt-3 bg-primary/20 text-primary border-primary">
                Premium Member
              </Badge>
            </div>

            <Separator className="mb-4" />

            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10">
                <Package className="w-4 h-4" />
                Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10">
                <MapPin className="w-4 h-4" />
                Addresses
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10">
                <CreditCard className="w-4 h-4" />
                Payment Methods
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </nav>

            <Separator className="my-4" />

            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="p-8 border-primary/10">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="pl-10 bg-background/50 border-primary/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue="Doe"
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@email.com"
                        className="pl-10 bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="pl-10 bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Save Changes
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="p-8 border-primary/10">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {userOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 border-primary/10 hover:border-primary/20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">{order.id}</h3>
                              <Badge className={order.statusColor}>{order.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{order.restaurant}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{order.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                <span>{order.items} items</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Total</p>
                              <p className="text-2xl font-bold text-primary">${order.total}</p>
                            </div>
                            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card className="p-8 border-primary/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Add New Address
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Home", "Office"].map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 border-primary/10 hover:border-primary/20 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <Badge className="bg-primary/20 text-primary">{type}</Badge>
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium mb-1">123 Main Street</p>
                            <p className="text-sm text-muted-foreground">
                              Apartment 4B, New York, NY 10001
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Phone: +1 (555) 123-4567
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card className="p-8 border-primary/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Payment Methods</h2>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Add New Card
                  </Button>
                </div>
                <div className="space-y-4">
                  {["Visa", "Mastercard"].map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 border-primary/10 hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{type} •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/26</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-accent/20 text-accent">Default</Badge>
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
