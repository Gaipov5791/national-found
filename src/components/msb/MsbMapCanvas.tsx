import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { GeoJSON, MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { MsbDistrict } from "@/data/msbProjects";
import { pickL10n } from "@/lib/l10n";
import { useLang } from "@/lib/lang";
import "leaflet/dist/leaflet.css";

const KG_CENTER: [number, number] = [41.2, 74.6];
const KG_BOUNDS: [[number, number], [number, number]] = [
  [39.1, 69.2],
  [43.4, 80.4],
];

type MsbMapCanvasProps = {
  districts: readonly MsbDistrict[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function FitKyrgyzstan() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(KG_BOUNDS, { padding: [28, 28], maxZoom: 7 });
  }, [map]);

  return null;
}

function createDistrictIcon(projectCount: number, selected: boolean): L.DivIcon {
  const size = selected ? 36 : 30;
  const showCount = projectCount > 1;
  const fill = selected ? "#d4af37" : "#3b82f6";
  const ring = selected ? "#ffffff" : "#d4af37";
  const ringWidth = selected ? 3 : 2;

  const countBadge = showCount
    ? `<span style="
          position:absolute;
          top:-6px;
          right:-6px;
          min-width:18px;
          height:18px;
          padding:0 4px;
          border-radius:999px;
          background:#ef4444;
          color:#fff;
          font:700 11px/18px system-ui,sans-serif;
          text-align:center;
          box-shadow:0 1px 4px rgba(0,0,0,.45);
          pointer-events:none;
        ">${projectCount}</span>`
    : "";

  return L.divIcon({
    className: "msb-district-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<div style="
      position:relative;
      width:${size}px;
      height:${size}px;
      border-radius:999px;
      background:${fill};
      border:${ringWidth}px solid ${ring};
      box-shadow:0 2px 10px rgba(0,0,0,.35);
      cursor:pointer;
    ">${countBadge}</div>`,
  });
}

export function MsbMapCanvas({ districts, selectedId, onSelect }: MsbMapCanvasProps) {
  const { lang } = useLang();
  const [outline, setOutline] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/geo/kyrgyzstan.geo.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Kyrgyzstan outline");
        return res.json();
      })
      .then((data: unknown) => {
        if (!cancelled) setOutline(data);
      })
      .catch(() => {
        if (!cancelled) setOutline(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const outlineStyle = useMemo(
    () => ({
      color: "#d4af37",
      weight: 2.5,
      opacity: 0.95,
      fillColor: "#1a4a7a",
      fillOpacity: 0.35,
      // Outline is decorative — don't steal clicks from district markers.
      interactive: false,
    }),
    []
  );

  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const district of districts) {
      map.set(
        district.id,
        createDistrictIcon(district.projects.length, district.id === selectedId)
      );
    }
    return map;
  }, [districts, selectedId]);

  return (
    <MapContainer
      center={KG_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      scrollWheelZoom
      className="h-full w-full rounded-2xl [&_.leaflet-interactive]:cursor-pointer [&_.msb-district-marker]:border-0 [&_.msb-district-marker]:bg-transparent"
      style={{ background: "#0a1a2c", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitKyrgyzstan />
      {outline ? <GeoJSON data={outline as never} style={outlineStyle} interactive={false} /> : null}
      {districts.map((district) => {
        const icon = icons.get(district.id);
        if (!icon) return null;
        return (
          <Marker
            key={district.id}
            position={[district.coordinates[0], district.coordinates[1]]}
            icon={icon}
            eventHandlers={{
              click: (event) => {
                // Prevent the same click from dismissing Radix Dialog as "outside".
                L.DomEvent.stopPropagation(event.originalEvent);
                L.DomEvent.preventDefault(event.originalEvent);
                onSelect(district.id);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
              <span className="font-display text-xs font-semibold tracking-wide">
                {pickL10n(district.name, lang)}
                {district.projects.length > 1 ? ` · ${district.projects.length}` : ""}
              </span>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
