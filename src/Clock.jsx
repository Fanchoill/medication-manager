import React, { useState, useEffect } from 'react';

const VintageClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Clock Container */}
      <div 
        className="relative w-48 h-48 rounded-full shadow-xl"
        role="img" 
        aria-label="Vintage analog clock"
        style={{
          background: 'radial-gradient(#f4e4bc, #e6d5aa)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 0 0 30px rgba(0,0,0,0.1)'
        }}
      >
        {/* Wooden Frame */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: '12px solid #8B4513',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            background: 'radial-gradient(#8B4513, #654321)'
          }}
        />

        {/* Clock Face */}
        <div className="absolute inset-3 rounded-full bg-opacity-90"
             style={{
               background: 'radial-gradient(#f8f4e4, #eae0c8)',
               boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)'
             }}>
          
          {/* Hour Markers */}
          {[...Array(12)].map((_, i) => {
            const rotation = (i + 1) * 30;
            const isMainHour = (i + 1) % 3 === 0;
            return (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div 
                  className={`absolute left-1/2 font-serif ${isMainHour ? 'text-xl' : 'text-base'}`}
                  style={{ 
                    transform: 'translateX(-50%)',
                    top: '0.75rem',
                    color: '#463E3F',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                  }}
                >
                  {i + 1}
                </div>
              </div>
            );
          })}

          {/* Clock Hands */}
          {/* Hour Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-16 -ml-0.75 -mt-16 origin-bottom transform"
            style={{
              background: '#463E3F',
              transform: `rotate(${hourDegrees}deg)`,
              boxShadow: '2px 2px 2px rgba(0,0,0,0.3)',
              borderRadius: '2px'
            }}
            aria-hidden="true"
          />
          
          {/* Minute Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-20 -ml-0.5 -mt-20 origin-bottom transform"
            style={{
              background: '#463E3F',
              transform: `rotate(${minuteDegrees}deg)`,
              boxShadow: '1px 1px 1px rgba(0,0,0,0.3)',
              borderRadius: '1px'
            }}
            aria-hidden="true"
          />
          
          {/* Second Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-0.5 h-20 -ml-0.25 -mt-20 origin-bottom transform"
            style={{
              background: '#8B0000',
              transform: `rotate(${secondDegrees}deg)`,
              boxShadow: '1px 1px 1px rgba(0,0,0,0.2)'
            }}
            aria-hidden="true"
          />

          {/* Center Pin */}
          <div 
            className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full"
            style={{
              background: 'radial-gradient(#463E3F, #2A2627)',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>

      {/* Digital Time Display (in vintage style) */}
      <div 
        className="text-center font-serif" 
        aria-live="polite"
        style={{ color: '#463E3F' }}
      >
        <div className="text-lg" aria-label="Current date">
          {time.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div 
          className="text-xl"
          style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}
          aria-label="Current time"
        >
          {time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default VintageClock;
