"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  className?: string;
  animate?: boolean;
}

export function Sparkline({
  data,
  width = 280,
  height = 80,
  lineColor = "#B22222",
  fillColor = "rgba(178,34,34,0.15)",
  className,
  animate = true,
}: SparklineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const prefersReduced = useReducedMotion();
  const gradientId = useId();

  const padding = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return [x, y] as [number, number];
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");

  const fillPath =
    linePath +
    ` L ${points[points.length - 1][0].toFixed(1)} ${(height - padding).toFixed(1)}` +
    ` L ${points[0][0].toFixed(1)} ${(height - padding).toFixed(1)} Z`;

  useEffect(() => {
    if (!pathRef.current || !animate || prefersReduced) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = String(length);
    pathRef.current.style.strokeDashoffset = String(length);
    // Force reflow
    pathRef.current.getBoundingClientRect();
    pathRef.current.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)";
    pathRef.current.style.strokeDashoffset = "0";
  }, [animate, prefersReduced]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradientId})`} />
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
