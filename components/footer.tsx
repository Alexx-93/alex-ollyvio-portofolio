import { Github, Linkedin, Instagram, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-amber-500/20 dark:border-amber-500/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="animate-slide-in-left">
            <h3 className="text-xl font-bold text-foreground mb-4">Alexander Ollyvio</h3>
            <p className="text-foreground/70 leading-relaxed">
              Computer Science student from Universitas Atma Jaya Yogyakarta passionate about web development and
              cybersecurity. Always learning and building amazing things.
            </p>
          </div>

          <div className="animate-slide-in-left" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <a href="#about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Journey
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-slide-in-left" style={{ animationDelay: "200ms" }}>
            <h3 className="text-xl font-bold text-foreground mb-4">Find Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/alxnder___?igsh=eXU1MnUzM3JwdGY3&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 transition-colors opacity-50 cursor-not-allowed"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:alexollyvio93@gmail.com"
                className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-500/20 dark:border-amber-500/30 pt-8">
          <p className="text-center text-foreground/60">© {currentYear} Alexander Ollyvio Kristo Sentono.</p>
        </div>
      </div>
    </footer>
  )
}
