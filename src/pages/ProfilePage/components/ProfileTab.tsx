import { Button, Card, motion } from "@/shared";
import { User, Mail, Phone, Clock, Check, X, Pencil, ShoppingBag, Star, CreditCard } from "lucide-react";
import { StatCard, FieldRow } from "./ProfileStatusCard";

interface ProfileForm {
  firstName: string; lastName: string; email: string; phone: string;
}

interface ProfileTabProps {
  form: ProfileForm;
  formDraft: ProfileForm;
  editing: boolean;
  saving: boolean;
  saved: boolean;
  authProvider?: string;
  orderCount: number;
  deliveredCount: number;
  totalSpent: number;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDraftChange: (key: keyof ProfileForm, value: string) => void;
}

export function ProfileTab({
  form, formDraft, editing, saving, saved, authProvider,
  orderCount, deliveredCount, totalSpent,
  onEdit, onCancel, onSave, onDraftChange,
}: ProfileTabProps) {
  return (
    <Card className="p-4 sm:p-6 lg:p-8 border-primary/10">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-6 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Personal Information</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {editing ? "Make your changes below" : "Your saved profile details"}
          </p>
        </div>
        {!editing ? (
          <Button size="sm" variant="outline" onClick={onEdit}
            className="border-primary/30 hover:bg-primary/8 gap-1.5 text-xs shrink-0">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5 text-xs">
              <X className="w-3.5 h-3.5" /> Cancel
            </Button>
            <Button size="sm" onClick={onSave} disabled={saving}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-1.5 text-xs">
              {saving
                ? <Clock className="w-3.5 h-3.5 animate-spin" />
                : <Check className="w-3.5 h-3.5" />}
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        )}
      </div>

      {/* Saved banner */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
        >
          <Check className="w-4 h-4 shrink-0" />
          Profile updated successfully!
        </motion.div>
      )}

      {/* Fields */}
      <div className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-5">
          <FieldRow id="firstName" label="First Name" icon={User}
            value={editing ? formDraft.firstName : form.firstName}
            editing={editing}
            onChange={(v) => onDraftChange("firstName", v)} />
          <FieldRow id="lastName" label="Last Name" icon={User}
            value={editing ? formDraft.lastName : form.lastName}
            editing={editing}
            onChange={(v) => onDraftChange("lastName", v)} />
        </div>
        <FieldRow id="email" label="Email Address" icon={Mail} type="email"
          value={editing ? formDraft.email : form.email}
          editing={editing}
          onChange={(v) => onDraftChange("email", v)} />
        <FieldRow id="phone" label="Phone Number" icon={Phone} type="tel"
          value={editing ? formDraft.phone : form.phone}
          editing={editing}
          onChange={(v) => onDraftChange("phone", v)} />

        {authProvider && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
            <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">
              Signed in via <strong className="text-foreground">{authProvider}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Overview */}
      <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/50">
        <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Account Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <StatCard icon={ShoppingBag} label="Total Orders" value={orderCount} accent />
          <StatCard icon={Star}        label="Delivered"    value={deliveredCount} />
          <StatCard icon={CreditCard}  label="Total Spent"  value={`₹${totalSpent.toFixed(0)}`} accent />
        </div>
      </div>
    </Card>
  );
}