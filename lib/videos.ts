export interface VideoBox {
  id: number
  title: string,
  realTitle?: string,
  subtitle: string
  videoSrc: string
  blobUrl?: string
  streamUrl?: string
  link: string
  subtleText: string
  year: number
  country: string
  subtitles?: SubtitleTrack[]
  author: string
  previewUrl?: string
  publishedAt?: string
  description?: string
  location?: string
}

export interface SubtitleTrack {
  lang: string // BCP-47 language code, e.g. 'en', 'es'
  label: string // Human readable, e.g. 'English', 'Español'
  src: string // Public URL to .vtt file
  default?: boolean
}

function deriveAuthorFromBlobPath(path?: string): string {
  if (!path) return ""
  // Normalize starting slashes and split first segment
  const trimmed = path.replace(/^\/+/, "")
  const firstSegment = trimmed.split("/")[0] || ""
  try {
    return decodeURIComponent(firstSegment)
  } catch {
    return firstSegment
  }
}

// Edit this list to manage the videos shown across the site
const rawVideos = [
  { 
    id: 1, 
    title: "LONDON, UK", 
    subtitle: "CryptoCurrency Convention", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/london.mp4",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/dadd9f57-f2ad-4524-a941-a333f1e92ed8/playlist.m3u8",
    author: "CryptoCurrency Convention",
    link: "https://www.youtube.com/watch?v=189Q0LJOxHA",
    subtleText: "Face Fears! Learn to Ride Life's Bicycle: Eyes on the Prize!",
    year: 2016,
    country: "United Kingdom",
    location: "London, United Kingdom",
    subtitles: [
      { lang: "en", label: "English", src: "/videos/subtitles/london.en.vtt", default: true },
      { lang: "es", label: "Español", src: "/videos/subtitles/london.es.vtt" }
    ]
  },
  { 
    id: 39, 
    title: "LONDON, UK", 
    realTitle: "Blockchain Creator Tells All – Fame, Fortune & Politics with Nick Spano",
    subtitle: "American Journal", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/Blockchain%20Creator%20preview.mp4",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/b5793c49-b465-4a30-bd82-cf6b4ffaf419/thumbnail.jpg",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/b5793c49-b465-4a30-bd82-cf6b4ffaf419/playlist.m3u8",
    author: "Amercian Journal",
    link: "https://banned.video/watch?id=6887cd20fbec835b8f6e3e4a",
    subtleText: "Blockchain Creator Tells All on Fame, Fortune, and Politics",
    year: 2025,
    country: "United States",
    subtitles: [],
    publishedAt: "2025-07-29",
    location: "Austin, United States",
    description: `From the heart of Wall Street to the frontlines of the crypto revolution, Nick Spanos has seen it all. As the inventor of the multibranch blockchain and founder of the first live cryptocurrency exchange—opened in 2013 just 100 feet from the New York Stock Exchange—Spanos has been a driving force in bringing Bitcoin and blockchain technology into the global spotlight.

But his story doesn’t stop at technology. A committed Libertarian and political strategist, Spanos served as Senior Advisor to Ron Paul during the 2008 and 2012 U.S. Presidential campaigns, championing freedom, decentralization, and financial sovereignty.

In this exclusive conversation, Spanos opens up about:
* The creation of multibranch blockchain technology
* Building the first physical crypto exchange near Wall Street
* His role in shaping political campaigns for liberty and decentralization
* The future of blockchain, Bitcoin, and global finance

#Nick Spanos, #blockchain, #Bitcoin, #multibranch blockchain, crypto exchange, first crypto exchange, Bitcoin Center NYC, Wall Street Bitcoin, Ron Paul, Libertarian, cryptocurrency history, Bitcoin history, blockchain technology, crypto pioneer, Bitcoin adoption, decentralization, crypto politics, blockchain innovation, Bitcoin NYC, political freedom, financial sovereignty, crypto revolution, Bitcoin speech, Bitcoin interview`
  },
  { 
    id: 2, 
    title: "MIAMI, US", 
    realTitle: "Bitcoin’s Rise: Breaking Free & Building a Crypto Exchange – Nick Spanos in Miami, 2022",
    subtitle: "The revolution has started", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/miami.mp4",
    //blobUrl: "//MyTransmedia/20220215%20-%20Nick%20Spanos%20in%20Miami.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/836903ad-17be-4f4d-98bf-d20376b04282/playlist.m3u8",
    author: "MyTransmedia",
    link: "https://www.youtube.com/watch?v=Ut-mWQOMKZU",
    subtleText: "Bitcoin's Rise: Breaking Free and Building a Crypto Exchange!",
    year: 2022,
    country: "United States",
    subtitles: [
      { lang: "en", label: "English", src: "/videos/subtitles/miami.en.vtt", default: true }
    ],
    location: "Miami, United States",
    description: `Journey back to the heart of Miami in 2022, where pioneering founder Nick Spanos unpacks the revolution that is Bitcoin. As the inventor of the multibranch blockchain and creator of the very first live cryptocurrency exchange—launched in 2013 just 100 feet from the New York Stock Exchange—Spanos brings us into the epicenter of crypto innovation at the Blockchain Center Miami.
In this powerful session, Nick reveals:
* The birth of a vision: How multibranch blockchain technology emerged to empower decentralization.
* From the ground up: The audacious story of launching a live crypto exchange next to Wall Street—and what that meant for mainstream adoption.
* Miami’s rising role: How the city became a new frontier for crypto growth and innovation.
* Bitcoin’s bigger picture: How breaking free from traditional financial constraints reshaped the global narrative.
If you’re fascinated by crypto’s evolution—or want to better understand the forces shaping the future of money—this video is your front-row seat to a pivotal chapter in financial history.

#Bitcoin #NickSpanos #BitcoinCenterNYC #CryptoHistory #Blockchain #WallStreet #CryptoConvention`
  },
  { 
    id: 3, 
    title: "MALTA, EU", 
    realTitle: "The State Of Crypto with Nick Spanos, Founder at Bitcoin Center NYC | Europe 2022",
    subtitle: "The State Of Crypto", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/malta.mp4",
    //blobUrl: "//AIBC%20World/20221128%20-%20The%20State%20Of%20Crypto%20with%20Nick%20Spanos%2C%20Founder%20at%20Bitcoin%20Center%20NYC%20%EF%BD%9C%20Europe%202022.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/6827b8ff-3bc0-4242-b8b7-c23ac9dd322d/playlist.m3u8",
    author: "AIBC World",
    link: "https://www.youtube.com/watch?v=Ft1LUJJyUOM",
    subtleText: "Blockchain vs. Beasts: Take Control of Your Future!",
    year: 2022,
    location: "Malta, Europe",
    country: "Malta",
    description: `Nick Spanos, the visionary founder behind the Bitcoin Center NYC and pioneer of the first live cryptocurrency exchange near Wall Street, spoke at Malta Week 2022.
In this talk, Nick shares his unique perspective on the evolving world of crypto, reflecting on his journey and the role innovation plays in shaping the future. Known for blending technology with a libertarian spirit, Nick’s insights offer a thoughtful look at the crypto space from one of its earliest advocates.
This video is perfect for anyone interested in the story behind the scenes and the people driving the crypto movement forward.
Follow Nick’s journey and ideas here!
#NickSpanos #BitcoinCenterNYC #MaltaWeek #CryptoPioneer #BlockchainInnovation`
  },
  { 
    id: 4, 
    title: "NEW YORK, US", 
    realTitle: "Wall Street's Cryptocurrency Headquarters: Inside Bitcoin Center NYC",
    subtitle: "Wall Street's Cryptocurrency HQ", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/new-york.mp4",
    //blobUrl: "//ReasonTV/20140128%20-%20Wall%20Street%27s%20Cryptocurrency%20Headquarters%EF%BC%9A%20Inside%20Bitcoin%20Center%20NYC.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/3c1fa6a9-b08f-4890-be70-f8f4cf4527b2/playlist.m3u8",
    author: "ReasonTV",
    link: "https://www.youtube.com/watch?v=DS29SnLaKJs",
    subtleText: "Bitcoin vs Inflation: The Educational Power That Changes Everything!",
    year: 2014,
    location: "New York, United States",
    country: "United States",
    description: `"I was in college, and now instead of going to college I'm doing Bitcoin," says Louis Parker, an entrepreneur who has set up shop at the Bitcoin Center NYC, a cavernous storefront in lower Manhattan's financial district that's become a central gathering spot for New York City's cryptocurrency traders, programmers, and enthusiasts. "There's no college class on Bitcoin, except in Cyprus, and I wasn't ready to move there," he says.

Every Monday night, the Bitcoin community holds a meet up called Satoshi Square, named in honor of Satoshi Nakamoto, the mysterious creator of Bitcoin, in which traders exchange virtual currencies for U.S. dollars. Before Satoshi Square relocated to the Bitcoin Center NYC a couple weeks ago, it was held in the shopping aisles of a Whole Foods grocery store on the Lower East Side.

Why convert Bitcoins to dollars in person when it's simple to do so on the web? For one thing, online trades require a bank account, which some Bitcoin users lack. Trading in person also reduces transaction fees and enables haggling. "There's a lot of benefits to coming together on an exchange," says Scott Tuddenham, who helps manage the order book during Satoshi Square. "Commerce has been conducted in city centers since the beginning of time," he says.

The cofounder of the Bitcoin Center NYC is Nick Spanos, a tech entrepreneur and the owner of the New York City real estate brokerage firm Bapple. He says his interest in Bitcoin and other virtual currencies is partly driven by concern that over printing of money by the U.S. government could lead to runaway inflation.

"Maybe people just by learning about Bitcoin will slowdown the dollars being printed as an educational function of its existence," says Spanos.`
  },
  { 
    id: 5, 
    title: "BALZAN, MALTA",
    realTitle: "The State Of Crypto with Nick Spanos, Founder at Bitcoin Center NYC | Europe 2022",
    subtitle: "AIBC Eurasia Conference 2024",
    videoSrc: "https://nick-spanos-pull.b-cdn.net/balzan.mp4",
    //blobUrl: "/AIBC%20World/20240419%20-%20The%20State%20of%20Crypto%EF%BC%9A%20Insights%20from%20Nick%20Spanos%20%EF%BD%9C%20AIBC%20Eurasia%20Conference%202024.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/775a299d-07be-4028-83f3-84f3f7088caa/playlist.m3u8",
    author: "AIBC World",
    link: "https://www.youtube.com/watch?v=YTLN4AoXfkE",
    subtleText: "Never Lose Your Power! Don't let anyone take your tharos.",
    year: 2024,
    location: "Balzan, Malta",
    country: "Malta",
    description: `
    Nick Spanos, the visionary founder behind the Bitcoin Center NYC and pioneer of the first live cryptocurrency exchange near Wall Street, spoke at Malta Week 2022.
In this talk, Nick shares his unique perspective on the evolving world of crypto, reflecting on his journey and the role innovation plays in shaping the future. Known for blending technology with a libertarian spirit, Nick’s insights offer a thoughtful look at the crypto space from one of its earliest advocates.
This video is perfect for anyone interested in the story behind the scenes and the people driving the crypto movement forward.
Follow Nick’s journey and ideas here!
#NickSpanos #BitcoinCenterNYC #MaltaWeek #CryptoPioneer #BlockchainInnovation
    `
  },
  { 
    id: 6, 
    title: "DUBAI, UAE",
    realTitle: "",
    subtitle: "World Blockchain Forum Dubai",
    videoSrc: "https://nick-spanos-pull.b-cdn.net/dubai.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/b96e9b45-df7f-4126-9bae-6400c32044fe/playlist.m3u8",
    //blobUrl: "/WAGMI%20Events/20180503%20-%20NICK%20SPANOS%20-%20World%20Blockchain%20Forum%20Dubai.mkv",
    author: "WAGMI Events",
    link: "https://www.youtube.com/watch?v=Jc2LxHfbiLA",
    subtleText: "Bought 12,000 Domains in the 90s? My Family's Reaction!",
    year: 2018,
    country: "United Arab Emirates",
    location: "Dubai, United Arab Emirates",
    description: `Nick Spanos at World Blockchain Forum Dubai | Visionary Insights on the Future of Crypto
Join crypto pioneer Nick Spanos, founder of the iconic Bitcoin Center NYC, as he takes the stage at the World Blockchain Forum Dubai to share his bold vision for blockchain’s transformative power.

In this keynote, Nick dives into:
    * How blockchain is reshaping industries through transparency and decentralization
    * The critical role of clear regulation in fueling innovation
    * His passionate commitment to advancing a decentralized future

Whether you’re a crypto enthusiast or just curious about where blockchain technology is headed, Nick’s insights offer a front-row seat to the future of finance.

Watch now and get inspired by one of crypto’s earliest innovators!
#NickSpanos #Blockchain #CryptoFuture #WorldBlockchainForum #BitcoinCenterNYC #Decentralization #CryptoInnovation`
  },
  { 
    id: 7, 
    title: "MIAMI, US",
    realTitle: "The Hidden Danger of Central Bank Digital Currencies (CBDCs) | Protect Your Financial Freedom",
    subtitle: "CBDC's vs Bitcoin",
    videoSrc: "https://nick-spanos-pull.b-cdn.net/quantum.mp4",
    //blobUrl: "/Nick%20Spanos/20230220%20-%20CBDC%27s%20vs%20Bitcoin%20with%20Nick%20Spanos%20%20Quantum%20Miami%202023.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/69a897eb-20f4-401e-ae9c-c10dec1afaad/playlist.m3u8",
    author: "Nick Spanos",
    link: "https://www.youtube.com/watch?v=VnHPcCXTbh8",
    subtleText: "CBDC Apocalypse: How AI Controls Your Money & Your Spending!",
    year: 2023,
    country: "United States",
    location: "Miami, United States",
    description: `    * Central Bank Digital Currencies (CBDCs) might sound like a step toward financial inclusion and transparency — but beneath the surface lies a massive threat to your privacy and freedom.
    * CBDCs give governments unprecedented power to track and control every transaction, opening the door to invasive surveillance and potential abuse. This isn’t just about money; it’s about your personal freedom at risk.

    * At Bitcoin Center, we stand firmly for financial sovereignty. We believe in decentralized, censorship-resistant cryptocurrencies like Bitcoin that protect your privacy and empower individuals — not governments.
    * Stay informed. Stay vigilant. Join the movement to defend your financial rights.

#CBDC #FinancialFreedom #Bitcoin #PrivacyMatters #Decentralization #BitcoinCenter #CryptoRights`
  },
  { 
    id: 8, 
    title: "MIAMI, US", 
    realTitle: "🔥 Nick Spanos Launches Miami Bitcoin Center | Miami Blockchain Week 2023",
    subtitle: "Nick Spanos launches Miami Bitcoin", 
    videoSrc: "https://nick-spanos-pull.b-cdn.net/miami-center.mp4", 
    //blobUrl: "/Nick%20Spanos/20190123%20-%20Nick%20Spanos%20launches%20Miami%20Bitcoin%20Center%20during%20miami%20blockchain%20week.mkv",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/160ce42d-bb0b-4052-89d5-83d9c32f71bc/playlist.m3u8",
    author: "Nick Spanos",
    link: "https://www.youtube.com/watch?v=bQhOD0Qa6No",
    subtleText: "Nick Spanos launches Miami Bitcoin",
    year: 2023,
    location: "Miami, United States",
    country: "United States",
    description: `    * Crypto pioneer Nick Spanos, founder of the groundbreaking Bitcoin Center NYC, brings his visionary spirit to Miami with the launch of the Miami Bitcoin Center during Miami Blockchain Week!

    * This exciting new hub aims to be a beacon for Bitcoin education, adoption, and community in one of the world’s fastest-growing crypto cities. Watch as Nick shares his passion for empowering individuals through decentralized finance and takes the next big step in the global Bitcoin movement.

    * Discover how the Miami Bitcoin Center plans to inspire innovation, foster collaboration, and build a stronger crypto ecosystem in the heart of Miami’s vibrant blockchain scene.

    * Whether you’re a Bitcoin veteran or just curious about the crypto revolution, this launch marks a thrilling moment you won’t want to miss!


    * #NickSpanos #MiamiBitcoinCenter #MiamiBlockchainWeek #Bitcoin #Crypto #Blockchain #CryptoCommunity`,
  },
  
  // ==== New entries appended ====
  {
    id: 9,
    title: "Polycon 2018 Talk",
    subtitle: "Conference Highlight",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/37a2fa13-521c-4704-a173-c5a25e187d1f/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=7CyecPgw3xk",
    subtleText: "Nick Spanos on Zap and the State of the Crypto at Polycon 2018",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/37a2fa13-521c-4704-a173-c5a25e187d1f/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 10,
    title: "Crypto Whales",
    subtitle: "Shark Tank for Crypto",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/dbdf7d4a-f52a-4695-aa93-b97c3c4a0827/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=8LCeKkTI058",
    subtleText: "Crypto Whales, first shark tank for crypto",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/dbdf7d4a-f52a-4695-aa93-b97c3c4a0827/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 11,
    title: "CNBC Arabia Interview",
    subtitle: "Zap Protocol",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/a3dab2d3-8d03-4af4-8cf0-1f1d92f98119/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=a9tdEEhQ0cw",
    subtleText: "CNBC Arabia $zap interview Nick Spanos",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/a3dab2d3-8d03-4af4-8cf0-1f1d92f98119/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 12,
    title: "Launching Dogecoin",
    subtitle: "Bitcoin Center 2013",
    videoSrc: "",
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=BEtISynPwxc",
    subtleText: "Nick Spanos launching DogeCoin at the Bitcoin Center 2013 on Wall Street",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/030b6c84-1526-4601-86df-db9bbcbe8225/thumbnail.jpg",
    year: 2013,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 13,
    title: "Zap Coders in Action",
    subtitle: "Dev Session",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/db28a468-1aa9-442c-8016-b020722d3bd2/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=BWbnjITWg78",
    subtleText: "6/22/18  4_12 pm Zap Protocol coders in action",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/db28a468-1aa9-442c-8016-b020722d3bd2/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 14,
    title: "Smart Contracts",
    subtitle: "Real World Data",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/a2da9fae-240a-49f0-9484-61eec2cb8ac6/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=By0MHhdWiNk",
    subtleText: "Bringing Real World Data to Smart Contracts  Nick Spanos",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/a2da9fae-240a-49f0-9484-61eec2cb8ac6/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 15,
    title: "Archive Clip",
    subtitle: "From the archive",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/2ee73c44-c686-4e93-a62f-d750822c0b65/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=dAr2W7TNVeQ",
    subtleText: "IMG 1198",
    previewUrl: "https://vz-960ce3f8-aff.b-cdn.net/2ee73c44-c686-4e93-a62f-d750822c0b65/thumbnail.jpg",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  /*{
    id: 16,
    title: "TNABC Talk",
    subtitle: "Revolution Won't Be Centralized",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/d73427dd-37d8-4599-871b-8e3ee3755940/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=DD9v7jaSCJU",
    subtleText: '"the revolution will not be centralized"  - Nick Spanos at The North American Bitcoin Conference',
    previewUrl: "/images/previews/the revolution will not be centralized  - Nick Spanos at The North American Bitcoin Conference.webp",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 17,
    title: "Zap to Google",
    subtitle: "7-year-old Dev Explains DeFi",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/15901eef-87ab-4247-966b-310fbd5aa864/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=G6fZ1g2o5Ks",
    subtleText: "3/16/2018 5pm pacific !7 year old Zap Developer explaining Zap's Protocol and DeFi to Google.",
    previewUrl: "/images/previews/zap-to-google.webp",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 18,
    title: "CNN Special 2014",
    subtitle: "Bitcoin Center NYC",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/73bf1c89-6b53-4ca3-a485-9251a812c15f/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=gRrpD3aGMp0",
    subtleText: "CNN SPECIAL BITCOIN CENTER NYC MORGAN SPURLOCK 2014",
    previewUrl: "/images/previews/CNN SPECIAL BITCOIN CENTER NYC MORGAN SPURLOCK 2014.webp",
    year: 2014,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 19,
    title: "TNABC 2020",
    subtitle: "A Brave New Economy",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/6f69c841-b402-4de9-bac5-8960d2f59f1e/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=hnNg3_LTA_E",
    subtleText: "Nick Spanos  A Brave New Economy  TNABC 2020",
    previewUrl: "/images/previews/Nick Spanos  A Brave New Economy  TNABC 2020.webp",
    year: 2020,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 20,
    title: "P2P Trading",
    subtitle: "Wall Street",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/edbc60d9-da67-45ab-b2c0-e72ed89a177f/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=K5D1T63IAKc",
    subtleText: "Trading Bitcoin Person To Person In The Shadow Of Wall Street 2 bitcoin center",
    previewUrl: "/images/previews/Trading Bitcoin Person To Person In The Shadow Of Wall Street 2 bitcoin center.webp",
    year: 2015,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 21,
    title: "Travel Log",
    subtitle: "Coup D'État",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/61b95c65-44f4-4811-8126-241c6c7ce6c4/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=Kw8vB1CBi30",
    subtleText: "nick spanos trapped in country during a coup d'etat",
    previewUrl: "/images/previews/nick spanos trapped in country during a coup d'etat.webp",
    year: 2016,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 22,
    title: "Zap Dev Log",
    subtitle: "Protocol Development",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/86942dc8-7cef-4f6c-93e7-9f1f7927f87b/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=lmCOq1h6yIU",
    subtleText: "8/10/2020 zap protocol development",
    previewUrl: "/images/previews/8-10-2020 zap protocol development.webp",
    year: 2020,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 23,
    title: "SIMM Jacking",
    subtitle: "Cure Bitcoin?",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/45a57b89-1503-4867-b2cd-e7b2c758653b/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=m29hgoxG9yA",
    subtleText: "SIMM Jacking cure Bitcoin",
    previewUrl: "/images/previews/SIMM Jacking cure Bitcoin.webp",
    year: 2019,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 24,
    title: "Archive Clip",
    subtitle: "From the archive",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/39ed1edd-744f-4445-b95d-36c1508f8695/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=n7MlZh0Futo",
    subtleText: "IMG 3431",
    previewUrl: "/images/previews/IMG 3431.webp",
    year: 2019,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 25,
    title: "Crypto Currency Convention",
    subtitle: "Dev Talk 2014",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/37435668-5436-47e6-a3d5-88218aaa719d/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=o6yfBLiXTrg",
    subtleText: "Nick Spanos  speaking to devs @ Crypto Currency Convention 2014 after huge price crash in bitcoin.",
    previewUrl: "/images/previews/Nick Spanos  speaking to devs @ Crypto Currency Convention 2014 after huge price crash in bitcoin..webp",
    year: 2014,
    country: "United States",
    author: "Nick Spanos",
    subtitles: [],
    publishedAt: "2014-04-21",
    description: `(2014) New York, United states
From Wall Street’s Doorstep to Bitcoin’s Frontline – Nick Spanos Live at CryptoCurrency Convention 2014

In April 2014, before Bitcoin became a global headline, Nick Spanos—founder of the legendary Bitcoin Center NYC—took the stage at the CryptoCurrency Convention to deliver a bold message: The future of money is here, and it’s unstoppable.

📍 Just steps away from the New York Stock Exchange, Spanos turned his Bitcoin Center into a buzzing hub where traders, innovators, and curious minds met face-to-face to shape the future of finance.
In this talk, you’ll discover:

* How Spanos brought Bitcoin into the mainstream spotlight
* Why physical spaces were key to crypto’s early adoption
* The raw energy of the 2014 Bitcoin movement—uncensored and unforgettable
Whether you’re a crypto veteran or just curious about how it all began, this is a time capsule of the moment Bitcoin went from underground to undeniable.

#Bitcoin #NickSpanos #BitcoinCenterNYC #CryptoHistory #Blockchain #WallStreet #CryptoConvention`
  },
  {
    id: 26,
    title: "Slidechain Part 1",
    subtitle: "With Andrew Martin",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/a5f5ac27-f46c-453f-a11c-5d3818ae346d/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=o7-_Dif1VBI",
    subtleText: "slidechain part 1 with Andrew Martin of Blockchain Technologies Corp.",
    previewUrl: "/images/previews/slidechain part 1 with Andrew Martin of Blockchain Technologies Corp..webp",
    year: 2013,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 27,
    title: "Debate with Peter Schiff",
    subtitle: "Is Bitcoin a Bubble?",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/ddc75270-b3c5-4545-99c8-872a93c7eab3/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=Q83bb6gruZY",
    subtleText: "nick spanos vs peter schiff is bitcoin a bubble 2017",
    previewUrl: "/images/previews/nick spanos vs peter schiff is bitcoin a bubble 2017.webp",
    year: 2017,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 28,
    title: "To Wharton",
    subtitle: "Blockchain & Zap",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/24315708-8c9b-4029-b79e-cb5076af745d/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=QcuFAl1r9Xo",
    subtleText: "4/5/18 on way to warton school to teach them blockchain, bonding curves and zap protocol",
    previewUrl: "/images/previews/4-5-18 on way to warton school to teach them blockchain, bonding curves and zap protocol.webp",
    year: 2018,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 29,
    title: "Buying Bitcoin",
    subtitle: "With Andrew Martin",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/4052c1ac-a1bd-4205-970a-0839aca90171/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=ReKPR5WBebk",
    subtleText: "buying bitcoin with Andrew Martin of blockchain technologies at the bitcoin center",
    previewUrl: "/images/previews/buying bitcoin with Andrew Martin of blockchain technologies at the bitcoin center.webp",
    year: 2014,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 30,
    title: "Founder Interview",
    subtitle: "Bitcoin Center & Zap",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/a4534704-637c-46fc-a33e-df7f5f281e9a/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=SbLvgDdArxI",
    subtleText: "Nick Spanos Founder of Bitcoin Center and Zap org 1",
    previewUrl: "/images/previews/Nick Spanos Founder of Bitcoin Center and Zap org 1.webp",
    year: 2018,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 31,
    title: "Slidechain 2013",
    subtitle: "White Video",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/316620a7-3bb1-4d02-aa2b-66ed573f185f/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=tepwPaYE0Ro",
    subtleText: "Slidechain 2013 white video",
    previewUrl: "/images/previews/Slidechain 2013 white video.webp",
    year: 2013,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 32,
    title: "Unlock Dubai Keynote",
    subtitle: "Conference Keynote",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/316620a7-3bb1-4d02-aa2b-66ed573f185f/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=Uyk6HaZoc6I",
    subtleText: "Keynote by Bitcoin Pioneer Nick Spanos at Unlock, Dubai.",
    previewUrl: "/images/previews/Keynote by Bitcoin Pioneer Nick Spanos at Unlock Dubai.webp",
    year: 2018,
    country: "United Arab Emirates",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 33,
    title: "WBF 2018",
    subtitle: "World Blockchain Forum",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/31a2cd02-31e5-4eca-88fa-685f51fd1d9a/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=v4T8qpZHKi8",
    subtleText: "WBF2018",
    previewUrl: "/images/previews/WBF2018.webp",
    year: 2018,
    country: "United Arab Emirates",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 34,
    title: "CNN Special 2015",
    subtitle: "Bitcoin Center NYC",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/8b9121a9-fa09-4bfc-9ca3-391749f25b39/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=V9_7iBJKWe4",
    subtleText: "CNN special on bitcoin center in 2015",
    previewUrl: "/images/previews/CNN special on bitcoin center in 2015.webp",
    year: 2015,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 35,
    title: "Mauritius Address",
    subtitle: "Government Officials",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/755ab00b-e14d-4a81-bdb6-834ad2f88c2d/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=wdQgu_CyEWA",
    subtleText: "November 2018 Nick Spanos Addresses Mauritius Government officials.",
    previewUrl: "/images/previews/November 2018 Nick Spanos Addresses Mauritius Government officials..webp",
    year: 2018,
    country: "Mauritius",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 36,
    title: "In Memory of Andrew Martin",
    subtitle: "Tribute",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/0f345f0d-e759-4e45-8a7f-cc42f2b7acb9/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=Ws9ItAregf4",
    subtleText: "In memory of bitcoin blockchain pioneer Andrew Martin 1995-2016",
    previewUrl: "/images/previews/In memory of bitcoin blockchain pioneer Andrew Martin 1995-2016.webp",
    year: 2016,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 37,
    title: "World Government Summit",
    subtitle: "Dubai",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/9b7c042c-55e8-49de-abd4-057f3ceaf7a1/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=WZ9MWsu4o54",
    subtleText: "World Government Summit",
    previewUrl: "/images/previews/World Government Summit.webp",
    year: 2018,
    country: "United Arab Emirates",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 38,
    title: "Ron Paul March",
    subtitle: "Federal Reserve 2009",
    videoSrc: "",
    //blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    streamUrl: "https://vz-960ce3f8-aff.b-cdn.net/cf19d9f7-d820-45c9-a2c4-aadfdd7f9d15/playlist.m3u8",
    link: "https://www.youtube.com/watch?v=XhZPosXVsvI",
    subtleText: "Ron Paul and Nick Spanos march on the federal Reserve 2009.",
    previewUrl: "/images/previews/Ron Paul and Nick Spanos march on the federal Reserve 2009..webp",
    year: 2009,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },*/
  //39 is already done
]

export const videos: VideoBox[] = rawVideos;


