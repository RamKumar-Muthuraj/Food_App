import React from 'react'

export function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="font-medium text-sm sm:text-base">{label}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-muted/30 rounded-lg">
      <span className="text-xs sm:text-sm">{label}</span>
      <span className="font-semibold text-xs sm:text-sm">{value}</span>
    </div>
  );
}