import {
  Braces,
  Briefcase,
  Building2,
  Cloud,
  Code2,
  Compass,
  Factory,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  PenTool,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon registry — keeps tree-shaking effective and guarantees that
 * CMS-provided icon names can never resolve to arbitrary modules.
 */
const registry: Record<string, LucideIcon> = {
  Braces,
  Briefcase,
  Building2,
  Cloud,
  Code2,
  Compass,
  Factory,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  PenTool,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Zap,
};

export function ContentIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = registry[name] ?? Braces;
  return <Component className={className} aria-hidden="true" strokeWidth={1.5} />;
}
