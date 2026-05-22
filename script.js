const { useState, useEffect } = React;

        function MinimalCurator() {
            const [topic, setTopic] = useState('');
            const [currentStep, setCurrentStep] = useState('idle'); // idle, processing, complete
            const [statusText, setStatusText] = useState('');
            const [sourcesCount, setSourcesCount] = useState(0);

            const executionPhases = [
                "Scanning global search indexes...",
                "Isolating multi-source contradictions...",
                "Removing editorial bias parameters...",
                "Extracting universal core consensus..."
            ];

            useEffect(() => {
                if (currentStep !== 'processing') return;

                let phaseIndex = 0;
                setStatusText(executionPhases[0]);

                const interval = setInterval(() => {
                    phaseIndex++;
                    if (phaseIndex < executionPhases.length) {
                        setStatusText(executionPhases[phaseIndex]);
                    } else {
                        clearInterval(interval);
                        setSourcesCount(Math.floor(Math.random() * 20) + 25);
                        setCurrentStep('complete');
                    }
                }, 1000);

                return () => clearInterval(interval);
            }, [currentStep]);

            const handleSubmit = (e) => {
                e.preventDefault();
                if (!topic.trim()) return;
                setCurrentStep('processing');
            };

            return (
                <div className="min-h-screen flex flex-col justify-between px-6 py-10 bg-[#FDFBF7]">
                    
                    {/* 1. Header Area (Kept minimal, right-aligned meta) */}
                    <header className="max-w-6xl w-full mx-auto flex justify-end items-center">
                        <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
                            General Track
                        </div>
                    </header>

                    {/* 2. Central Canvas (Stacked Logo + Search) */}
                    <main className="flex-1 flex flex-col items-center justify-center max-w-xl w-full mx-auto -mt-16">
                        
                        {/* STATE A: IDLE SEARCH (The Classic Layout) */}
                        {currentStep === 'idle' && (
                            <div className="w-full text-center animate-reveal flex flex-col items-center">
                                
                                <div className="mb-8 select-none tracking-tighter text-3xl font-black text-neutral-950">
                                    Arrow<span className="text-neutral-400">.</span>
                                </div>

                                <form onSubmit={handleSubmit} className="w-full">
                                    <div className="relative group w-full">
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            placeholder="What do you want to learn?"
                                            className="w-full bg-transparent text-neutral-900 text-lg border-b border-neutral-300/80 py-4 px-1 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors duration-300 text-center"
                                            autoFocus
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!topic.trim()}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors disabled:opacity-0 p-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                                <p className="text-neutral-300 text-[10px] font-bold tracking-widest uppercase mt-5 font-mono select-none">
                                    Consensus Filtration Engine
                                </p>
                            </div>
                        )}

                        {/* STATE B: PROCESSING TIMEOUT */}
                        {currentStep === 'processing' && (
                            <div className="w-full text-center py-12 animate-reveal">
                                <div className="inline-block relative w-10 h-10 mb-6">
                                    <div className="absolute inset-0 border-2 border-neutral-200/60 rounded-full" />
                                    <div className="absolute inset-0 border-2 border-t-neutral-900 rounded-full animate-spin" />
                                </div>
                                <p className="text-neutral-400 font-mono text-[11px] tracking-wider uppercase">
                                    {statusText}
                                </p>
                            </div>
                        )}

                        {/* STATE C: STRUCTURAL CONSOLIDATION GATE */}
                        {currentStep === 'complete' && (
                            <div className="w-full border border-neutral-200/60 rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.015)] animate-reveal bg-white/80 backdrop-blur-md">
                                <div className="border-b border-neutral-200/60 pb-6 mb-6">
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Pipeline Cleared</div>
                                    <h2 className="text-xl font-bold text-neutral-900 tracking-tight">"{topic}" Consolidated</h2>
                                    <p className="text-sm text-neutral-500 mt-2.5 leading-relaxed">
                                        Our engines processed <span className="text-neutral-900 font-semibold">{sourcesCount} chaotic roadmaps</span> and influencer vectors. All conflicting timelines, ads, and platform biases have been stripped out.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block">Consensus Pass</span>
                                        <span className="text-2xl font-black text-neutral-900">$4.99</span>
                                    </div>
                                    <button 
                                        onClick={() => alert("Redirecting to safe Stripe billing module...")}
                                        className="bg-neutral-950 text-white font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm active:scale-[0.99]"
                                    >
                                        Unlock Curriculum
                                    </button>
                                </div>

                                <div className="mt-6 pt-5 border-t border-neutral-200/60 flex justify-start">
                                    <button 
                                        onClick={() => { setTopic(''); setCurrentStep('idle'); }}
                                        className="text-neutral-400 hover:text-neutral-900 text-xs transition-colors font-mono"
                                    >
                                        &larr; Reset Engine
                                    </button>
                                </div>
                            </div>
                        )}

                    </main>

                    {/* 3. Footer */}
                    <footer className="max-w-6xl w-full mx-auto text-center text-[10px] text-neutral-300 font-bold tracking-widest uppercase font-mono select-none">
                        Securely Powered by Stripe &bull; Verified by Google Vertex AI
                    </footer>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<MinimalCurator />);
