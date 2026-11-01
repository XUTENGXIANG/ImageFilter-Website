import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import p1 from "../assets/photos/photo-01.jpg";
import p2 from "../assets/photos/photo-02.jpg";
import pf from "../assets/photos/photo-03.jpg";
import p3 from "../assets/photos/photo-04.jpg";
import p7 from "../assets/photos/photo-05.jpg";
import p9 from "../assets/photos/photo-06.jpg";
import appGrid from "../assets/app-grid.jpg";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { cn } from "./lib/cn";

type PhotoMeta = {
  rating?: number;
  status?: "archived" | "blur" | "overexposed" | "duplicate";
  date?: string;
};

type Photo = {
  id: string;
  src: string;
  cls: string;
  aspect: string;
  name: string;
  meta: PhotoMeta;
  eager?: boolean;
  mobileHidden?: boolean;
  mobileCls?: string;
};

const PHOTOS: Photo[] = [
  {
    id: "p1",
    src: p1,
    cls: "left-[3.5%] top-[-1%] w-[15.4%] max-w-[235px]",
    mobileCls: "max-hero:left-[2%] max-hero:top-[3%] max-hero:w-[40%] max-hero:max-w-none",
    aspect: "aspect-[3/4]",
    name: "DSC_0142.ARW",
    meta: { rating: 5, status: "archived" },
    eager: true,
  },
  {
    id: "p2",
    src: p2,
    cls: "left-[22%] top-[16%] w-[12%] max-w-[185px]",
    mobileHidden: true,
    aspect: "aspect-[3/4]",
    name: "DSC_0157.ARW",
    meta: { status: "blur" },
  },
  {
    id: "pf",
    src: pf,
    cls: "left-[38.3%] top-[10%] w-[12%] max-w-[185px]",
    mobileCls: "max-hero:left-[55%] max-hero:top-[12%] max-hero:w-[38%] max-hero:max-w-none",
    aspect: "aspect-[3/4]",
    name: "IMG_9017.JPG",
    meta: { status: "overexposed" },
    eager: true,
  },
  {
    id: "p3",
    src: p3,
    cls: "left-[52%] top-[1%] w-[16.7%] max-w-[250px]",
    mobileCls: "max-hero:left-[10%] max-hero:top-[40%] max-hero:w-[50%] max-hero:max-w-none",
    aspect: "aspect-[3/2]",
    name: "IMG_8821.JPG",
    meta: { rating: 4, date: "2026-10" },
    eager: true,
  },
  {
    id: "p7",
    src: p7,
    cls: "left-[31%] top-[43.5%] w-[11.5%] max-w-[170px]",
    mobileHidden: true,
    aspect: "aspect-[3/4]",
    name: "DSC_0288.ARW",
    meta: { rating: 4, status: "archived" },
  },
  {
    id: "p9",
    src: p9,
    cls: "left-[12.5%] top-[47%] w-[14%] max-w-[210px]",
    mobileHidden: true,
    aspect: "aspect-[3/2]",
    name: "IMG_8770.JPG",
    meta: { status: "duplicate" },
  },
];

interface HeroCollageProps {
  lang: Lang;
  onFirstDrag: () => void;
}

export default function HeroCollage({ lang, onFirstDrag }: HeroCollageProps) {
  const t = translations[lang];
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [canDrag, setCanDrag] = useState(false);
  const start = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanDrag(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canDrag) return;
    setDragging(true);
    if (!usedHint) {
      setUsedHint(true);
      onFirstDrag();
    }
    start.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const x = Math.max(-150, Math.min(150, start.current.ox + e.clientX - start.current.x));
    const y = Math.max(-150, Math.min(150, start.current.oy + e.clientY - start.current.y));
    setPos({ x, y });
  };

  const endDrag = () => setDragging(false);

  return (
    <div
      className={cn(
        "hero-board absolute -inset-x-[2%] -inset-y-[4%] select-none max-hero:inset-0",
        canDrag && (dragging ? "cursor-grabbing" : "cursor-grab"),
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, willChange: "transform" }}
    >
      {PHOTOS.map((photo) => (
        <figure
          key={photo.id}
          className={cn(
            "absolute m-0",
            photo.cls,
            photo.mobileCls,
            photo.mobileHidden && "max-hero:hidden",
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-card bg-surface shadow-[0_18px_50px_rgba(0,0,0,.55)] ring-1 ring-inset ring-white/[0.08]",
              photo.aspect,
            )}
          >
            <img
              src={photo.src}
              alt=""
              draggable={false}
              loading={photo.eager ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="mt-2.5">
            <b className="block font-landing text-[11.5px] font-medium leading-[1.4] text-white/90">
              {photo.name}
            </b>
            <i className="block font-landing-mono text-[10.5px] not-italic leading-[1.5] tracking-[0.02em] text-ink-faint">
              <span className="tracking-[0.06em] text-data">
                {"★".repeat(photo.meta.rating ?? 0)}
              </span>
              {photo.meta.rating ? " · " : ""}
              {photo.meta.status === "archived" && (
                <span className="text-data">{t.collage.archived}</span>
              )}
              {photo.meta.status === "blur" && t.collage.blur}
              {photo.meta.status === "overexposed" && t.collage.overexposed}
              {photo.meta.status === "duplicate" && t.collage.duplicate}
              {photo.meta.date}
            </i>
          </figcaption>
        </figure>
      ))}

      <figure className="absolute right-[4.2%] top-[13.5%] m-0 w-[34%] max-w-[530px] max-hero:hidden">
        <div className="relative aspect-[1262/838] overflow-hidden rounded-window bg-surface shadow-[0_40px_100px_rgba(0,0,0,.75)] ring-1 ring-white/10">
          <img
            src={appGrid}
            alt={t.hero.windowAlt}
            loading="eager"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
        <figcaption className="mt-2.5 flex justify-between gap-3 font-landing-mono text-[10.5px] text-ink-faint">
          <span>ImageFilter</span>
          <span>{t.collage.windowMeta}</span>
        </figcaption>
      </figure>
    </div>
  );
}
