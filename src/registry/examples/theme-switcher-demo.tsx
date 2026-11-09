import { ThemeSwitcher } from "@/registry/theme-switcher/theme-switcher";

export default function ThemeSwitcherDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Tri-toggle variant (default) */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Tri-toggle (default)
        </span>
        <ThemeSwitcher />
      </div>

      {/* Toggle variant */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Toggle</span>
        <ThemeSwitcher variant="toggle" />
      </div>

      {/* Toggle with sound */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Toggle with sound</span>
        <ThemeSwitcher variant="toggle" sound />
      </div>
    </div>
  );
}
