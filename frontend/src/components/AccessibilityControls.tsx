import { Settings, Type, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAccessibility, TextSize, Theme } from "@/hooks/useAccessibility";
import { Separator } from "@/components/ui/separator";

const AccessibilityControls = () => {
  const { settings, toggleDyslexiaFont, setTextSize, setTheme } = useAccessibility();

  const textSizes: { value: TextSize; label: string }[] = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Accessibility settings">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-card z-50" align="end">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Customize your viewing experience
            </p>
          </div>

          <Separator />

          {/* Dyslexia Font Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dyslexia-font" className="text-sm font-medium">
                Dyslexia-Friendly Font
              </Label>
              <p className="text-xs text-muted-foreground">
                Use easier-to-read font
              </p>
            </div>
            <Switch
              id="dyslexia-font"
              checked={settings.dyslexiaFont}
              onCheckedChange={toggleDyslexiaFont}
            />
          </div>

          <Separator />

          {/* Text Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              Text Size
            </Label>
            <div className="flex gap-2">
              {textSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={settings.textSize === size.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTextSize(size.value)}
                  className="flex-1"
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Theme */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <Button
                    key={theme.value}
                    variant={settings.theme === theme.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(theme.value)}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{theme.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityControls;
