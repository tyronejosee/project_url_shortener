"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

type VelocityMapping = {
  input: [number, number];
  output: [number, number];
};

type Props = {
  icons: React.ComponentType<React.SVGProps<SVGSVGElement>>[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  iconSize?: number;
  direction?: "left" | "right";
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
};

export default function ScrollVelocity({
  icons = [],
  velocity = 50,
  className = "",
  damping = 50,
  stiffness = 400,
  iconSize = 48,
  direction = "left",
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(direction);

  const scrollDirectionThreshold = useRef(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const totalIconsWidth = icons.length * (iconSize + 16);
        setContainerWidth(totalIconsWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [icons, iconSize]);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false },
  );

  useAnimationFrame((t, delta) => {
    let moveBy =
      (currentDirection === "left" ? -1 : 1) * velocity * (delta / 1000);

    scrollDirectionThreshold.current += velocityFactor.get();

    if (Math.abs(scrollDirectionThreshold.current) > 10) {
      if (scrollDirectionThreshold.current > 0) {
        setCurrentDirection("right");
      } else {
        setCurrentDirection("left");
      }
      scrollDirectionThreshold.current = 0;
    }

    moveBy +=
      (currentDirection === "left" ? -1 : 1) * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => {
    if (containerWidth === 0) return "0px";
    return `${-Math.abs(v % containerWidth)}px`;
  });

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const totalIconsWidth = icons.length * (iconSize + 16);
  const copiesNeeded = Math.ceil(windowWidth / totalIconsWidth) + 2;

  return (
    <div
      ref={containerRef}
      className={`${parallaxClassName} relative overflow-hidden w-full`}
      style={parallaxStyle}
    >
      <div className="z-40 pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="z-40 pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      <motion.div
        className={`${scrollerClassName} flex whitespace-nowrap items-center justify-center`}
        style={{ x, ...scrollerStyle }}
      >
        {Array.from({ length: copiesNeeded }).map((_, copyIndex) => (
          <div key={copyIndex} className="flex items-center justify-center">
            {icons.map((Icon, iconIndex) => (
              <div
                key={`${copyIndex}-${iconIndex}`}
                className={`flex-shrink-0 flex items-center justify-center mx-2 ${className}`}
              >
                <Icon width={iconSize} height={iconSize} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
