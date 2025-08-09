export interface VideoBox {
  id: number
  title: string
  subtitle: string
  videoSrc: string
  blobUrl?: string
  link: string
  subtleText: string
  year: number
  country: string
  subtitles?: SubtitleTrack[]
  author: string
  previewUrl?: string
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
    videoSrc: "/videos/conferences/london.mp4",
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    author: "CryptoCurrency Convention",
    link: "https://www.youtube.com/watch?v=189Q0LJOxHA",
    subtleText: "Face Fears! Learn to Ride Life's Bicycle: Eyes on the Prize!",
    year: 2016,
    country: "United Kingdom",
    subtitles: [
      { lang: "en", label: "English", src: "/videos/subtitles/london.en.vtt", default: true },
      { lang: "es", label: "Español", src: "/videos/subtitles/london.es.vtt" }
    ]
  },
  { 
    id: 2, 
    title: "MIAMI, US", 
    subtitle: "The revolution has started", 
    videoSrc: "/videos/conferences/miami.mp4",
    blobUrl: "//MyTransmedia/20220215%20-%20Nick%20Spanos%20in%20Miami.mkv",
    author: "MyTransmedia",
    link: "https://www.youtube.com/watch?v=Ut-mWQOMKZU",
    subtleText: "Bitcoin's Rise: Breaking Free and Building a Crypto Exchange!",
    year: 2018,
    country: "United States",
    subtitles: [
      { lang: "en", label: "English", src: "/videos/subtitles/miami.en.vtt", default: true }
    ]
  },
  { 
    id: 3, 
    title: "MALTA, EU", 
    subtitle: "The State Of Crypto", 
    videoSrc: "/videos/conferences/malta.mp4",
    blobUrl: "//AIBC%20World/20221128%20-%20The%20State%20Of%20Crypto%20with%20Nick%20Spanos%2C%20Founder%20at%20Bitcoin%20Center%20NYC%20%EF%BD%9C%20Europe%202022.mkv",
    author: "AIBC World",
    link: "https://www.youtube.com/watch?v=Ft1LUJJyUOM",
    subtleText: "Blockchain vs. Beasts: Take Control of Your Future!",
    year: 2019,
    country: "Malta"
  },
  { 
    id: 4, 
    title: "NEW YORK, US", 
    subtitle: "Wall Street's Cryptocurrency HQ", 
    videoSrc: "/videos/conferences/new-york.mp4",
    blobUrl: "//ReasonTV/20140128%20-%20Wall%20Street%27s%20Cryptocurrency%20Headquarters%EF%BC%9A%20Inside%20Bitcoin%20Center%20NYC.mkv",
    author: "ReasonTV",
    link: "https://www.youtube.com/watch?v=DS29SnLaKJs",
    subtleText: "Bitcoin vs Inflation: The Educational Power That Changes Everything!",
    year: 2014,
    country: "United States"
  },
  { 
    id: 5, 
    title: "BALZAN, MALTA",
    subtitle: "AIBC Eurasia Conference 2024",
    videoSrc: "/videos/conferences/balzan.mp4",
    blobUrl: "/AIBC%20World/20240419%20-%20The%20State%20of%20Crypto%EF%BC%9A%20Insights%20from%20Nick%20Spanos%20%EF%BD%9C%20AIBC%20Eurasia%20Conference%202024.mkv",
    author: "AIBC World",
    link: "https://www.youtube.com/watch?v=YTLN4AoXfkE",
    subtleText: "Never Lose Your Power! Don't let anyone take your tharos.",
    year: 2024,
    country: "Malta"
  },
  { 
    id: 6, 
    title: "DUBAI, UAE",
    subtitle: "World Blockchain Forum Dubai",
    videoSrc: "/videos/conferences/dubai.mp4",
    blobUrl: "/WAGMI%20Events/20180503%20-%20NICK%20SPANOS%20-%20World%20Blockchain%20Forum%20Dubai.mkv",
    author: "WAGMI Events",
    link: "https://www.youtube.com/watch?v=Jc2LxHfbiLA",
    subtleText: "Bought 12,000 Domains in the 90s? My Family's Reaction!",
    year: 2017,
    country: "United Arab Emirates"
  },
  { 
    id: 7, 
    title: "MIAMI, US",
    subtitle: "CBDC's vs Bitcoin",
    videoSrc: "/videos/conferences/quantum.mp4",
    blobUrl: "/Nick%20Spanos/20230220%20-%20CBDC%27s%20vs%20Bitcoin%20with%20Nick%20Spanos%20%20Quantum%20Miami%202023.mkv",
    author: "Nick Spanos",
    link: "https://www.youtube.com/watch?v=VnHPcCXTbh8",
    subtleText: "CBDC Apocalypse: How AI Controls Your Money & Your Spending!",
    year: 2023,
    country: "United States"
  },
  { 
    id: 8, 
    title: "MIAMI, US", 
    subtitle: "Nick Spanos launches Miami Bitcoin", 
    videoSrc: "/videos/conferences/miami-center.mp4", 
    blobUrl: "/Nick%20Spanos/20190123%20-%20Nick%20Spanos%20launches%20Miami%20Bitcoin%20Center%20during%20miami%20blockchain%20week.mkv",
    author: "Nick Spanos",
    link: "https://www.youtube.com/watch?v=bQhOD0Qa6No",
    subtleText: "Nick Spanos launches Miami Bitcoin",
    year: 2013,
    country: "United States"
  },
  
  // ==== New entries appended ====
  {
    id: 9,
    title: "Polycon 2018 Talk",
    subtitle: "Conference Highlight",
    videoSrc: "",
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=7CyecPgw3xk",
    subtleText: "Nick Spanos on Zap and the State of the Crypto at Polycon 2018",
    previewUrl: "/images/previews/Nick Spanos on Zap and the State of the Crypto at Polycon 2018.webp",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=8LCeKkTI058",
    subtleText: "Crypto Whales, first shark tank for crypto",
    previewUrl: "/images/previews/Crypto Whales, first shark tank for crypto..webp",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=a9tdEEhQ0cw",
    subtleText: "CNBC Arabia $zap interview Nick Spanos",
    previewUrl: "/images/previews/CNBC Arabia $zap interview Nick Spanos.webp",
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
    previewUrl: "/images/previews/Nick Spanos launching DogeCoin at the Bitcoin Center 2013 on Wall Street..webp",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=BWbnjITWg78",
    subtleText: "6/22/18  4_12 pm Zap Protocol coders in action",
    previewUrl: "/images/previews/6⧸22⧸18  4_12 pm Zap Protocol coders in action.webp",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=By0MHhdWiNk",
    subtleText: "Bringing Real World Data to Smart Contracts  Nick Spanos",
    previewUrl: "/images/previews/Bringing Real World Data to Smart Contracts  Nick Spanos.webp",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=dAr2W7TNVeQ",
    subtleText: "IMG 1198",
    previewUrl: "/images/previews/IMG 1198.webp",
    year: 2018,
    country: "",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 16,
    title: "TNABC Talk",
    subtitle: "Revolution Won't Be Centralized",
    videoSrc: "",
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=lmCOq1h6yIU",
    subtleText: "8⧸10⧸2020 zap protocol development",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=o6yfBLiXTrg",
    subtleText: "Nick Spanos  speaking to devs @ Crypto Currency Convention 2014 after huge price crash in bitcoin.",
    previewUrl: "/images/previews/Nick Spanos  speaking to devs @ Crypto Currency Convention 2014 after huge price crash in bitcoin..webp",
    year: 2014,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
  {
    id: 26,
    title: "Slidechain Part 1",
    subtitle: "With Andrew Martin",
    videoSrc: "",
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=QcuFAl1r9Xo",
    subtleText: "4⧸5⧸18 on way to warton school to teach them blockchain, bonding curves and zap protocol",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
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
    blobUrl: "/CryptoCurrency%20Convention/20140421%20-%20%5BOFFICIAL%20SPONSOR%5D%20Nick%20Spanos%2C%20Bitcoin%20Center%20NYC%20%40%20CryptoCurrency%20Convention%204%E2%A7%B89%E2%A7%B814.mp4",
    link: "https://www.youtube.com/watch?v=XhZPosXVsvI",
    subtleText: "Ron Paul and Nick Spanos march on the federal Reserve 2009.",
    previewUrl: "/images/previews/Ron Paul and Nick Spanos march on the federal Reserve 2009..webp",
    year: 2009,
    country: "United States",
    author: "Nick Spanos",
    subtitles: []
  },
]

export const videos: VideoBox[] = rawVideos;


