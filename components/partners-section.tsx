"use client"

import Image from "next/image"

const partners = [
  {
    name: "Bitcoinist",
    logo: "/images/partners/bitcoinist-net-seek-logo.svg"
  },
  {
    name: "Bitcoin Magazine",
    logo: "/images/partners/bitcoin-magazine-logo.svg"
  },
  {
    name: "CoinDesk",
    logo: "/images/partners/coindesk-logo.svg"
  },
  {
    name: "Cointelegraph",
    logo: "/images/partners/cointelegraph-logo.svg"
  },
  {
    name: "Forbes",
    logo: "/images/partners/forbes-logo.svg"
  },
  {
    name: "The Block",
    logo: "/images/partners/the-block-logo.svg"
  },
  {
    name: "Bitwala",
    logo: "/images/partners/bitwala-logo.svg"
  },
  {
    name: "Infowars",
    logo: "/images/partners/infowars-logo.svg"
  }
]

export default function PartnersSection() {
  const extendedPartners = [...partners, ...partners];

  return (
    <section className="w-full bg-black py-12 mb-20">
      
      <div className="mx-auto max-w-[1480px] marquee-mask">
      <h2 className="text-4xl md:text-3xl font-bold mb-6 text-white font-title ps-12">MEDIA PARTNERS</h2>
        <div className="flex animate-marquee whitespace-nowrap gap-[20px]">
          {extendedPartners.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center partner-card"
              style={{ width: '240px', height: '180px' }}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={120}
                height={0}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
