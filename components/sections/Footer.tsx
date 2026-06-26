function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-6"
      style={{ backgroundColor: "#080D5E" }}
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display italic text-white/60 text-base">
          mehdi
        </span>
        <span className="font-handwriting text-sky-blue text-lg">ghali</span>
        <span className="font-body text-white/30 text-sm"> · MG Digital</span>
      </div>

      <p className="font-body text-xs text-white/30">
        © 2025 · Tous droits réservés
      </p>

      <a
        href="https://linkedin.com/in/medhi-ghali-62a0a2154"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 transition-colors duration-200 hover:text-white"
      >
        <LinkedInIcon />
      </a>
    </footer>
  );
}
