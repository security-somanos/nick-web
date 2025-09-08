import { TypewriterText } from "./typewriter-text"
import {FiArrowDown, FiArrowUpRight} from "react-icons/fi";
import Link from "next/link";

export function HelloSection() {
  return (
    <section className="space-y-8 mt-20">
      <div className="flex items-center gap-2 text-lg border-1 border-white w-fit rounded-lg pe-4 ps-3">
          <FiArrowDown />
        <span className="font-mono text-gray-300 ">Personal Brand Media Kit</span>
      </div>

      <div className="space-y-4 font-mono">
        <h1 className="text-2xl mb-0 font-bold leading-tight">
          Nick Spanos,
        </h1>
        <TypewriterText
          words={["Bitcoin Pioneer", "Bitcoin Center NYC", "Blockchain Innovator"]}
          className="text-gray-300 text-5xl font-bold"
        />
        <h2 className="text-4xl font-bold text-gray-300 hidden">Based in New York, NY.</h2>
      </div>

      <div className="bg-[#1a1a1a] border border-[#ffffff1a] rounded-2xl p-6">
        <p className="text-gray-400 text-md text-justify leading-tight mb-3">
        Welcome to the official Media Kit for one of the early pioneers of Bitcoin — a blockchain visionary and serial entrepreneur. This resource is designed to equip journalists, partners, and event organizers with essential information, background, and media assets to support accurate coverage, impactful features, and meaningful collaborations.
        </p>
        <p className="text-gray-400 text-md text-justify leading-tight">
        This press kit serves as your go-to reference for accurate, up-to-date information and ready-to-use materials. Whether you are preparing an article, organizing a conference, or exploring partnership opportunities, the following pages will give you everything you need in one place.
        </p>
      </div>

      {/* Downloadable Resources */}
      <div className="pt-8">
        <h3 className="text-xl font-bold mb-6">Downloadable Resources</h3>
        <div className="grid grid-cols-4 gap-4">
          <Link 
            href="https://nick-spanos-pull.b-cdn.net/media/logos.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer flex flex-col justify-center min-h-[3rem]"
          >
            <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
              Media Partners Logos
              <FiArrowUpRight size={14} />
            </div>
          </Link>
          <Link 
            href="https://nick-spanos-pull.b-cdn.net/media/Nick%20Spanos%20-%20Video%20Introduction.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer flex flex-col justify-center min-h-[3rem]"
          >
            <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
              Video introduction
              <FiArrowUpRight size={14} />
            </div>
          </Link>
          <Link 
            href="https://nick-spanos-pull.b-cdn.net/media/assets-video.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer flex flex-col justify-center min-h-[3rem]"
          >
            <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
              + Assets
              <FiArrowUpRight size={14} />
            </div>
          </Link>
          <Link 
            href="https://nick-spanos-pull.b-cdn.net/media/merchandising.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-lg p-4 text-center hover:bg-white/5 transition-colors cursor-pointer flex flex-col justify-center min-h-[3rem]"
          >
            <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
              Merchandising
              <FiArrowUpRight size={14} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}


