
import React from 'react';

interface CardData {
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

interface GradientCardShowcaseProps {
  cards: CardData[];
}

export default function GradientCardShowcase({ cards }: GradientCardShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {cards.map(({ title, desc, icon, gradientFrom, gradientTo }, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-white/10 p-8 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
        >
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
          
          {/* Accent Line */}
          <div 
            className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            style={{
              background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
              {desc}
            </p>
          </div>
          
          {/* Glow Effect */}
          <div 
            className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
