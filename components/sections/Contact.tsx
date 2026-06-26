import Button from "@/components/ui/Button";
import { Body, Display, Eyebrow, Handwriting } from "@/components/ui/Typography";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative -mt-12 bg-blue-night px-6 md:px-12 pt-32 pb-20"
      style={{
        clipPath: "polygon(0 4%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-6">
        <Eyebrow color="sky">Parlons de votre projet</Eyebrow>

        <Display color="white" align="center">
          Votre projet commence
          <br />
          par une <Handwriting color="sky">conversation.</Handwriting>
        </Display>

        <Body color="white/60" align="center" className="max-w-xl">
          Pas de formulaire complexe. Un message WhatsApp suffit — je réponds
          sous 24h.
        </Body>

        <Button
          variant="whatsapp"
          size="lg"
          href="https://wa.me/33786034629"
          target="_blank"
        >
          Envoyer un message WhatsApp
        </Button>

        <a
          href="mailto:hello@medhighali.com"
          className="font-body text-sm text-white/50 transition-colors duration-200 hover:text-white/90"
        >
          hello@medhighali.com
        </a>
      </div>
    </section>
  );
}
