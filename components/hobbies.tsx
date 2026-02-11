"use client"

import Image from "next/image"
import { useEffect } from "react"

const hobbies = [
  {
    title: "Mountain Climbing",
    description: "Finding perspective at 3,000+ meters.",
    images: [
      { src: "/images/img-7023.jpeg", alt: "Mt. Lawu Summit", type: "portrait", featured: true },
      { src: "/images/img-20190617.jpeg", alt: "Mt. Prau Peak", type: "landscape" },
      { src: "/images/img-4742.jpeg", alt: "Mt. Merbabu Summit", type: "portrait" },
      { src: "/images/img-4638.jpeg", alt: "Merbabu, View of Merapi", type: "portrait" },
      { src: "/images/img-6371.jpeg", alt: "Mt. Andong", type: "portrait" },
      { src: "/images/img-6346.jpeg", alt: "Mt. Andong, Mountain Path", type: "landscape" },
      { src: "/images/img-7057.jpeg", alt: "Hiking Gear", type: "portrait" },
    ],
  },
]

export default function Hobbies() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hobbies" className="py-24 px-6 bg-card/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 scroll-reveal animate-reveal-text">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase">THE JOURNEY</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A collection of moments from the peaks. Full-size images showing the raw beauty of the mountains without
            cropping.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {hobbies[0].images.map((img, i) => (
            <div
              key={i}
              className="relative break-inside-avoid overflow-hidden rounded-2xl group transition-all duration-500 hover:shadow-2xl scroll-reveal animate-reveal-text"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                width={800}
                height={1200}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-medium text-sm tracking-widest uppercase">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
