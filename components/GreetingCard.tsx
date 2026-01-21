
import React from 'react';
import { Sparkles, Globe, Terminal, Anchor, Feather, Smile } from 'lucide-react';
import { GreetingStyle } from '../types';

interface GreetingCardProps {
  greeting: string;
  style: GreetingStyle;
  isLoading: boolean;
}

const StyleIcon = ({ style }: { style: GreetingStyle }) => {
  switch (style) {
    case 'poetic': return <Feather className="w-6 h-6 text-pink-400" />;
    case 'pirate': return <Anchor className="w-6 h-6 text-amber-400" />;
    case 'technical': return <Terminal className="w-6 h-6 text-emerald-400" />;
    case 'friendly': return <Smile className="w-6 h-6 text-blue-400" />;
    case 'zen': return <Globe className="w-6 h-6 text-indigo-400" />;
    case 'formal': return <Sparkles className="w-6 h-6 text-purple-400" />;
    default: return <Sparkles className="w-6 h-6 text-white" />;
  }
};

const GreetingCard: React.FC<GreetingCardProps> = ({ greeting, style, isLoading }) => {
  return (
    <div className="relative group">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
              <StyleIcon style={style} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Style</h3>
              <p className="text-lg font-semibold text-slate-100 capitalize">{style}</p>
            </div>
          </div>
          
          {isLoading && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          )}
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          <p className={`text-3xl md:text-5xl font-bold text-center leading-tight transition-all duration-500 ${isLoading ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-400">
              {greeting}
            </span>
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-500">
          <span>Powered by Gemini 3 Flash</span>
          <span className="flex items-center">
            <Globe className="w-3 h-3 mr-1" /> Multi-dimensional Greetings
          </span>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
