
import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw, Github, Info } from 'lucide-react';
import { geminiService } from './services/geminiService';
import GreetingCard from './components/GreetingCard';
import { GreetingStyle } from './types';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("Hello, World!");
  const [style, setStyle] = useState<GreetingStyle>('friendly');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const styles: GreetingStyle[] = ['friendly', 'poetic', 'pirate', 'technical', 'zen', 'formal'];

  const fetchNewGreeting = useCallback(async (selectedStyle: GreetingStyle) => {
    setIsLoading(true);
    try {
      const result = await geminiService.generateGreeting(selectedStyle);
      setGreeting(result);
    } catch (error) {
      setGreeting("Failed to communicate with the cosmos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStyleChange = (newStyle: GreetingStyle) => {
    setStyle(newStyle);
    fetchNewGreeting(newStyle);
  };

  useEffect(() => {
    fetchNewGreeting(style);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <header className="mb-12 text-center max-w-2xl">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium mb-6">
          <Info className="w-3 h-3 mr-2" />
          A sophisticated Hello World exploration
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          Hello <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">World</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Experience the classic developer greeting through the lens of advanced artificial intelligence.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <GreetingCard greeting={greeting} style={style} isLoading={isLoading} />

        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => handleStyleChange(s)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  style === s
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-100'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchNewGreeting(style)}
            disabled={isLoading}
            className="group mx-auto flex items-center space-x-2 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span>Regenerate Message</span>
          </button>
        </div>
      </main>

      <footer className="mt-16 pt-8 border-t border-slate-800 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-300 transition-colors">API Reference</a>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> System Online</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
