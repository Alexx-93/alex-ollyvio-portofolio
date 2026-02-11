"use client"

import { useState } from "react"
import Image from "next/image"
import { Award, X, ZoomIn } from "lucide-react"

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const certificates = [
    {
      title: "Treasurer 1",
      event: "Revival Praise and Worship (KKR) Yogyakarta 2024",
      date: "September 27, 2024",
      image: "/images/image.png",
    },
    {
      title: "Member - Pubdokmed Division",
      event: "PMK Melisia Christi Management",
      date: "Jan - Dec 2023",
      image: "/images/alexander-20ollyvio-20kristo-20sentono-20-28pengurus-29.jpg",
    },
    {
      title: "Coordinator - Pubdok",
      event: "Christmas Social Service PMK Melisia Christi",
      date: "December 9, 2023",
      image: "/images/alexander-20ollyvio-20kristo-20sentono-page-0001.jpg",
    },
    {
      title: "Participant",
      event: "Design Thinking and Creativity Informatics Exhibition",
      date: "2022 / 2023",
      image: "/images/alexander-20ollyvio.png",
    },
    {
      title: "Participant",
      event: "Information Literacy Training - UAJY Library",
      date: "November 8, 2022",
      image: "/images/alexander-20ollyvio-20kristo-20sentono-sertifikat-20pelatihan-20literasi-20informasi.jpg",
    },
    {
      title: "Participant",
      event: "Social Service PMK Melisia Christi",
      date: "October 22, 2022",
      image: "/images/alexander-20ollyvio-20kristo-20sentonopmk.jpg",
    },
    {
      title: "Participant",
      event: "National Webinar: THE REPUTE - Future Public Relations",
      date: "September 17, 2022",
      image: "/images/alexander-20ollyvio-20kristo-20sentono-1.jpg",
    },
  ]

  return (
    <section id="certificates" className="py-20 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center animate-slide-up">
          Certificates & <span className="text-amber-600 dark:text-amber-400 animate-text-glow">Achievements</span>
        </h2>
        <p className="text-center text-sm md:text-base text-foreground/60 mb-12 max-w-2xl mx-auto animate-slide-up">
          A collection of my professional and organizational certifications
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group bg-card border-4 border-amber-500/30 dark:border-amber-500/40 rounded-xl overflow-hidden hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[1.414/1] overflow-hidden">
                <Image
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.event}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-amber-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={() => setSelectedImage(cert.image)}
                    className="p-3 bg-amber-500 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <ZoomIn size={24} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                  <Award size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">{cert.title}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {cert.event}
                </h3>
                <p className="text-sm text-foreground/60">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-5xl aspect-[1.414/1] animate-in zoom-in duration-300">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Certificate Full View"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}
