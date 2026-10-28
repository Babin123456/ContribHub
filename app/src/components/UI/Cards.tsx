import React, { forwardRef } from "react";

// --- Card Container ---
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverable = true, bordered = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex flex-col rounded-3xl bg-white p-6
          ${bordered ? "border-2 border-black" : "border border-zinc-200"}
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          ${
            hoverable
              ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
              : ""
          }
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

// --- Card Header ---
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-1.5 pb-4 ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

// --- Card Title ---
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = "h3", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`text-xl font-bold tracking-tight text-zinc-900 ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = "CardTitle";

// --- Card Description ---
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className = "", children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-zinc-600 leading-relaxed ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = "CardDescription";

// --- Card Content ---
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex-1 ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

// --- Card Footer ---
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-center pt-4
          ${bordered ? "mt-4 border-t border-zinc-100" : ""}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";

// --- Badge Component ---
export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "info"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-black text-white border-black",
  success: "bg-emerald-100 text-emerald-800 border-emerald-300",
  warning: "bg-amber-100 text-amber-800 border-amber-300",
  info: "bg-sky-100 text-sky-800 border-sky-300",
  outline: "bg-transparent text-zinc-800 border-zinc-300",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
          transition-colors
          ${badgeVariants[variant]}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

// --- Stat Card Component ---
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      description,
      icon,
      trend,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={`relative overflow-hidden ${className}`.trim()}
        {...props}
      >
        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {title}
          </span>
          {icon && (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-zinc-100 text-zinc-900"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>

        <div className="mt-2 text-3xl font-black tracking-tight text-zinc-900 md:text-4xl">
          {value}
        </div>

        {(description || trend) && (
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
            {trend && (
              <span
                className={`font-semibold ${
                  trend.isPositive ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {trend.value}
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

