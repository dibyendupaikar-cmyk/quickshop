import { cn } from "@/lib/utils";
import type { Category } from "@/types/index";
import { Cpu, LayoutGrid, Shirt, UtensilsCrossed } from "lucide-react";

interface CategoryOption {
  value: Category;
  label: string;
  icon: React.ElementType;
}

const categories: CategoryOption[] = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "clothing", label: "Clothing", icon: Shirt },
  { value: "electronics", label: "Electronics", icon: Cpu },
  { value: "food", label: "Food", icon: UtensilsCrossed },
];

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
  className?: string;
}

export function CategoryFilter({
  selected,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Filter by category"
    >
      {categories.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          data-ocid={`category-filter-${value}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-smooth",
            "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected === value
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5",
          )}
          aria-pressed={selected === value}
        >
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
