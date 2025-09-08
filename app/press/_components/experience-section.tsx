import { User, Star, Award, Mic } from "lucide-react"

export function ExperienceSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <User className="w-6 h-6" />
        <h2 className="text-2xl font-bold">About / Bio</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-6">
          <p className="text-gray-400 leading-relaxed mb-3">
            Nick Spanos is a blockchain innovator, best known for founding the world's first physical cryptocurrency exchange, Bitcoin Center NYC, located directly across from the NYSE in 2013. He also founded Blockchain Technologies Corp. (creator of the VoteWatcher blockchain voting platform), and co-founded Zap.org, enabling real-world data to trigger smart contract events.
          </p>
          <p className="text-gray-400 leading-relaxed">
            From building his first computer in 1978 to leading roles in politics, technology, and crypto, Spanos blends tech savvy with civic activism. He served as Director of Voter Contact for Ron Paul's 2008 campaign and has since become a globally recognized speaker and thought leader in blockchain and Bitcoin. Featured in the Netflix documentary Banking on Bitcoin, he champions decentralization and monetary sovereignty.
          </p>
        </div>
      </div>

      {/* Key Highlights & Stats */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6" />
          <h3 className="text-xl font-bold">Key Highlights & Stats</h3>
        </div>
        <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-6">
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Founded the world's first live Bitcoin exchange in 2013—Bitcoin Center NYC.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>CEO of Blockchain Technologies Corp., patented blockchain voting tool VoteWatcher.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Co-founder of Zap.org, bridging real-world data and blockchain smart contracts.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Political strategist and Director of Voter Contact for Ron Paul's 2008 campaign.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Media & Recognition */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6" />
          <h3 className="text-xl font-bold">Media & Recognition</h3>
        </div>
        <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-6">
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Featured in Netflix's "Banking on Bitcoin".</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white mt-1">•</span>
              <span>Quoted in major media outlets: Forbes, The Verge, CoinDesk, Cointelegraph, and Politico, among others.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Speaking Engagements */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Mic className="w-6 h-6" />
          <h3 className="text-xl font-bold">Speaking Engagements</h3>
        </div>
        <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-6">
          <p className="text-gray-400 leading-relaxed">
            Regular speaker at global blockchain and crypto conferences, including Consensus, Bitcoin 2024/25, and World Blockchain Forum.
          </p>
        </div>
      </div>
    </section>
  )
}


