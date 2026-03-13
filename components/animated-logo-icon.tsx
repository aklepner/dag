"use client"

export function AnimatedLogoIcon({ size = 44 }: { size?: number }) {
  return (
    <div className="group/icon" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="iconGradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#iconGradient)" />

        {/* Growth bars - 5 bars of increasing height */}
        {/* Bar 1 (shortest) */}
        <rect
          x="7" y="28" width="4" height="8" rx="1" fill="white"
          className="origin-bottom transition-all duration-500 ease-out group-hover/icon:animate-[bar-grow-1_0.6s_ease-out_forwards]"
        />
        {/* Bar 2 */}
        <rect
          x="13" y="24" width="4" height="12" rx="1" fill="white"
          className="origin-bottom transition-all duration-500 ease-out group-hover/icon:animate-[bar-grow-2_0.6s_ease-out_0.05s_forwards]"
        />
        {/* Bar 3 */}
        <rect
          x="19" y="20" width="4" height="16" rx="1" fill="white"
          className="origin-bottom transition-all duration-500 ease-out group-hover/icon:animate-[bar-grow-3_0.6s_ease-out_0.1s_forwards]"
        />
        {/* Bar 4 */}
        <rect
          x="25" y="16" width="4" height="20" rx="1" fill="white"
          className="origin-bottom transition-all duration-500 ease-out group-hover/icon:animate-[bar-grow-4_0.6s_ease-out_0.15s_forwards]"
        />
        {/* Bar 5 (tallest) */}
        <rect
          x="31" y="10" width="4" height="26" rx="1" fill="white"
          className="origin-bottom transition-all duration-500 ease-out group-hover/icon:animate-[bar-grow-5_0.6s_ease-out_0.2s_forwards]"
        />
      </svg>

      <style jsx>{`
        @keyframes bar-grow-1 {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.3); }
          60% { transform: scaleY(1.15); }
          100% { transform: scaleY(1); }
        }
        @keyframes bar-grow-2 {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.3); }
          60% { transform: scaleY(1.15); }
          100% { transform: scaleY(1); }
        }
        @keyframes bar-grow-3 {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.3); }
          60% { transform: scaleY(1.15); }
          100% { transform: scaleY(1); }
        }
        @keyframes bar-grow-4 {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.3); }
          60% { transform: scaleY(1.15); }
          100% { transform: scaleY(1); }
        }
        @keyframes bar-grow-5 {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.3); }
          60% { transform: scaleY(1.15); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
