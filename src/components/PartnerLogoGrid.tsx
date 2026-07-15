import { useState } from "react";
import type { Partner } from "@/data/partners";
import { useCanHover } from "@/hooks/use-can-hover";

type PartnerLogoGridProps = {
  partners: readonly Partner[];
};

const LOGO_HOVER_TRANSITION =
  "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease";

function PartnerLogoCard({ partner }: { partner: Partner }) {
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();

  return (
    <li
      className="min-h-28 sm:min-h-32"
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          transform: canHover && hovered ? "scale(1.05)" : "scale(1)",
          transition: LOGO_HOVER_TRANSITION,
        }}
        className="flex h-full items-center justify-center rounded-2xl border border-white/20 bg-white p-4 shadow-sm hover:border-[color:var(--gold)]/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:p-5"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-20 w-full object-contain sm:max-h-24"
          loading="lazy"
        />
      </div>
    </li>
  );
}

export function PartnerLogoGrid({ partners }: PartnerLogoGridProps) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {partners.map((partner) => (
        <PartnerLogoCard key={partner.name} partner={partner} />
      ))}
    </ul>
  );
}
