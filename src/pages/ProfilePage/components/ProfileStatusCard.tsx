import { Input, Label } from "@/shared";

// ─── StatCard 
export function StatCard({
  icon: Icon, label, value, accent = false,
}: { icon: any; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 sm:p-4 border flex items-center gap-2.5 sm:gap-3 ${
      accent ? "bg-primary/8 border-primary/20" : "bg-card/60 border-border/50"
    }`}>
      <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
        accent ? "bg-primary/15" : "bg-muted"
      }`}>
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${accent ? "text-primary" : "text-muted-foreground"}`} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}

// ─── FieldRow 
export function FieldRow({
  id, label, icon: Icon, value, editing, onChange, type = "text", error
}: {
  id: string; label: string; icon: any; value: string;
  editing: boolean; onChange: (v: string) => void; type?: string; error?:string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {editing ? (
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id={id} type={type} value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-9 bg-background/50 border-primary/20 focus:border-primary text-sm h-9"
          />
          {error && (
  <p className="text-xs text-red-500 mt-1">
    {error}
  </p>
)}
        </div>
      ) : (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
          <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm truncate">
            {value || <span className="text-muted-foreground italic">Not set</span>}
          </span>
        </div>
      )}
    </div>
  );
}