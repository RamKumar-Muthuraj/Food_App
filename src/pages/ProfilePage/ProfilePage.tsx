import {
  Card,
  CollectionName,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  motion,
} from "@/shared";
import { useEffect, useState } from "react";
import { OrderService } from "@/service/order.service";
import { AddressService } from "@/service/address.service";
import { useCurrentUser } from "@/API/currentUserContext";
import DomoApi from "@/API/domoAPI";

import { OrdersTab, type NormalisedOrder } from "./components/OrderTab";
import { AddressesTab, type NormalisedAddress } from "./components/AddressTab";
import { PaymentTab } from "./components/PaymentTb";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ProfileTab } from "./components/ProfileTab";
import { validateProfile } from "@/utils/validation/Profile.validation";

// ─── Types
interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const safeParseJSON = (val: any): any => {
  if (!val) return null;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { currentUser, logout } = useCurrentUser();
  const [errors, setErrors] = useState<any>({});
  const [dbUser, setDbUser] = useState<any>(null);
  const [userDocId, setUserDocId] = useState("");
  const [orders, setOrders] = useState<NormalisedOrder[]>([]);
  const [addresses, setAddresses] = useState<NormalisedAddress[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [formDraft, setFormDraft] = useState<ProfileForm>({ ...form });

  // ── Fetch user
  useEffect(() => {
    (async () => {
      try {
        const res: any = await DomoApi.ListDocuments(
          CollectionName.FOODAPP_USERS,
        );

        const raw: any[] = Array.isArray(res) ? res : (res?.content ?? []);

        const firebaseUid =
          currentUser?.uid || currentUser?.providerId || currentUser?.userId;

        const matched = raw.find((u: any) => {
          const c = u?.content ?? u;

          return (
            c?.userId === firebaseUid || // ✅ most important
            c?.uid === firebaseUid ||
            c?.providerId === firebaseUid ||
            c?.email === currentUser?.email
          );
        });

        if (matched) {
          const c = matched?.content ?? matched;

          setDbUser(c);
          setUserDocId(matched?.id ?? c?.id ?? "");

          const f: ProfileForm = {
            firstName: c.firstName ?? "",
            lastName: c.lastName ?? "",
            email: c.email ?? "",
            phone: c.phone ?? "",
          };

          setForm(f);
          setFormDraft(f);
        } else {
          console.warn("User not found in DB");
        }
      } catch (e) {
        console.error("User fetch error:", e);

        // fallback
        const fallback: ProfileForm = {
          firstName: currentUser?.displayName?.split(" ")[0] ?? "User",
          lastName: currentUser?.displayName?.split(" ")[1] ?? "",
          email: currentUser?.email ?? "",
          phone: currentUser?.phoneNumber ?? "",
        };

        setForm(fallback);
        setFormDraft(fallback);
      }
    })();
  }, [currentUser]);

  // ── Fetch addresses
  useEffect(() => {
    if (!dbUser && !currentUser) return;
    (async () => {
      setAddressesLoading(true);
      try {
        const res: any = await AddressService.getAll();
        const raw: any[] = Array.isArray(res) ? res : (res?.content ?? []);
        const normalised: NormalisedAddress[] = raw.map((a: any) => {
          const c = a?.content ?? a;
          return {
            docId: a.id ?? c.id,
            street: c.street ?? "",
            city: c.city ?? "",
            state: c.state ?? "",
            zip: c.zip ?? "",
            country: c.country ?? "",
            isDefault: c.isDefault === true || c.isDefault === "true",
            userId: c.userId ?? "",
            id: c.id ?? a.id ?? "",
          };
        });
        const userId = userDocId || dbUser?.id;
        const filtered = userId
          ? normalised.filter((a) => a.userId === userId)
          : normalised;
        filtered.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
        setAddresses(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setAddressesLoading(false);
      }
    })();
  }, [dbUser, userDocId, currentUser]);

  // ── Fetch orders
  useEffect(() => {
    (async () => {
      setOrdersLoading(true);
      try {
        const res: any = await OrderService.getAll();
        const raw: any[] = Array.isArray(res) ? res : (res?.content ?? []);
        const normalised: NormalisedOrder[] = raw.map((o: any) => {
          const c = o?.content ?? o;
          const rawItems = safeParseJSON(c.items) ?? [];
          const parsedItems = Array.isArray(rawItems)
            ? rawItems.map((i: any) => ({
                name: i.name ?? "Item",
                price: parseFloat(i.price) || 0,
                quantity: parseInt(i.quantity) || 1,
                image: i.image ?? "",
              }))
            : [];
          return {
            id: `#${(c.id ?? o.id ?? "").slice(0, 8).toUpperCase()}`,
            docId: o.id ?? c.id,
            restaurant: c.restaurantName ?? c.vendorName ?? "Restaurant",
            items: parsedItems,
            itemCount: parsedItems.length,
            total: c.totalAmount ?? c.total ?? "0",
            status: c.status ?? "pending",
            date: c.createdAt
              ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "—",
            address: safeParseJSON(c.address),
            vendorId: c.vendorId ?? "",
          };
        });
        const userId = userDocId || dbUser?.id;
        const firebaseUid = currentUser?.uid ?? currentUser?.providerId;
        const filtered = userId
          ? normalised.filter((o) => {
              const rawEntry = raw.find(
                (r: any) => (r.id ?? (r.content ?? r).id) === o.docId,
              );
              const oc = rawEntry?.content ?? rawEntry ?? {};
              return (
                oc?.userId === userId ||
                oc?.customerId === userId ||
                oc?.uid === firebaseUid
              );
            })
          : normalised;
        setOrders(filtered.length ? filtered : normalised);
      } catch (e) {
        console.error(e);
      } finally {
        setOrdersLoading(false);
      }
    })();
  }, [dbUser, userDocId, currentUser]);

  // ── Edit handlers
  const handleEdit = () => {
    setFormDraft({ ...form });
    setEditing(true);
    setSaved(false);
  };
  const handleCancel = () => {
    setFormDraft({ ...form });
    setEditing(false);
  };
  const handleSave = async () => {
    const validation = validateProfile(formDraft);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSaving(true);

    try {
      await DomoApi.UpdateDocument(CollectionName.FOODAPP_USERS, userDocId, {
        ...dbUser,
        ...formDraft,
        updatedAt: new Date().toISOString(),
      });

      setForm({ ...formDraft });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const totalSpent = orders.reduce(
    (acc, o) => acc + parseFloat(String(o.total) || "0"),
    0,
  );
  const deliveredCount = orders.filter(
    (o) => o.status?.toLowerCase() === "delivered",
  ).length;

  const fullName = `${form.firstName} ${form.lastName}`.trim() || "User";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
    
  const photoURL = currentUser?.photoURL ?? currentUser?.avatar ?? "";

  return (
    <div className="container mx-auto px-3 py-5 sm:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and view order history
        </p>
      </motion.div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <ProfileSidebar
            fullName={fullName}
            initials={initials}
            photoURL={photoURL}
            email={form.email}
            role={dbUser?.role}
            orderCount={orders.length}
            deliveredCount={deliveredCount}
            logout={logout}
          />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-4 sm:space-y-5">
            <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex h-9 sm:h-10">
              <TabsTrigger value="profile" className="text-xs sm:text-sm">
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs sm:text-sm">
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="text-xs sm:text-sm">
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs sm:text-sm">
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab
                form={form}
                formDraft={formDraft}
                editing={editing}
                saving={saving}
                saved={saved}
                authProvider={dbUser?.authProvider}
                orderCount={orders.length}
                deliveredCount={deliveredCount}
                totalSpent={totalSpent}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
                onDraftChange={(key, value) => {
                  setFormDraft((p) => ({ ...p, [key]: value }));
                  setErrors((e: any) => ({ ...e, [key]: "" }));
                }}
                errors={errors}
              />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab orders={orders} loading={ordersLoading} />
            </TabsContent>

            <TabsContent value="addresses">
              <AddressesTab addresses={addresses} loading={addressesLoading} />
            </TabsContent>

            <TabsContent value="payment">
              <PaymentTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
