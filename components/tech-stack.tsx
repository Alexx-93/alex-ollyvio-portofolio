"use client"

export default function TechStack() {
  const techs = [
    { name: "React JS", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node/Express", icon: "🟢" },
    { name: "SQL", icon: "🗄️" },
    { name: "HTML", icon: "🔤" },
    { name: "CSS", icon: "🎨" },
    { name: "Figma", icon: "✏️" },
    { name: "Linux", icon: "🐧" },
    { name: "VSCode", icon: "💻" },
    { name: "GitHub", icon: "🐙" },
    { name: "Postman", icon: "📮" },
  ]

  return (
    <section
      id="tech-stack"
      className="py-20 px-4 bg-background/50 relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center animate-slide-up animate-text-glow">
          Tech <span className="text-amber-600 dark:text-amber-400 animate-neon-flicker">Stack</span>
        </h2>
        <p
          className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          Tools and technologies I work with
        </p>

        <div className="flex justify-center">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 w-fit place-items-center">
            {techs.map((tech, index) => (
              <div
                key={index}
                className="bg-card border-2 border-amber-500/20 dark:border-amber-500/30 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group cursor-pointer animate-scale-in relative overflow-hidden hover:-translate-y-2 w-full"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100"></div>

                <div className="text-4xl transition-all duration-300 relative z-10">{tech.icon}</div>
                <p className="text-sm font-semibold text-foreground/70 text-center group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors relative z-10 group-hover:animate-text-glow animate-slide-up">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
