import React from 'react';

interface LogoProps {
  variant?: 'orange' | 'cream' | 'burgundy' | 'dark' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const MaskedByMeLogo: React.FC<LogoProps> = ({
  variant = 'orange',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  // Brand color mappings matching authoritative guidelines:
  // Primary brand orange: #F05401
  // Warm cream: #FEE7B5
  // Deep burgundy: #441825
  const colorMap = {
    orange: {
      script: '#F05401',
      byMe: '#F05401',
      underline: '#F05401',
      tagline: '#736E65',
    },
    cream: {
      script: '#FEE7B5',
      byMe: '#FEE7B5',
      underline: '#FEE7B5',
      tagline: '#FEE7B5',
    },
    burgundy: {
      script: '#441825',
      byMe: '#441825',
      underline: '#441825',
      tagline: '#736E65',
    },
    dark: {
      script: '#242321',
      byMe: '#242321',
      underline: '#242321',
      tagline: '#736E65',
    },
    white: {
      script: '#FFFFFF',
      byMe: '#FFFFFF',
      underline: '#FFFFFF',
      tagline: '#E8E0D2',
    },
  };

  const colors = colorMap[variant] || colorMap.orange;

  const sizeDimensions = {
    xs: { width: 110, height: 38 },
    sm: { width: 140, height: 48 },
    md: { width: 180, height: 60 },
    lg: { width: 230, height: 78 },
    xl: { width: 290, height: 98 },
  };

  const { width, height } = sizeDimensions[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto transition-colors duration-300"
        style={{ height: `${height}px`, maxHeight: '100%' }}
        aria-label="Masked BY ME"
      >
        {/* Authoritative Script Wordmark "Masked" */}
        <g id="masked-wordmark">
          {/* Letter 'M' - sweeping initial flourishing loop and elegant arches */}
          <path
            d="M 14 53 C 12 50 14 42 16 34 C 18 26 21 16 26 13 C 29 11 31 12 32 15 C 34 22 28 39 26 50 C 29 42 34 26 39 21 C 42 18 45 18 47 21 C 49 25 48 34 46 42 C 45 47 44 51 46 51 C 48 51 52 44 55 37 C 57 32 58 27 61 24 C 63 22 65 23 65 26 C 64 34 58 46 57 51 C 58 53 62 49 65 44"
            stroke={colors.script}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'a' */}
          <path
            d="M 72 38 C 68 38 65 42 65 46 C 65 50 68 53 72 53 C 76 53 79 48 80 43 L 80 52 C 80 52 82 52 84 48"
            stroke={colors.script}
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 's' */}
          <path
            d="M 87 47 C 88 51 91 53 95 53 C 98 53 100 51 100 48 C 100 44 94 43 92 41 C 89 39 89 35 91 32 C 93 29 97 29 99 31 C 101 32 101 34 101 35"
            stroke={colors.script}
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'k' - tall elegant ascender with looped kick */}
          <path
            d="M 112 11 C 111 10 109 11 108 14 C 105 24 103 40 103 52 M 104 38 C 107 35 111 34 113 36 C 114 38 112 41 109 43 L 115 52 C 116 53 118 52 120 48"
            stroke={colors.script}
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'e' */}
          <path
            d="M 124 44 C 127 44 130 43 130 40 C 130 37 127 35 124 36 C 121 38 120 43 121 47 C 122 51 126 53 130 52 C 133 51 135 48 136 45"
            stroke={colors.script}
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'd' - rounded body with high sweeping ascender */}
          <path
            d="M 144 42 C 141 39 137 40 137 45 C 137 50 140 53 144 53 C 148 53 150 49 151 45 L 153 14 C 153 11 154 13 153 18 L 150 51 C 150 54 153 54 156 50"
            stroke={colors.script}
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Flowing underline swoosh starting beneath 's-k-e-d' */}
          <path
            d="M 85 58 Q 128 62 178 57 C 190 56 198 54 204 52"
            stroke={colors.underline}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Clean geometric tracked sans-serif "BY ME" positioned authoritatively below the underline */}
        <g id="by-me-label">
          {/* 'B' */}
          <path
            d="M 158 66 L 158 74 M 158 66 L 163 66 C 165 66 166.5 67 166.5 68 C 166.5 69.5 165 70 163 70 M 158 70 L 164 70 C 166 70 167.5 71 167.5 72.5 C 167.5 74 166 74 163.5 74 L 158 74"
            stroke={colors.byMe}
            strokeWidth="1.6"
            strokeLinecap="square"
          />
          {/* 'Y' */}
          <path
            d="M 172 66 L 175 70 L 178 66 M 175 70 L 175 74"
            stroke={colors.byMe}
            strokeWidth="1.6"
            strokeLinecap="square"
          />
          {/* 'M' */}
          <path
            d="M 186 74 L 186 66 L 190 71 L 194 66 L 194 74"
            stroke={colors.byMe}
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* 'E' */}
          <path
            d="M 201 66 L 201 74 M 201 66 L 208 66 M 201 70 L 206 70 M 201 74 L 208 74"
            stroke={colors.byMe}
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </g>
      </svg>

      {showTagline && (
        <span 
          className="text-[9px] uppercase tracking-[0.28em] font-medium mt-1 pl-1"
          style={{ color: colors.tagline }}
        >
          Ingredient-Driven Skin Ritual
        </span>
      )}
    </div>
  );
};
