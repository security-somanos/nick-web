"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee";

const partners = [
  {
    name: "Apple TV",
    logo: "/images/partners/apple-tv-logo.svg"
  },
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
    name: "NETFLIX",
    logo: "/images/partners/netflix-logo.svg"
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
  return (
    <section className="w-full pb-12 mb-20">
      <div className="mx-auto md:max-w-[96vw] marquee-container">
        {/*<h2 className="text-4xl md:text-3xl font-bold mb-6 text-white font-title ps-12">MEDIA PARTNERS</h2>*/}
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={false}
          autoFill={true}
        >
          {partners.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center partner-card mr-[20px]"
              style={{ width: '240px', height: '180px' }}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={180}
                height={0}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-[150px] object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
