
import React, { useState, useEffect } from 'react';

const SeasonalBackground = () => {
  const [currentSeason, setCurrentSeason] = useState(0);

  const seasons = [
    {
      name: 'Bahor',
      colors: ['from-green-200', 'via-pink-100', 'to-yellow-100'],
      particles: '🌸🌷🦋',
      gradient: 'bg-gradient-to-br from-green-200 via-pink-100 to-yellow-100'
    },
    {
      name: 'Yoz',
      colors: ['from-yellow-200', 'via-orange-100', 'to-red-100'],
      particles: '☀️🌻🏖️',
      gradient: 'bg-gradient-to-br from-yellow-200 via-orange-100 to-red-100'
    },
    {
      name: 'Kuz',
      colors: ['from-orange-200', 'via-red-100', 'to-yellow-200'],
      particles: '🍂🍁🌰',
      gradient: 'bg-gradient-to-br from-orange-200 via-red-100 to-yellow-200'
    },
    {
      name: 'Qish',
      colors: ['from-blue-200', 'via-white', 'to-gray-100'],
      particles: '❄️⛄🌨️',
      gradient: 'bg-gradient-to-br from-blue-200 via-white to-gray-100'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeason((prev) => (prev + 1) % seasons.length);
    }, 10000); // 10 soniyada bir marta o'zgaradi

    return () => clearInterval(interval);
  }, []);

  const currentSeasonData = seasons[currentSeason];

  return (
    <>
      <style jsx global>{`
        .seasonal-background {
          background: linear-gradient(135deg, 
            ${currentSeasonData.colors[0].replace('from-', '')} 0%, 
            ${currentSeasonData.colors[1].replace('via-', '')} 50%, 
            ${currentSeasonData.colors[2].replace('to-', '')} 100%
          );
          transition: all 2s ease-in-out;
        }
        
        .seasonal-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
          opacity: 0.6;
        }
        
        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { top: 40%; left: 80%; animation-delay: 4s; }
        .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 1s; }
        .particle:nth-child(5) { top: 10%; left: 90%; animation-delay: 3s; }
        .particle:nth-child(6) { top: 70%; left: 5%; animation-delay: 5s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
      `}</style>
      
      <div className="seasonal-particles">
        {Array.from({length: 6}, (_, i) => (
          <div 
            key={i} 
            className="particle"
          >
            {currentSeasonData.particles[i % currentSeasonData.particles.length]}
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-10">
        <span className="text-sm font-medium">
          🌍 {currentSeasonData.name} mavzusi
        </span>
      </div>
    </>
  );
};

export default SeasonalBackground;
