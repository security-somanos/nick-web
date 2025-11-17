"use client"

import React from 'react';
import Link from "next/link";
import {FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube} from "react-icons/fa6";
import {SiClubhouse} from "react-icons/si";
import {Button} from "@/components/ui/button";
import { trackSocialLinkClick } from "@/lib/facebook-pixel";

const Footer = () => {
    return (
        <footer className="pt-12 pb-4 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl tracking-widest font-bold font-impact text-white mb-4 bg-gradient-to-r font-title">
                            NICK SPANOS
                        </h3>
                        <p className="text-gray-400 text-xs mb-4 font-content">
                            Bitcoin pioneer, educator, and community builder dedicated to advancing cryptocurrency
                            adoption
                            worldwide.
                        </p>
                        <div className="flex gap-4 mb-2">
                            <Link 
                              href="https://www.facebook.com/RealNickSpanos" 
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "Facebook", link_url: "https://www.facebook.com/RealNickSpanos", link_location: "footer" })}
                            >
                                <FaFacebook className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://instagram.com/realnickspanos" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "Instagram", link_url: "https://instagram.com/realnickspanos", link_location: "footer" })}
                            >
                                <FaInstagram className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" 
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "YouTube", link_url: "https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg", link_location: "footer" })}
                            >
                                <FaYoutube className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://www.linkedin.com/in/nick-spanos/" 
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "LinkedIn", link_url: "https://www.linkedin.com/in/nick-spanos/", link_location: "footer" })}
                            >
                                <FaLinkedin className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://www.clubhouse.com/@nickspanos" 
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "Clubhouse", link_url: "https://www.clubhouse.com/@nickspanos", link_location: "footer" })}
                            >
                                <SiClubhouse className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://t.me/bitcoin_for_sale" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "Telegram", link_url: "https://t.me/bitcoin_for_sale", link_location: "footer" })}
                            >
                                <FaTelegram className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                            <Link 
                              href="https://x.com/nickspanos" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackSocialLinkClick({ social_platform: "Twitter", link_url: "https://x.com/nickspanos", link_location: "footer" })}
                            >
                                <FaXTwitter className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                            </Link>
                        </div>
                        <p className="text-gray-500 text-xs italic">
                            I will never DM you first
                        </p>
                    </div>

                    <div>
                        <h4 className="text-md mt-1 font-impact tracking-widest font-semibold text-white mb-4 font-title">QUICK
                            LINKS</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-content">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Bitcoin Center NYC
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Speaking
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Media Kit
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md mt-1 font-impact tracking-widest font-semibold text-white mb-4">CONTACT</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-content">
                            <li>Speaking Inquiries</li>
                            <li>Media Requests</li>
                            <li>Collaboration</li>
                            <li>
                                <Link href="/contact">
                                    <Button variant="outlineTech"
                                            className="rounded-lg mt-2 border-gray-400 text-gray-300 ">Get In
                                        Touch</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#252525] pt-4 text-center">
                    <p className="text-gray-500 font-content text-sm">
                        © {new Date().getFullYear()} Nick Spanos. All rights reserved. <br
                        className="block md:hidden"/><span className="hidden md:inline">|</span> Building the future of
                        Bitcoin, <br className="block md:hidden"/> one block
                        at a time.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;