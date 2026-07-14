"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
    subtitle: "Rebranding & expérience e-commerce",
    description:
      "Participation au rebranding de Cdiscount, à la refonte de la home page et des pages vitrines, ainsi qu’à la structuration d’un design system partagé pour les parcours desktop et mobile.",
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
    subtitle: "Identité de marque & expérience web",
    description:
      "Conception d’une identité visuelle complète et de sa déclinaison digitale, du logo et de la charte graphique jusqu’aux interfaces responsive du site Persil & Romarin.",
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
    subtitle: "Refonte Liquid Glass · iOS 26",
    description:
      "Refonte de l’expérience iPhone et iPad de l’application Le Monde pour iOS 26 : navigation, tab bar, toolbar, headers translucides et composants natifs pensés dans le langage Liquid Glass.",
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

function ProjectCard({
  project,
  featured = false,
  buttonRef,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  buttonRef: (element: HTMLButtonElement | null) => void;
  onOpen: () => void;
}) {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    if (!isPreviewing) return;

    const interval = window.setInterval(() => {
      setPreviewIndex((current) => (current + 1) % project.images.length);
    }, 1050);

    return () => window.clearInterval(interval);
  }, [isPreviewing, project.images.length]);

  const preview = project.images[previewIndex];
  const previewSrc = getPreviewSrc(preview.src);

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-black/10 bg-white/36 transition duration-300 hover:-translate-y-1 hover:border-black/22 hover:shadow-[0_24px_70px_rgba(20,20,24,0.12)] ${
        featured ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_0.85fr] lg:col-span-1 lg:block" : ""
      }`}
      onMouseEnter={() => {
        if (
          window.innerWidth < 768 ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          return;
        }
        setPreviewIndex((current) => (current + 1) % project.images.length);
        setIsPreviewing(true);
      }}
      onMouseLeave={() => {
        setIsPreviewing(false);
        setPreviewIndex(0);
      }}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b border-black/8 bg-[#e7e6e2] ${
          featured
            ? "md:aspect-auto md:min-h-[270px] md:border-b-0 md:border-r lg:aspect-[16/10] lg:min-h-0 lg:border-b lg:border-r-0"
            : ""
        }`}
      >
        <Image
          key={previewSrc}
          src={previewSrc}
          alt={preview.alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 570px, (min-width: 768px) 48vw, calc(100vw - 40px)"
          className="project-preview-in object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          style={{ objectPosition: preview.previewPosition ?? "center" }}
        />

        <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-4 text-[10px] font-bold uppercase">
          <span className="rounded-full border border-black/8 bg-white/92 px-2.5 py-1.5 text-black/56 shadow-sm">
            Projet {project.number}
          </span>
          <span className="rounded-full border border-black/8 bg-white/92 px-2.5 py-1.5 tabular-nums text-black/56 shadow-sm">
            {String(previewIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-1" aria-hidden="true">
          {project.images.map((image, index) => (
            <span
              key={image.src}
              className={`h-0.5 min-w-0 flex-1 rounded-full transition-colors ${
                index === previewIndex ? "bg-white" : "bg-black/22"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className={`flex min-h-36 items-start justify-between gap-6 p-5 md:p-6 ${
          featured ? "md:self-center lg:self-auto" : ""
        }`}
      >
        <div className="min-w-0">
          <h3 className="font-editorial text-3xl leading-none text-[#101014] md:text-4xl">{project.name}</h3>
          <p className="mt-3 text-sm font-semibold leading-6 text-black/62">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] font-semibold text-black/38">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-black/54 transition duration-300 group-hover:border-black/22 group-hover:text-black"
        >
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </span>
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Découvrir le projet ${project.name}, ${project.images.length} images`}
        className="absolute inset-0 z-20 rounded-lg"
      />
    </article>
  );
}

export default function ProjectShowcase() {
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

  function openGallery(projectIndex: number) {
    setActiveImageIndex(0);
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
    <div className="mt-14 border-t border-black/14 pt-8 md:mt-16 md:pt-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase text-black/38">Projets sélectionnés</p>
          <p className="mt-2 text-sm text-black/44">Trois univers, du produit éditorial à l’identité de marque.</p>
        </div>
        <span className="font-editorial text-2xl italic text-[#5f54d8]">01—03</span>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            featured={index === projects.length - 1}
            buttonRef={(element) => {
              cardRefs.current[index] = element;
            }}
            onOpen={() => openGallery(index)}
          />
        ))}
      </div>

      {galleryModal}
    </div>
  );
}
