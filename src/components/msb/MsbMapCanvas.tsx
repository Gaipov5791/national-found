import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { MsbDistrict } from "@/data/msbProjects";
import { pickL10n } from "@/data/msbProjects";
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

  return (
    <MapContainer
      center={KG_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      scrollWheelZoom
      className="h-full w-full rounded-2xl [&_.leaflet-interactive]:cursor-pointer"
      style={{ background: "#0a1a2c", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitKyrgyzstan />
      {outline ? <GeoJSON data={outline as never} style={outlineStyle} interactive={false} /> : null}
      {districts.map((district) => {
        const selected = district.id === selectedId;
        return (
          <CircleMarker
            key={district.id}
            center={[district.coordinates[0], district.coordinates[1]]}
            radius={selected ? 14 : 11}
            pathOptions={{
              color: selected ? "#fff" : "#d4af37",
              weight: selected ? 3 : 2,
              fillColor: selected ? "#d4af37" : "#3b82f6",
              fillOpacity: 0.95,
              bubblingMouseEvents: false,
            }}
            eventHandlers={{
              click: (event) => {
                // Prevent the same click from dismissing Radix Dialog as "outside".
                L.DomEvent.stopPropagation(event.originalEvent);
                L.DomEvent.preventDefault(event.originalEvent);
                onSelect(district.id);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
              <span className="font-display text-xs font-semibold tracking-wide">
                {pickL10n(district.name, lang)}
              </span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
