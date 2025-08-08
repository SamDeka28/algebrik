import React from 'react';

interface SiriLogoProps {
  isAnimating?: boolean;
  isConversationActive?: boolean;
}

const SiriLogo = ({ isAnimating = false, isConversationActive = false }: SiriLogoProps) => {

  return (
    <div className={`siri-container transition-all duration-500 ${isConversationActive ? 'scale-75' : ''}`}>
      {/* Ripple waves */}
      {isAnimating && (
        <>
          <div className="siri-wave w-24 h-24"></div>
          <div className="siri-wave w-32 h-32"></div>
          <div className="siri-wave w-40 h-40"></div>
          <div className="siri-wave w-48 h-48"></div>
          <div className="siri-wave w-56 h-56"></div>
        </>
      )}
      
      {/* Main logo with morphing animation */}
      <div className={`relative z-10 transition-all duration-500 ${isAnimating ? 'animate-siri-pulse animate-float' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl transition-all duration-500 ${
          isConversationActive ? 'rounded-full' : 'rounded-2xl'
        } ${isAnimating ? 'animate-morph-wave' : ''}`} style={{ opacity: 0.3 }}></div>
        
        <svg 
          width={isConversationActive ? "80" : "96"}
          height={isConversationActive ? "80" : "96"}
          viewBox="0 0 512 512" 
          className={`relative z-10 drop-shadow-2xl transition-all duration-500 ${
            isConversationActive ? 'rounded-full' : ''
          }`}
          style={{
            clipPath: isConversationActive ? 'circle(50%)' : 'none'
          }}
        >
          <defs>
            <radialGradient id="paint0_radial_siri" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-191 -390.5) rotate(56.6599) scale(1021.64 780.625)">
              <stop stopColor="hsl(220 70% 70%)" />
              <stop offset="1" stopColor="hsl(220 70% 50%)" />
            </radialGradient>
            <linearGradient id="paint1_linear_siri" x1="212.671" y1="128.658" x2="212.671" y2="383.342" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.95"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
            <linearGradient id="paint2_linear_siri" x1="393.549" y1="317.1" x2="393.549" y2="382.449" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.95"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
          </defs>
          
          <rect width="512" height="512" rx="88" fill="white"/>
          <rect width="512" height="512" rx="88" fill="url(#paint0_radial_siri)"/>
          
          {/* Animated path morphing */}
          <path 
            d="M86 254.881C86 230.114 91.0728 208.181 101.218 189.084C111.662 169.986 125.687 155.216 143.293 144.772C161.197 134.029 180.891 128.658 202.376 128.658C221.772 128.658 238.631 132.537 252.955 140.296C267.576 147.756 279.214 157.155 287.867 168.494V132.686H339.341V379.314H287.867V342.61C279.214 354.248 267.427 363.946 252.507 371.704C237.587 379.463 220.578 383.342 201.481 383.342C180.294 383.342 160.898 377.971 143.293 367.228C125.687 356.188 111.662 340.969 101.218 321.573C91.0728 301.879 86 279.648 86 254.881ZM287.867 255.776C287.867 238.767 284.286 223.997 277.125 211.464C270.262 198.931 261.16 189.382 249.821 182.817C238.482 176.253 226.248 172.97 213.118 172.97C199.989 172.97 187.754 176.253 176.415 182.817C165.076 189.084 155.825 198.483 148.664 211.016C141.801 223.251 138.369 237.872 138.369 254.881C138.369 271.89 141.801 286.81 148.664 299.641C155.825 312.472 165.076 322.319 176.415 329.182C188.053 335.747 200.287 339.03 213.118 339.03C226.248 339.03 238.482 335.747 249.821 329.182C261.16 322.618 270.262 313.069 277.125 300.536C284.286 287.705 287.867 272.785 287.867 255.776Z" 
            fill="url(#paint1_linear_siri)" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinejoin="round"
            className={isAnimating ? 'animate-pulse' : ''}
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 10px hsl(220 70% 60%))' : 'none',
              transition: 'all 0.3s ease-in-out'
            }}
          />
          
          <path 
            d="M393.773 382.449C384.523 382.449 376.764 379.316 370.498 373.05C364.231 366.783 361.098 359.025 361.098 349.775C361.098 340.524 364.231 332.766 370.498 326.499C376.764 320.233 384.523 317.1 393.773 317.1C402.725 317.1 410.334 320.233 416.6 326.499C422.867 332.766 426 340.524 426 349.775C426 359.025 422.867 366.783 416.6 373.05C410.334 379.316 402.725 382.449 393.773 382.449Z" 
            fill="url(#paint2_linear_siri)" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinejoin="round"
            className={isAnimating ? 'animate-bounce-subtle' : ''}
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 8px hsl(220 70% 60%))' : 'none',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default SiriLogo;