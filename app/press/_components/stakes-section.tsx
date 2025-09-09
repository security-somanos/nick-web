import { Newspaper } from "lucide-react"
import { FiArrowUpRight } from "react-icons/fi"
import Link from "next/link"

export function StakesSection() {
  const newsItems = [
    {
      outlet: "FORBES",
      description: "BITCOIN BREAKS THROUGH $60,000, BUILDING MOMENTUM TO REACH FRESH HIGHS",
      link: "https://www.forbes.com/sites/cbovaird/2021/10/15/bitcoin-breaks-through-60000-building-momentum-to-reach-fresh-highs/"
    },
    {
      outlet: "THE VERGE",
      description: "At the Libertarian Convention, where blockchain evangelists dream of a perfect election",
      link: "https://www.theverge.com/2016/5/5/11592806/libertarian-bitcoin-blockchain-voting-john-mcafee/"
    },
    {
      outlet: "COINDESK",
      description: "Bitcoin Center NYC Brings Bitcoin Startup Incubator to Wall Street",
      link: "https://www.coindesk.com/markets/2014/08/22/bitcoin-center-nyc-brings-bitcoin-startup-incubator-to-wall-street"
    },
    {
      outlet: "COINDESK",
      description: "Bitcoin Miner Profitability Could Double After Record Drop in Network Difficulty",
      link: "https://www.coindesk.com/markets/2021/07/06/bitcoin-miner-profitability-could-double-after-record-drop-in-network-difficulty"
    },
    {
      outlet: "COINDESK",
      description: "Inside New York's Bitcoin Centre",
      link: "https://www.coindesk.com/markets/2014/03/22/inside-new-yorks-bitcoin-centre"
    },
    {
      outlet: "BITCOINIS",
      description: "BITCOIN CENTER NYC LAUNCHES A STARTUP INCUBATOR",
      link: "https://bitcoinist.com/bitcoin-center-nyc-launches-startup-incubator/"
    },
    {
      outlet: "COINTELEGRAPH",
      description: "CHINA PROVES BITCOIN IS AN UNSTOPPABLE MACHINE: BITCOIN CENTER FOUNDER",
      link: "https://cointelegraph.com/news/china-proves-bitcoin-is-an-unstoppable-machine-bitcoin-center-founder"
    },
    {
      outlet: "BITWALA",
      description: "BITCOIN VISIONARY NICK SPANOS ADVOCATES 'END THE FED' MOVEMENT",
      link: "https://bitwala.com/blog/bitcoin-visionary-nick-spanos-advocates-end-the-fed-movement"
    },
    {
      outlet: "COINTELEGRAPH",
      description: "HYBRID SMART CONTRACTS WILL REPLACE THE LEGAL SYSTEM",
      link: "https://cointelegraph.com/news/hybrid-smart-contracts-will-replace-the-legal-system"
    },
    {
      outlet: "POLITICO MAGAZINE",
      description: "RON PAUL'S REVENGE",
      link: "https://www.politico.com/news/magazine/2022/04/05/ron-paul-crypto-00022354"
    }
  ]

  return (
    <section id="stakes" className="space-y-8">
      <div className="flex items-center gap-3">
        <Newspaper className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Media partners</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-4 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <h3 className="font-semibold text-white text-sm">{item.outlet}</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 overflow-hidden">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


