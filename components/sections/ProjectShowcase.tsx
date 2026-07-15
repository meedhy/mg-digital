"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { createPortal } from "react-dom";

type ProjectImage = {
  src: string;
  alt: string;
  title: string;
  previewPosition?: string;
  scrollPreview?: {
    width: number;
    height: number;
  };
};

type Project = {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  context: string;
  tags: string[];
  accent: string;
  images: ProjectImage[];
};

const projects: Project[] = [
  {
    number: "01",
    name: "Cdiscount",
    subtitle: "Parcours & interfaces e-commerce",
    description: "Refonte de parcours et d’interfaces e-commerce sur desktop et mobile.",
    context: "Projet réalisé dans le cadre de mon expérience professionnelle chez Cdiscount.",
    tags: ["Rebranding", "UX/UI", "Design system", "Web & mobile"],
    accent: "#5f54d8",
    images: [
      {
        src: "/projects/cdiscount/home-page.jpeg",
        alt: "Proposition de refonte de la page d’accueil Cdiscount sur desktop",
        title: "Refonte de la page d’accueil",
      },
      {
        src: "/projects/cdiscount/home-mobile.jpeg",
        alt: "Déclinaison mobile de la nouvelle expérience Cdiscount",
        title: "Déclinaison mobile de la home",
      },
      {
        src: "/projects/cdiscount/pages-vitrines.jpeg",
        alt: "Exemples de pages vitrines et de parcours e-commerce Cdiscount",
        title: "Parcours et pages vitrines",
      },
      {
        src: "/projects/cdiscount/design-system-foundations.jpeg",
        alt: "Fondations typographiques, couleurs et espacements du design system Cdiscount",
        title: "Fondations du design system",
      },
      {
        src: "/projects/cdiscount/design-system-components.jpeg",
        alt: "Bibliothèque de composants du design system Cdiscount",
        title: "Bibliothèque de composants",
      },
    ],
  },
  {
    number: "02",
    name: "Persil & Romarin",
    subtitle: "Identité & site de marque",
    description: "Conception d’une identité et d’un site pensés pour présenter la marque et ses opportunités.",
    context: "Un univers de marque chaleureux conçu pour valoriser les chefs, les repas et le savoir-faire culinaire.",
    tags: ["Identité visuelle", "Charte graphique", "UX/UI", "Responsive"],
    accent: "#00be88",
    images: [
      {
        src: "/projects/persil-romarin/site-desktop.png",
        alt: "Page Nous rejoindre du site Persil et Romarin sur desktop",
        title: "Expérience web desktop",
        previewPosition: "top",
        scrollPreview: { width: 1280, height: 3401 },
      },
      {
        src: "/projects/persil-romarin/site-mobile.png",
        alt: "Page Nous rejoindre du site Persil et Romarin sur mobile",
        title: "Expérience web mobile",
        previewPosition: "top",
        scrollPreview: { width: 375, height: 4290 },
      },
      {
        src: "/projects/persil-romarin/identite.png",
        alt: "Présentation de l’identité Persil et Romarin",
        title: "Identité de marque",
      },
      {
        src: "/projects/persil-romarin/charte-graphique.png",
        alt: "Couverture de la charte graphique Persil et Romarin",
        title: "Charte graphique",
      },
      {
        src: "/projects/persil-romarin/construction-logo.png",
        alt: "Construction du logo Persil et Romarin",
        title: "Construction du logo",
      },
      {
        src: "/projects/persil-romarin/zone-protection.png",
        alt: "Zone de protection du logo Persil et Romarin",
        title: "Zone de protection",
      },
      {
        src: "/projects/persil-romarin/usages-interdits.png",
        alt: "Règles d’utilisation du logo Persil et Romarin",
        title: "Usages du logo",
      },
      {
        src: "/projects/persil-romarin/logo-monochrome.png",
        alt: "Déclinaisons monochromes du logo Persil et Romarin",
        title: "Logo monochrome",
      },
      {
        src: "/projects/persil-romarin/logo-couleurs.png",
        alt: "Déclinaisons colorées du logo Persil et Romarin",
        title: "Logo en couleurs",
      },
      {
        src: "/projects/persil-romarin/declinaisons-logo.png",
        alt: "Déclinaisons du logo Persil et Romarin",
        title: "Déclinaisons du logo",
      },
      {
        src: "/projects/persil-romarin/couleurs.png",
        alt: "Palette de couleurs de l’identité Persil et Romarin",
        title: "Palette de couleurs",
      },
      {
        src: "/projects/persil-romarin/typographies.png",
        alt: "Système typographique de l’identité Persil et Romarin",
        title: "Système typographique",
      },
      {
        src: "/projects/persil-romarin/iconographie.png",
        alt: "Iconographie de l’identité Persil et Romarin",
        title: "Iconographie",
      },
    ],
  },
  {
    number: "03",
    name: "Le Monde",
    subtitle: "Expérience mobile à forte audience",
    description: "Conception d’expériences mobiles utilisées chaque jour par une large audience.",
    context:
      "Une évolution menée à l’échelle d’une application d’actualité majeure, distinguée par l’App Store pour son nouveau design.",
    tags: ["Product design", "Liquid Glass", "iOS 26", "iPhone & iPad"],
    accent: "#d5212b",
    images: [
      {
        src: "/projects/le-monde/slide-01.jpg",
        alt: "Présentation de la refonte iOS 26 et Liquid Glass de l’application Le Monde",
        title: "Showcase iOS 26 & Liquid Glass",
      },
      {
        src: "/projects/le-monde/slide-02.jpg",
        alt: "Présentation de l’audience des applications Le Monde",
        title: "Une expérience à grande échelle",
      },
      {
        src: "/projects/le-monde/slide-03.jpg",
        alt: "Nouvelle tab bar Liquid Glass de l’application Le Monde",
        title: "Liquid Glass Tab Bar",
      },
      {
        src: "/projects/le-monde/slide-04.jpg",
        alt: "Anatomie et états de la tab bar Liquid Glass Le Monde",
        title: "Anatomie de la navigation",
      },
      {
        src: "/projects/le-monde/slide-05.jpg",
        alt: "Nouvelle toolbar Liquid Glass dans un article Le Monde",
        title: "Liquid Glass Toolbar",
      },
      {
        src: "/projects/le-monde/slide-06.jpg",
        alt: "Actions principales et nouveaux composants de lecture Le Monde",
        title: "Actions et composants natifs",
      },
      {
        src: "/projects/le-monde/slide-07.jpg",
        alt: "Navigation principale de l’application Le Monde sous iOS 26",
        title: "Navigation Bars",
      },
      {
        src: "/projects/le-monde/slide-08.jpg",
        alt: "Comparaison des headers Le Monde sous iOS 18 et iOS 26 en modes clair et sombre",
        title: "Header translucide · Light & Dark",
      },
      {
        src: "/projects/le-monde/slide-09.jpg",
        alt: "Comparaison de la page Vos lectures entre iOS 18 et iOS 26",
        title: "Vos lectures · Avant / Après",
      },
      {
        src: "/projects/le-monde/slide-10.jpg",
        alt: "Mise en avant de l’application Le Monde dans l’App Store",
        title: "Mise en avant par l’App Store",
      },
      {
        src: "/projects/le-monde/slide-11.jpg",
        alt: "Classement de l’application Le Monde parmi les meilleures applications",
        title: "Classée parmi les meilleures apps",
      },
      {
        src: "/projects/le-monde/slide-12.jpg",
        alt: "Application Le Monde sélectionnée comme App du jour",
        title: "L’App du jour",
      },
      {
        src: "/projects/le-monde/slide-13.jpg",
        alt: "Sélection d’écrans éditoriaux de l’application Le Monde sur iPhone",
        title: "Parcours éditoriaux sur iPhone",
      },
      {
        src: "/projects/le-monde/slide-14.jpg",
        alt: "Vue d’ensemble du système Liquid Glass conçu pour Le Monde sur iPhone et iPad",
        title: "Le système iOS 26 complet",
      },
    ],
  },
];

function getPreviewSrc(src: string) {
  return src
    .replace(/^\/projects\//, "/projects/previews/")
    .replace(/\.(?:png|jpe?g)$/i, ".jpg");
}

const showcaseTiles = [
  { projectIndex: 0, imageIndex: 0, className: "col-span-2 row-span-2 md:col-span-7 md:row-span-2" },
  { projectIndex: 1, imageIndex: 0, className: "col-span-1 row-span-1 md:col-span-5" },
  { projectIndex: 2, imageIndex: 0, className: "col-span-1 row-span-1 md:col-span-5" },
  { projectIndex: 2, imageIndex: 2, className: "col-span-2 row-span-1 md:col-span-4" },
  { projectIndex: 0, imageIndex: 1, className: "col-span-1 row-span-1 md:col-span-3" },
  { projectIndex: 1, imageIndex: 2, className: "col-span-1 row-span-1 md:col-span-5" },
  { projectIndex: 0, imageIndex: 4, className: "col-span-1 row-span-1 md:col-span-4" },
  { projectIndex: 1, imageIndex: 1, className: "col-span-1 row-span-1 md:col-span-3" },
  { projectIndex: 2, imageIndex: 13, className: "col-span-2 row-span-1 md:col-span-5" },
];

function ProjectWall({
  buttonRefs,
  onOpen,
  selectedProject,
}: {
  buttonRefs: MutableRefObject<Array<HTMLButtonElement | null>>;
  onOpen: (projectIndex: number, imageIndex: number) => void;
  selectedProject: number | null;
}) {
  const assignedProjectRefs = new Set<number>();
  const visibleTiles = selectedProject === null
    ? showcaseTiles
    : projects[selectedProject].images.map((_, imageIndex) => ({
        projectIndex: selectedProject,
        imageIndex,
        className: "",
      }));

  return (
    <div
      key={selectedProject ?? "all"}
      className={`panel-in grid auto-rows-[150px] grid-cols-2 gap-1.5 overflow-hidden rounded-md md:auto-rows-[210px] md:grid-cols-12 md:gap-2 lg:auto-rows-[250px] ${
        selectedProject === null ? "" : "md:auto-rows-[250px]"
      }`}
    >
      {visibleTiles.map(({ projectIndex, imageIndex, className }, tileIndex) => {
        const project = projects[projectIndex];
        const projectImage = project.images[imageIndex];
        const isFirstProjectTile = !assignedProjectRefs.has(projectIndex);
        assignedProjectRefs.add(projectIndex);
        const filteredClassName = selectedProject === null
          ? className
          : tileIndex === 0
            ? "col-span-2 row-span-2 md:col-span-7 md:row-span-2"
            : tileIndex === 1 || tileIndex === 2
              ? "col-span-1 md:col-span-5"
              : tileIndex % 3 === 0
                ? "col-span-2 md:col-span-5"
                : "col-span-1 md:col-span-3";

        return (
          <button
            key={`${project.name}-${projectImage.src}`}
            ref={
              isFirstProjectTile
                ? (element) => {
                    buttonRefs.current[projectIndex] = element;
                  }
                : undefined
            }
            type="button"
            onClick={() => onOpen(projectIndex, imageIndex)}
            aria-haspopup="dialog"
            aria-label={`Découvrir ${project.name} : ${projectImage.title}`}
            className={`group relative min-h-0 overflow-hidden bg-[#17171c] text-left ${filteredClassName}`}
          >
            <Image
              src={getPreviewSrc(projectImage.src)}
              alt={projectImage.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
              style={{ objectPosition: projectImage.previewPosition ?? "center" }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-white md:p-5">
              <span>
                <span className="block text-sm font-semibold leading-tight md:text-lg">{project.name}</span>
                <span className="mt-1 hidden text-[10px] text-white/68 sm:block md:text-xs">{projectImage.title}</span>
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black md:size-10">
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];
  const activeImage = activeProject?.images[activeImageIndex];

  const showPrevious = useCallback(() => {
    if (activeProjectIndex === null) return;
    const imageCount = projects[activeProjectIndex].images.length;
    setActiveImageIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [activeProjectIndex]);

  const showNext = useCallback(() => {
    if (activeProjectIndex === null) return;
    const imageCount = projects[activeProjectIndex].images.length;
    setActiveImageIndex((current) => (current + 1) % imageCount);
  }, [activeProjectIndex]);

  const closeGallery = useCallback(() => {
    const trigger = activeProjectIndex === null ? null : cardRefs.current[activeProjectIndex];
    setActiveProjectIndex(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }, [activeProjectIndex]);

  function openGallery(projectIndex: number, imageIndex = 0) {
    setActiveImageIndex(imageIndex);
    setActiveProjectIndex(projectIndex);
  }

  useEffect(() => {
    if (activeProjectIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectIndex, closeGallery, showNext, showPrevious]);

  useEffect(() => {
    if (activeProjectIndex === null) return;
    thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeImageIndex, activeProjectIndex]);

  const galleryModal =
    activeProject && activeImage && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            className="fixed inset-0 z-[100] flex flex-col bg-[#07070a]/96 px-4 py-4 text-white backdrop-blur-md md:px-8 md:py-6"
          >
            <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 border-b border-white/12 pb-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-white/42">Projet {activeProject.number}</p>
                <h2 id="project-gallery-title" className="mt-1 truncate text-base font-semibold text-white/92">
                  {activeProject.name}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs tabular-nums text-white/48">
                  {String(activeImageIndex + 1).padStart(2, "0")} / {String(activeProject.images.length).padStart(2, "0")}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeGallery}
                  aria-label="Fermer la galerie"
                  title="Fermer"
                  className="grid size-11 place-items-center rounded-full border border-white/16 bg-white/6 text-white transition hover:bg-white/12"
                >
                  <X aria-hidden="true" size={20} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div className="mx-auto grid min-h-0 w-full max-w-[1480px] flex-1 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="hidden border-r border-white/12 py-6 pr-7 lg:flex lg:flex-col">
                <p className="text-xs font-semibold text-white/72">{activeProject.subtitle}</p>
                <p className="mt-5 text-sm leading-7 text-white/48">{activeProject.description}</p>
                <p className="mt-5 border-l-2 pl-4 text-xs leading-6 text-white/34" style={{ borderColor: activeProject.accent }}>
                  {activeProject.context}
                </p>
                <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 border-t border-white/10 pt-5">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-semibold text-white/38">
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col lg:pl-7">
                <div className="relative flex min-h-0 flex-1 items-center justify-center py-4 md:px-16">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Image précédente"
                    title="Image précédente"
                    className="absolute bottom-5 left-1 z-10 grid size-11 place-items-center rounded-full border border-white/16 bg-black/55 text-white backdrop-blur transition hover:bg-white/12 md:bottom-auto md:left-0"
                  >
                    <ChevronLeft aria-hidden="true" size={22} strokeWidth={1.8} />
                  </button>

                  <div
                    className={`relative h-full min-h-[300px] w-full ${
                      activeImage.scrollPreview ? "overflow-y-auto rounded-lg bg-white/4" : ""
                    }`}
                  >
                    {activeImage.scrollPreview ? (
                      <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={activeImage.alt}
                        width={activeImage.scrollPreview.width}
                        height={activeImage.scrollPreview.height}
                        sizes="(min-width: 1024px) calc(100vw - 410px), 100vw"
                        className="project-preview-in mx-auto h-auto w-full max-w-[1040px]"
                      />
                    ) : (
                      <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={activeImage.alt}
                        fill
                        sizes="(min-width: 1024px) calc(100vw - 410px), 100vw"
                        className="project-preview-in object-contain"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Image suivante"
                    title="Image suivante"
                    className="absolute bottom-5 right-1 z-10 grid size-11 place-items-center rounded-full border border-white/16 bg-black/55 text-white backdrop-blur transition hover:bg-white/12 md:bottom-auto md:right-0"
                  >
                    <ChevronRight aria-hidden="true" size={22} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="border-t border-white/12 pt-3">
                  <p className="mb-3 truncate text-xs font-semibold text-white/62">{activeImage.title}</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {activeProject.images.map((image, index) => (
                      <button
                        key={image.src}
                        ref={(element) => {
                          thumbnailRefs.current[index] = element;
                        }}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Afficher : ${image.title}`}
                        aria-current={index === activeImageIndex ? "true" : undefined}
                        className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-md border transition md:w-24 ${
                          index === activeImageIndex ? "border-white opacity-100" : "border-white/12 opacity-45 hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={getPreviewSrc(image.src)}
                          alt=""
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="mt-6 md:mt-10">
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-black/10 pb-3 [scrollbar-width:none] md:mb-6 md:justify-end [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filtrer les réalisations">
        {[
          { label: "Tout", value: null },
          { label: "Persil & Romarin", value: 1 },
          { label: "Cdiscount", value: 0 },
          { label: "Le Monde", value: 2 },
        ].map((filter) => {
          const isActive = selectedProject === filter.value;
          return (
            <button
              key={filter.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedProject(filter.value)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-[13px] font-semibold transition-colors md:px-5 md:text-sm ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/12 bg-transparent text-black/48 hover:border-black/30 hover:text-black"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <ProjectWall buttonRefs={cardRefs} onOpen={openGallery} selectedProject={selectedProject} />

      {galleryModal}
    </div>
  );
}
