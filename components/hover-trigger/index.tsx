"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ClickToActionSVG from './click-to-action-svg';
import HoverToActionSVG from './hover-to-action-svg';
import HoldMaskSVG from './hold-mask-svg';
import './styles.css';

interface HoverTriggerProps {
    onTriggerStart: () => void;
    onTriggerEnd: () => void;
}

const HoverTrigger: React.FC<HoverTriggerProps> = ({ onTriggerStart, onTriggerEnd }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const triggerContainerRef = useRef<HTMLDivElement>(null);
    const mobileSvgRef = useRef<SVGSVGElement>(null);
    const desktopSvgRef = useRef<SVGSVGElement>(null);
    const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const svgAnimationRef = useRef<gsap.core.Tween | null>(null);
    const positionRef = useRef(0);

    const frameWidth = isMobile ? 80 : 100;
    const totalFrames = 120;

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Sprite animation effect
    useEffect(() => {
        // Only animate sprite when video is NOT playing
        if (!isVideoPlaying) {
            animationIntervalRef.current = setInterval(() => {
                if (triggerContainerRef.current) {
                    positionRef.current += frameWidth;
                    
                    // Reset position immediately when reaching the end
                    if (positionRef.current >= frameWidth * totalFrames) {
                        positionRef.current = 0;
                    }

                    gsap.to(triggerContainerRef.current, {
                        duration: 0,
                        ease: 'none',
                        backgroundPositionX: -positionRef.current,
                    });
                }
            }, 30);
        } else {
            // Pause sprite animation when video is playing
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
                animationIntervalRef.current = null;
            }
        }

        return () => {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
            }
        };
    }, [isVideoPlaying, totalFrames, frameWidth]);

    // SVG rotation animation
    useEffect(() => {
        const svgElements = [mobileSvgRef.current, desktopSvgRef.current].filter(Boolean);
        
        if (svgElements.length > 0) {
            // Kill any existing animation
            if (svgAnimationRef.current) {
                svgAnimationRef.current.kill();
            }
            
            // Only animate SVG when video is NOT playing
            if (!isVideoPlaying) {
                svgAnimationRef.current = gsap.to(svgElements, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                    repeat: -1
                });
            }
        }
    }, [isVideoPlaying]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsInteracting(true);
            setIsVideoPlaying(true);
            onTriggerStart();
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsInteracting(false);
            setIsVideoPlaying(false);
            onTriggerEnd();
        }
    };

    const handleClick = () => {
        if (isMobile) {
            const newVideoState = !isVideoPlaying;
            setIsVideoPlaying(newVideoState);
            setIsInteracting(newVideoState);
            
            if (newVideoState) {
                onTriggerStart();
            } else {
                onTriggerEnd();
            }
        }
    };

    return (
        <div
            className="button-hold hoverable"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={triggerContainerRef} className="trigger-container" />

            <div className="mobile-svg">
                <ClickToActionSVG ref={mobileSvgRef} className="hold_text" />
            </div>
            <div className="desktop-svg">
                <HoverToActionSVG ref={desktopSvgRef} className="hold_text" />
            </div>
            <HoldMaskSVG className="hold_mask" />
        </div>
    );
};

export default HoverTrigger;
