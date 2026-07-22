import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      expand
      visibleToasts={3}
      gap={12}
      offset={24}
      toastOptions={{
        duration: 5200,
        classNames: {
          toast:
            "group toast group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:bg-[#0b2138]/95 group-[.toaster]:text-white group-[.toaster]:shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-[.toaster]:backdrop-blur-xl group-[.toaster]:font-display",
          title: "group-[.toast]:font-semibold group-[.toast]:tracking-wide",
          description: "group-[.toast]:text-white/75 group-[.toast]:text-sm",
          success:
            "group-[.toaster]:border-[color:var(--gold)]/45 group-[.toaster]:bg-[linear-gradient(145deg,rgba(11,33,56,0.96),rgba(18,48,78,0.94))]",
          error: "group-[.toaster]:border-red-400/40",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-[#0b2138]",
          cancelButton: "group-[.toast]:bg-white/10 group-[.toast]:text-white/80",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
