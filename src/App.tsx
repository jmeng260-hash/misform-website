/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { useEffect, useState, useRef, useMemo } from "react";

const LOGO_CHARS = [
  { char: "M", initial: { x: 16, y: -32, rotate: -12 } },
  { char: "I", initial: { x: -12, y: 40, scaleY: 1.32 } },
  { char: "S", initial: { x: 28, y: 0, rotate: 20 } },
  { char: "F", initial: { x: -16, y: -28 }, style: { fontWeight: 300 } },
  { char: "O", initial: { x: 12, y: 16, skewX: -16 } },
  { char: "R", initial: { x: -28, y: 36 } },
  { char: "M", initial: { x: 0, y: -12 } },
];

const PuzzlePiece = ({ src, row, col, rows, cols, isReadyToAssemble }: { src: string, row: number, col: number, rows: number, cols: number, isReadyToAssemble: boolean, key?: string | number }) => {
  const randomX = useMemo(() => (Math.random() - 0.5) * 400, []);
  const randomY = useMemo(() => (Math.random() - 0.5) * 400, []);
  const randomRot = useMemo(() => (Math.random() - 0.5) * 90, []);
  const randomDelay = useMemo(() => Math.random() * 0.2, []);

  return (
    <motion.div
      initial={false}
      animate={{
        x: isReadyToAssemble ? 0 : randomX,
        y: isReadyToAssemble ? 0 : randomY,
        rotateZ: isReadyToAssemble ? 0 : randomRot,
        opacity: isReadyToAssemble ? 1 : 0.3,
        scale: isReadyToAssemble ? 1 : 0.6,
      }}
      transition={{
        duration: isReadyToAssemble ? 1.2 : 2,
        ease: [0.16, 1, 0.3, 1],
        delay: isReadyToAssemble ? randomDelay : 0,
      }}
      className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] transition-transform duration-200"
      style={{
         position: 'absolute',
         width: `${100 / cols}%`,
         height: `${100 / rows}%`,
         left: `${(col / cols) * 100}%`,
         top: `${(row / rows) * 100}%`,
         backgroundImage: `url(${src})`,
         backgroundSize: `${cols * 100}% ${rows * 100}%`,
         backgroundPosition: `${(col / (cols - 1 || 1)) * 100}% ${(row / (rows - 1 || 1)) * 100}%`,
         backgroundRepeat: 'no-repeat'
      }}
    />
  );
}

const PuzzleImage = ({ src }: { src: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rows = 5;
  const cols = 5;
  
  return (
    <div 
      className="relative w-full max-w-[550px] mx-auto cursor-crosshair transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1500 }}
    >
      <img src={src} className="w-full h-auto opacity-0" alt="" />
      <div className="absolute inset-0">
         {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            return <PuzzlePiece key={i} src={src} row={row} col={col} rows={rows} cols={cols} isReadyToAssemble={isHovered} />
         })}
      </div>
    </div>
  )
}

const MindMapNode = ({ title, items, position, delay }: { title: string, items: string[], position: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute flex flex-col gap-2 group ${position}`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-[#ff1e00] flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
        <h5 className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.2em] uppercase whitespace-nowrap group-hover:text-[#ff1e00] transition-colors">{title}</h5>
      </div>
      <ul className="flex flex-col gap-1 pl-3.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        {items.map((item, idx) => (
          <li key={idx} className="text-[0.65rem] font-mono tracking-wider lowercase">
            - {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

const ResearchMindMaps = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white/50 py-16 px-4 md:px-12 selection:bg-[#ff1e00] selection:text-white border border-black/5 mt-8">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] overflow-hidden select-none">
        <div className="text-[30vw] font-bold tracking-tighter leading-none mx-[-20%]">MISFORM</div>
      </div>

      <div className="flex flex-col items-center mb-16 relative z-10 w-full text-center">
        <motion.h4 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-[2rem] md:text-[3rem] font-medium tracking-tighter"
        >
          RESEARCH MIND MAPS
        </motion.h4>
        <motion.p
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-[0.6rem] md:text-[0.8rem] text-black/40 tracking-[0.3em] uppercase mt-2"
        >
          Erato Muse Research / Judy Muse Research
        </motion.p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 lg:gap-8 xl:gap-16 items-center justify-center relative z-10 w-full max-w-[1600px] mx-auto">
        
        {/* ERATO Panel */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full xl:w-1/2 h-[700px] border border-black/5 bg-white/40 backdrop-blur-sm group overflow-hidden"
        >
           {/* SVG Connecting lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }} x1="50%" y1="50%" x2="20%" y2="15%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} x1="50%" y1="50%" x2="80%" y2="20%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }} x1="50%" y1="50%" x2="10%" y2="50%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} x1="50%" y1="50%" x2="90%" y2="60%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.6 }} x1="50%" y1="50%" x2="30%" y2="85%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.7 }} x1="50%" y1="50%" x2="75%" y2="80%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
           </svg>

           {/* Center Node */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-white/90 p-5 border border-black/10 z-20 shadow-sm transition-colors group-hover:border-[#ff1e00]/30 min-w-[120px]">
              <div className="w-2 h-2 bg-[#ff1e00] mb-3 group-hover:rotate-45 transition-transform duration-500" />
              <h2 className="text-xl font-bold tracking-widest uppercase">ERATO</h2>
           </div>

           {/* Nodes */}
           <div style={{ position: 'absolute', top: '12%', left: '5%'}} className="hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300">
             <MindMapNode title="IDENTITY" items={['emotional writing', 'romantic expression', 'poetic expression']} position="" delay={0.2} />
           </div>
           <div style={{ position: 'absolute', top: '15%', left: '65%'}} className="hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-300">
             <MindMapNode title="LOVE / POETRY" items={['love poetry', 'lyric poetry', 'emotional storytelling']} position="" delay={0.3} />
           </div>
           <div style={{ position: 'absolute', top: '45%', left: '5%'}} className="hover:translate-x-2 transition-transform duration-300">
             <MindMapNode title="NAME MEANING" items={['ERATO → EROS', 'passion & desire']} position="" delay={0.4} />
           </div>
           <div style={{ position: 'absolute', top: '55%', left: '70%'}} className="hover:-translate-x-2 transition-transform duration-300">
             <MindMapNode title="FAMILY BACKGROUND" items={['Zeus', 'Mnemosyne']} position="" delay={0.5} />
           </div>
           <div style={{ position: 'absolute', top: '80%', left: '15%'}} className="hover:translate-y-1 hover:translate-x-1 transition-transform duration-300">
             <MindMapNode title="ROLE AMONG MUSES" items={['muse of love poetry']} position="" delay={0.6} />
           </div>
           <div style={{ position: 'absolute', top: '75%', left: '60%'}} className="hover:translate-y-1 hover:-translate-x-1 transition-transform duration-300">
             <MindMapNode title="PERSONAL EXPRESSION" items={['intimate', 'language']} position="" delay={0.7} />
           </div>
        </motion.div>

        {/* JUDY Panel */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full xl:w-1/2 h-[700px] border border-black/5 bg-white/40 backdrop-blur-sm group overflow-hidden"
        >
           {/* SVG Connecting lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} x1="50%" y1="50%" x2="20%" y2="12%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }} x1="50%" y1="50%" x2="70%" y2="15%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} x1="50%" y1="50%" x2="10%" y2="35%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.6 }} x1="50%" y1="50%" x2="85%" y2="45%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.7 }} x1="50%" y1="50%" x2="25%" y2="80%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.8 }} x1="50%" y1="50%" x2="80%" y2="75%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
             <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.9 }} x1="50%" y1="50%" x2="50%" y2="88%" stroke="currentColor" className="text-black/10 transition-colors duration-300 group-hover:text-black/30" strokeWidth="1" />
           </svg>

           {/* Center Node */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-white/90 p-5 border border-black/10 z-20 shadow-sm transition-colors group-hover:border-[#ff1e00]/30 min-w-[120px]">
              <div className="w-2 h-2 bg-[#ff1e00] mb-3 group-hover:rotate-45 transition-transform duration-500" />
              <h2 className="text-xl font-bold tracking-widest uppercase">JUDY</h2>
           </div>

           {/* Nodes */}
           <div style={{ position: 'absolute', top: '10%', left: '5%'}} className="hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300">
             <MindMapNode title="AESTHETIC" items={['dark tones', 'relaxed attitude', 'edgy character']} position="" delay={0.3} />
           </div>
           <div style={{ position: 'absolute', top: '12%', left: '60%'}} className="hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-300">
             <MindMapNode title="KEY SILHOUETTES" items={['loose tailoring', 'raw edges', 'deconstructed']} position="" delay={0.4} />
           </div>
           <div style={{ position: 'absolute', top: '32%', left: '2%'}} className="hover:translate-x-2 transition-transform duration-300">
             <MindMapNode title="CORE BELIEFS" items={['independent', 'romantic observer']} position="" delay={0.5} />
           </div>
           <div style={{ position: 'absolute', top: '42%', left: '65%'}} className="hover:-translate-x-2 transition-transform duration-300">
             <MindMapNode title="BODY & RELATIONSHIP" items={['confidence', 'ease of movement']} position="" delay={0.6} />
           </div>
           <div style={{ position: 'absolute', top: '75%', left: '8%'}} className="hover:translate-y-1 hover:translate-x-1 transition-transform duration-300">
             <MindMapNode title="WARDROBE STRUCTURE" items={['small, versatile', 'cross-context']} position="" delay={0.7} />
           </div>
           <div style={{ position: 'absolute', top: '70%', left: '60%'}} className="hover:translate-y-1 hover:-translate-x-1 transition-transform duration-300">
             <MindMapNode title="SPACE & CONTEXT" items={['city at night', 'waterfronts']} position="" delay={0.8} />
           </div>
           <div style={{ position: 'absolute', top: '83%', left: '35%'}} className="hover:translate-y-2 transition-transform duration-300">
             <MindMapNode title="ERATO CONNECTION" items={['modern muse', 'lyrical presence']} position="" delay={0.9} />
           </div>
        </motion.div>

      </div>
    </div>
  )
}

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const relX = useMotionValue(0);
  const relY = useMotionValue(0);

  const [view, setView] = useState<'home' | 'collection'>('home');
  const [activeSubtitle, setActiveSubtitle] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [activeResearchTab, setActiveResearchTab] = useState<number>(0);
  const [activeConceptTab, setActiveConceptTab] = useState<number>(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const springRelX = useSpring(relX, { stiffness: 100, damping: 30 });
  const springRelY = useSpring(relY, { stiffness: 100, damping: 30 });

  const maskImage = useMotionTemplate`radial-gradient(circle 160px at ${springRelX}px ${springRelY}px, black 0%, black 40%, transparent 70%)`;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        relX.set(e.clientX - rect.left);
        relY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-[#f2f2f2] font-sans text-[#111111] antialiased">
      {/* Background Noise/Grain */}
      <div className={`grain transition-opacity duration-1000 ${view === 'collection' ? 'grain-collection' : ''}`} />

      {/* Inversion Brush */}
      <motion.div 
        className="inversion-brush fixed rounded-full z-[90]"
        animate={{ 
          width: view === 'collection' ? 60 : 300,
          height: view === 'collection' ? 60 : 300,
          filter: view === 'collection' ? 'blur(12px)' : 'blur(40px)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-7 left-8 right-8 z-[110] flex justify-between items-center text-[0.74rem] tracking-[0.14em] uppercase text-black/60 mix-blend-difference">
        <motion.button 
          onClick={() => setView('home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-white cursor-pointer"
        >
          MISFORM
        </motion.button>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-7 text-white items-center"
        >
          <button 
            onClick={() => setView('collection')}
            className={`transition-opacity cursor-pointer ${view === 'collection' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            Collection
          </button>
          <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Contact</a>
        </motion.div>
      </nav>

      {/* Floating Background Text */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden isolate">
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: [0.58, 0.38, 0.25][i], scale: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
            className="glass-word-animation absolute font-black tracking-[-0.12em] text-transparent mix-blend-screen whitespace-nowrap"
            style={{ 
              top: ["8%", "65%", "42%"][i],
              left: ["-8%", "75%", "14%"][i],
              rotate: ["-6deg", "7deg", "2deg"][i],
              scale: [1, 0.9, 0.75][i],
              fontSize: "clamp(8rem, 18vw, 22rem)",
              animationDelay: `${i * -4}s`,
              WebkitTextStroke: "1px rgba(255,255,255,0.62)",
              textShadow: "0 0 18px rgba(255,255,255,0.65), 0 28px 60px rgba(0,0,0,0.16)",
              filter: "url(#floatingGlassDistortion)"
            }}
          >
            MISFORM
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        {view === 'home' ? (
          <>
            {/* Hero Section */}
            <main className="relative flex flex-col items-center pt-[20vh] pb-[10vh]">
        <section className="flex flex-col items-center text-center w-full max-w-[1280px] px-14">
          <div className="relative mb-12" ref={containerRef}>
            {/* Base Layer: Dark Distorted Text */}
            <motion.div 
              className="flex justify-center items-center cursor-crosshair select-none relative z-10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial="initial"
              animate="animate"
              style={{ filter: "url(#organicDistortion)" }}
            >
              {LOGO_CHARS.map((item, idx) => (
                <motion.span
                  key={`base-${item.char}-${idx}`}
                  variants={{
                    initial: item.initial,
                    animate: isHovered ? { x: 0, y: 0, rotate: 0, scaleY: 1, skewX: 0 } : item.initial
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    mass: 1,
                    delay: isHovered ? 0 : idx * 0.05
                  }}
                  className="inline-block text-[clamp(4.8rem,14vw,16rem)] font-black leading-[0.8] relative"
                  style={{
                    ...item.style,
                    color: "rgba(210, 210, 210, 0.85)",
                    opacity: 0.9,
                    filter: "blur(0.5px) contrast(1.1)",
                    WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.25)",
                    textShadow: "0 0 6px rgba(255, 255, 255, 0.25), 0 0 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {item.char}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlight Layer: Calmer Revealed Text (No Glow) */}
            <motion.div 
              className="flex justify-center items-center cursor-crosshair select-none absolute inset-0 z-[100] pointer-events-none"
              initial="initial"
              animate="animate"
              style={{ 
                maskImage: maskImage,
                WebkitMaskImage: maskImage,
                backgroundColor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
                border: "none",
                overflow: "visible"
              }}
            >
              {LOGO_CHARS.map((item, idx) => (
                <motion.span
                  key={`reveal-${item.char}-${idx}`}
                  variants={{
                    initial: item.initial,
                    animate: isHovered ? { x: 0, y: 0, rotate: 0, scaleY: 1, skewX: 0 } : item.initial
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    mass: 1,
                    delay: isHovered ? 0 : idx * 0.05
                  }}
                  className="inline-block text-[clamp(4.8rem,14vw,16rem)] font-black leading-[0.8] relative"
                  style={{
                    ...item.style,
                    color: "rgba(210, 210, 210, 0.85)",
                    opacity: 1,
                    filter: "url(#calmDistortion) blur(0.2px) contrast(1.1)",
                    WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.25)",
                    textShadow: "0 0 6px rgba(255, 255, 255, 0.25), 0 0 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {item.char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="max-w-[500px] text-[1.1rem] leading-[1.6] tracking-[-0.01em] text-black/80">
              A visual system built from distortion, softness, and controlled misalignment. Embracing the beauty of the broken form.
            </p>
            <motion.div 
              className="w-[1px] h-32 bg-black/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </section>

   
      </main>
        </>
      ) : (
          <main className="relative flex flex-col items-center pt-[25vh] pb-[10vh] px-8 min-h-screen">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="w-full max-w-[800px] flex flex-col gap-16"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-[0.7rem] tracking-[0.4em] uppercase opacity-40">Collections Archive</h2>
                <div className="w-12 h-[1px] bg-black/20" />
              </div>

              <div className="flex flex-col gap-12">
                {[1, 2].map((num) => (
                  <div key={num} className="border-b border-black/5 pb-12">
                    <button 
                      onClick={() => {
                        setActiveSubtitle(activeSubtitle === num ? null : num);
                        setActivePhase(null); // Reset nested phase when switching main collections
                      }}
                      className="w-full flex justify-between items-end group cursor-pointer"
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="text-[0.8rem] opacity-30 font-mono tracking-tighter">
                          {num.toString().padStart(2, '0')}
                        </span>
                        <h3 className={`text-[3.5rem] font-black tracking-tight leading-none transition-all ${activeSubtitle === num ? "opacity-100 scale-105 origin-left" : "opacity-60 group-hover:opacity-80"}`}>
                          {num === 1 ? "INTIMACY" : "UNFASTENED"}
                        </h3>
                      </div>
                      <motion.div 
                        initial={false}
                        animate={{ rotate: activeSubtitle === num ? 45 : 0 }}
                        className="text-2xl font-light opacity-20 group-hover:opacity-100"
                      >
                        +
                      </motion.div>
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ 
                        height: activeSubtitle === num ? "auto" : 0, 
                        opacity: activeSubtitle === num ? 1 : 0,
                        transitionEnd: { overflow: activeSubtitle === num ? "visible" : "hidden" }
                      }}
                    >
                      <div className="pt-12 flex flex-col gap-8">
                        {num === 1 ? (
                          <div className="flex flex-col gap-6">
                            {[
                              "Research & Inspiration",
                              "Concept Development",
                              "Fashion Plates",
                              "Final Illustration"
                            ].map((phase, pIdx) => (
                              <div key={pIdx} className="flex flex-col gap-4">
                                <button 
                                  onClick={() => setActivePhase(activePhase === pIdx ? null : pIdx)}
                                  className="flex items-center gap-4 group cursor-pointer hover:pl-2 transition-all"
                                >
                                  <span className="text-[0.6rem] font-mono opacity-40">{pIdx + 1}.</span>
                                  <span className={`text-[0.9rem] tracking-widest uppercase transition-opacity ${activePhase === pIdx ? "opacity-100 font-bold" : "opacity-50 group-hover:opacity-80"}`}>
                                    {phase}
                                  </span>
                                </button>
                                
                                <motion.div
                                  initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                                  animate={{ 
                                    height: activePhase === pIdx ? "auto" : 0, 
                                    opacity: activePhase === pIdx ? 1 : 0,
                                    transitionEnd: { overflow: activePhase === pIdx ? "visible" : "hidden" }
                                  }}
                                >
                                  {pIdx === 0 ? (
                                    <div className="pl-4 md:pl-12 pb-32 max-w-[1500px]">
                                      {/* Sub-tabs for Research & Inspiration */}
                                      <div className="flex flex-wrap gap-8 md:gap-16 border-b border-black/10 mb-12 md:mb-20">
                                        {['Muse Research', '"MUSE" JUDY'].map((tab, tIdx) => (
                                          <button 
                                            key={tIdx}
                                            onClick={() => setActiveResearchTab(tIdx)}
                                            className={`pb-4 text-[0.7rem] md:text-[0.8rem] tracking-[0.2em] uppercase font-bold relative transition-colors ${activeResearchTab === tIdx ? 'text-black' : 'text-black/30 hover:text-black/60'}`}
                                          >
                                            {tab}
                                            {activeResearchTab === tIdx && (
                                              <motion.div layoutId="researchTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff1e00]" />
                                            )}
                                          </button>
                                        ))}
                                      </div>

                                      <motion.div
                                        key={activeResearchTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        {activeResearchTab === 0 && (
                                          <div className="flex flex-col">
                                            
                                            {/* TOP ALIGNED: Header Section */}
                                            <div className="flex flex-col gap-6 pt-0 lg:pt-8 text-center items-center mb-8 lg:mb-16">
                                              <motion.h4 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-[3.5rem] md:text-[4.5rem] font-medium tracking-tighter text-black leading-[0.95]"
                                              >
                                                Muse Research<span className="block text-[0.8rem] tracking-[0.4em] uppercase opacity-40 mt-6">Section_001.Erato</span>
                                              </motion.h4>
                                              
                                              <div className="text-[1.1rem] leading-relaxed text-black/60 max-w-[700px] font-light mt-4">
                                                <p>Erato represents artistic inspiration connected to love and lyrical expression, especially in poetry and music. Her name derives from the Greek word “Eros,” meaning romantic love or desire.</p>
                                              </div>
                                            </div>

                                            {/* MIDDLE: Floating Artistic Asset */}
                                            <div className="relative flex flex-col items-center justify-center mb-4 [perspective:1500px]">
                                              <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: 100, filter: "blur(20px)" }}
                                                whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                                className="relative w-full flex flex-col items-center group"
                                              >
                                                {/* Subsurface Glow Effect */}
                                                <motion.div 
                                                  className="absolute inset-x-[-20%] inset-y-[-10%] bg-black/[0.03] blur-[120px] -z-10 rounded-full"
                                                  whileHover={{ scale: 1.2, opacity: 0.8 }}
                                                  transition={{ duration: 0.8 }}
                                                />
                                                
                                                <PuzzleImage src="https://raw.githubusercontent.com/jmeng260-hash/Erato/916fa36fa33d61f12d538446e526eeed62a01637/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2038.png" />
                                                
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  whileInView={{ opacity: 1 }}
                                                  transition={{ delay: 1, duration: 1 }}
                                                  className="mt-0 flex flex-col gap-2 items-center"
                                                >
                                                  <div className="text-center">
                                                    <p className="text-[0.65rem] tracking-[0.5em] font-mono opacity-20 uppercase transition-opacity duration-300 group-hover:opacity-60">Scale_Asset: ERATO_HIGH_RES.001</p>
                                                  </div>
                                                </motion.div>
                                              </motion.div>
                                            </div>

                                            {/* BOTTOM ROW: 3 SECTIONS */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start mt-0 md:mt-4 lg:mt-8">
                                              {/* Domain & Artistic Role */}
                                              <div className="flex flex-col gap-5">
                                                <div className="flex items-center gap-4">
                                                  <div className="w-4 h-4 bg-[#ff1e00] flex-shrink-0" />
                                                  <p className="font-bold text-[1.1rem] uppercase tracking-tighter">Domain & Artistic Role</p>
                                                </div>
                                                <div className="text-[1rem] text-black/80 leading-relaxed">
                                                  <p className="mb-4">As the primary muse of lyrical expression, Erato governs the emotional translation of human experience into sound and rhythm.</p>
                                                  <ul className="flex flex-col gap-3">
                                                    <li className="flex gap-4 items-baseline"><span className="w-1.5 h-1.5 rounded-full bg-black/10 flex-shrink-0" /> Love and Erotic Poetry</li>
                                                    <li className="flex gap-4 items-baseline"><span className="w-1.5 h-1.5 rounded-full bg-black/10 flex-shrink-0" /> Lyrical Composition</li>
                                                    <li className="flex gap-4 items-baseline"><span className="w-1.5 h-1.5 rounded-full bg-black/10 flex-shrink-0" /> Emotional Architecture</li>
                                                  </ul>
                                                </div>
                                              </div>

                                              {/* Personality */}
                                              <div className="flex flex-col gap-5">
                                                <div className="flex items-center gap-4">
                                                  <div className="w-4 h-4 bg-[#ff1e00] flex-shrink-0" />
                                                  <p className="font-bold text-[1.1rem] uppercase tracking-tighter">Identity Spectrum</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                  {['Romantic Sensitivity', 'Emotional Awareness', 'Grace & Resonance', 'Creative Intuition'].map((item) => (
                                                    <div key={item} className="p-3 border border-black/5 bg-black/[0.02] text-[0.8rem] uppercase tracking-widest font-medium text-black/60">
                                                      {item}
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>

                                              {/* Symbols */}
                                              <div className="flex flex-col gap-5">
                                                <div className="flex items-center gap-4">
                                                  <div className="w-4 h-4 bg-[#ff1e00] flex-shrink-0" />
                                                  <p className="font-bold text-[1.1rem] uppercase tracking-tighter">Iconography</p>
                                                </div>
                                                <div className="space-y-6">
                                                  <div className="flex flex-col gap-1">
                                                    <span className="text-[0.65rem] tracking-[0.3em] font-bold text-[#ff1e00]">INSTRUMENT</span>
                                                    <p className="text-[0.95rem] text-black/80">The **Lyre or Kithara** – The bridge between thought and audible emotion.</p>
                                                  </div>
                                                  <div className="flex flex-col gap-1">
                                                    <span className="text-[0.65rem] tracking-[0.3em] font-bold text-[#ff1e00]">FLORA</span>
                                                    <p className="text-[0.95rem] text-black/80">**Myrtle & Roses** – Representing the temporal beauty and endurance of romance.</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        )}

                                        {activeResearchTab === 1 && (
                                          <div className="relative flex flex-col gap-16 md:gap-24 items-center py-16">
                                            {/* Soft Romantic Ambient Glow Behind */}
                                            <motion.div 
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                              className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-rose-200/30 rounded-full blur-[100px] -z-10 mix-blend-multiply"
                                              style={{ transform: "translate(-50%, -50%)" }}
                                            />

                                            {/* Image Section - Above Text */}
                                            <div className="w-full max-w-[800px] flex-shrink-0 relative group [perspective:1000px]">
                                              {/* Floating Frame */}
                                              <motion.div 
                                                initial={{ opacity: 0, y: 40, filter: "blur(20px)", rotateX: 10 }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
                                                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                                className="relative overflow-hidden rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-white p-3 md:p-4"
                                              >
                                                <div className="relative overflow-hidden cursor-crosshair">
                                                  {/* Slow subtle breathe on the image itself */}
                                                  <motion.img 
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                    whileHover={{ scale: 1.08, filter: "brightness(1.05) contrast(1.05)" }}
                                                    src="https://raw.githubusercontent.com/jmeng260-hash/Muse/7c1a42235d4f205fe772f95b4b7a57504d5cdb3a/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2086.jpg"
                                                    alt="Muse Judy"
                                                    className="w-full h-[50vh] md:h-[65vh] object-cover transition-all duration-[2s] ease-out object-top"
                                                    referrerPolicy="no-referrer"
                                                  />
                                                  {/* Overlay shimmer effect on hover */}
                                                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/0 via-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay pointer-events-none" />
                                                </div>
                                              </motion.div>
                                              
                                              {/* Decorative Asset Tag */}
                                              <motion.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2, duration: 1 }}
                                                className="absolute -bottom-6 -right-6 md:-right-12 rotate-[-90deg] origin-bottom-left"
                                              >
                                                <p className="text-[0.55rem] tracking-[0.4em] font-mono text-black/30 uppercase">Fig_01. Observing</p>
                                              </motion.div>
                                            </div>

                                            {/* Text Section - Horizontal Layout */}
                                            <motion.div 
                                              initial="hidden"
                                              animate="visible"
                                              variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                  opacity: 1,
                                                  transition: { staggerChildren: 0.3, delayChildren: 0.5 }
                                                }
                                              }}
                                              className="w-full flex flex-col gap-12 text-[1rem] leading-relaxed text-black/70 font-light relative z-10"
                                            >
                                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                                                {[
                                                  "My muse is someone who enjoys observing the world around her. She is naturally drawn to places with beautiful scenery and strong atmosphere, such as waterfronts, forests, quiet streets, or cities at night.",
                                                  "Her personal style reflects a balance between softness and attitude. She often wears darker tones and pieces with a cool, slightly edgy character, while still keeping her outfits relaxed and effortless. When she goes out, she enjoys adding accessories and styling details that give her look a stronger personality",
                                                  "She also has a romantic way of experiencing everyday life. Rather than depending on someone else, she finds romance in moments and atmosphere around her. Whether watching a sunset at an amusement park or sitting alone at night with music and a beautiful view outside the window, she appreciates quiet and emotional details that many people might overlook."
                                                ].map((text, i) => (
                                                  <motion.div 
                                                    key={i}
                                                    variants={{
                                                      hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                                                      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                                                    }}
                                                    className="flex flex-col gap-4"
                                                  >
                                                    <div className="text-[0.65rem] tracking-[0.3em] font-mono text-black/30 uppercase border-b border-black/10 pb-2 mb-2">Part 0{i + 1}</div>
                                                    <p>{text}</p>
                                                  </motion.div>
                                                ))}
                                              </div>
                                              
                                              {/* Conclusion Paragraph */}
                                              <motion.div 
                                                variants={{
                                                  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                                                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                                                }}
                                                className="max-w-[800px] mx-auto text-center flex flex-col items-center mt-4 border-t border-black/10 pt-10 px-4"
                                              >
                                                <motion.div
                                                  variants={{
                                                      hidden: { opacity: 0, scaleY: 0 },
                                                      visible: { opacity: 1, scaleY: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
                                                  }}
                                                  className="w-[1px] h-8 bg-[#ff1e00]/30 mb-6 origin-top"
                                                />
                                                <p className="font-normal text-black/90 text-[1.1rem]">
                                                  This perspective connects to the spirit of Erato, the Greek muse associated with love and lyrical expression. Similar to Erato, she experiences romance through atmosphere, observation, and emotional sensitivity to everyday moments.
                                                </p>
                                              </motion.div>
                                            </motion.div>
                                          </div>
                                        )}
                                      </motion.div>
                                    </div>
                                  ) : pIdx === 1 ? (
                                    <div className="pl-4 md:pl-12 pb-32 max-w-[1500px]">
                                      {/* Sub-tabs for Concept Development */}
                                      <div className="flex overflow-x-auto flex-nowrap gap-8 md:gap-12 lg:gap-16 border-b border-black/10 mb-12 md:mb-20 pb-1 scrollbar-hide w-full">
                                        {['Mind Map', 'Target Customer', 'Color Story', 'Fabric & Manipulation'].map((tab, tIdx) => (
                                          <button 
                                            key={tIdx}
                                            onClick={() => setActiveConceptTab(tIdx)}
                                            className={`pb-3 whitespace-nowrap text-[0.65rem] md:text-[0.8rem] tracking-[0.2em] uppercase font-bold relative transition-colors ${activeConceptTab === tIdx ? 'text-black' : 'text-black/30 hover:text-black/60'}`}
                                          >
                                            {tab}
                                            {activeConceptTab === tIdx && (
                                              <motion.div layoutId="conceptTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff1e00]" />
                                            )}
                                          </button>
                                        ))}
                                      </div>

                                      <motion.div
                                        key={activeConceptTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        {activeConceptTab === 0 && (
                                          <ResearchMindMaps />
                                        )}
                                        {activeConceptTab === 1 && (
                                          <div className="relative flex flex-col gap-16 md:gap-24 items-center py-16">
                                            {/* Image Section - Above Text */}
                                            <div className="w-full max-w-[900px] flex-shrink-0 relative group">
                                              {/* MISFORM animated and blended frame */}
                                              <motion.div 
                                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                                className="relative w-full"
                                              >
                                                <div 
                                                  className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center overflow-hidden"
                                                  style={{
                                                    maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
                                                    WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
                                                  }}
                                                >
                                                  {/* Subtle Noise overlay */}
                                                  <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
                                                  
                                                  <motion.img 
                                                    whileHover={{ scale: 1.03, filter: "brightness(0.95) contrast(1.2) sepia(0.2) hue-rotate(-10deg)" }}
                                                    src="https://raw.githubusercontent.com/jmeng260-hash/target-customer/e203d7b839784aad37946eede12ebe557e43629a/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2039.png"
                                                    alt="Target Customer"
                                                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-out object-center mix-blend-multiply opacity-90 group-hover:opacity-100"
                                                    referrerPolicy="no-referrer"
                                                  />
                                                  
                                                  {/* MISFORM Glitch Scanning Effect */}
                                                  <motion.div 
                                                    initial={{ top: "-10%", opacity: 0 }}
                                                    animate={{ top: "110%", opacity: [0, 1, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
                                                    className="absolute left-0 w-full h-[2px] bg-[#ff1e00]/50 blur-[1px] pointer-events-none z-20"
                                                  />
                                                  <motion.div 
                                                    initial={{ top: "-10%" }}
                                                    animate={{ top: "110%" }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                                    className="absolute left-0 w-full h-[20vh] bg-gradient-to-b from-transparent via-[#ff1e00]/5 to-transparent pointer-events-none z-10 mix-blend-color-burn"
                                                  />
                                                </div>
                                              </motion.div>
                                            </div>

                                            {/* Text Section - Horizontal Layout */}
                                            <motion.div 
                                              initial="hidden"
                                              animate="visible"
                                              variants={{
                                                hidden: { opacity: 0 },
                                                visible: { 
                                                  opacity: 1, 
                                                  transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                                                }
                                              }}
                                              className="w-full relative z-10"
                                            >
                                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-[0.9rem] leading-relaxed text-black/70 font-light">
                                                
                                                {/* WHO Section */}
                                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="flex flex-col gap-4">
                                                  <h4 className="text-[0.65rem] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-2">WHO</h4>
                                                  <ul className="flex flex-col gap-3">
                                                    <li><strong className="font-medium text-black/80">Age:</strong><br/>18–25</li>
                                                    <li><strong className="font-medium text-black/80">Gender:</strong><br/>All gender / gender-inclusive</li>
                                                    <li><strong className="font-medium text-black/80">Occupation:</strong><br/>Creative students or individuals working in artistic or flexible environments without strict dress codes, such as designers, photographers, musicians, artists, or freelancers.</li>
                                                    <li><strong className="font-medium text-black/80">Income Level:</strong><br/>Limited but stable personal budget</li>
                                                  </ul>
                                                </motion.div>

                                                {/* WHERE Section */}
                                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="flex flex-col gap-4">
                                                  <h4 className="text-[0.65rem] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-2">WHERE</h4>
                                                  <ul className="flex flex-col gap-3">
                                                    <li><strong className="font-medium text-black/80">City:</strong><br/>New York City</li>
                                                    <li><strong className="font-medium text-black/80">Primary Areas:</strong><br/>Lower East Side, Williamsburg, Bushwick, SoHo, and Downtown Brooklyn</li>
                                                    <li><strong className="font-medium text-black/80">Living Environment:</strong><br/>Shared apartments, dorms, or small studio spaces</li>
                                                  </ul>
                                                </motion.div>

                                                {/* WHY Section */}
                                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="flex flex-col gap-4">
                                                  <h4 className="text-[0.65rem] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-2">WHY</h4>
                                                  <div className="flex flex-col gap-3">
                                                    <p>Target customers are less concerned with maintaining a perfect or polished appearance and more interested in garments that feel natural and personal.</p>
                                                    <p>They tend to appreciate clothing that ages with them over time. Slight wear, fading, or marks are not seen as flaws but as traces of experience and daily life. These subtle changes make the garment feel more personal and lived-in.</p>
                                                  </div>
                                                </motion.div>

                                                {/* HOW Section */}
                                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="flex flex-col gap-4">
                                                  <h4 className="text-[0.65rem] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-2">HOW</h4>
                                                  <div className="flex flex-col gap-3">
                                                    <p>This group tends to maintain a small wardrobe and repeatedly wear the same garments in different contexts. Their clothing must move easily between multiple situations throughout the day.</p>
                                                    <div>
                                                      <span className="block mb-2 font-medium text-black/80">Typical activities include:</span>
                                                      <ul className="list-disc pl-4 flex flex-col gap-2">
                                                        <li>working in studios or creative spaces</li>
                                                        <li>socializing in bars or casual nightlife settings</li>
                                                        <li>attending informal gatherings or entertainment spaces</li>
                                                        <li>outdoor leisure activities such as parks or camping</li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              </div>
                                            </motion.div>
                                          </div>
                                        )}
                                        {activeConceptTab === 2 && (
                                          <div className="relative w-full min-h-[90vh] md:min-h-[100vh] flex items-center justify-center py-12 md:py-20 group cursor-crosshair mt-8 md:mt-12">
                                            
                                            {/* Border Container (Visible, but doesn't trap text) */}
                                            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border border-black/5 z-[1] pointer-events-none transition-all duration-1000 group-hover:bg-white/40" />

                                            {/* Decorative Thread Lines (MISFORM blood line concept) */}
                                            <div className="absolute inset-0 pointer-events-none z-[2]">
                                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0%] h-[1px] bg-[#ff1e00]/20 group-hover:w-[200%] transition-all duration-1000 rotate-[15deg] group-hover:rotate-[25deg]" />
                                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[0%] w-[1px] bg-[#ff1e00]/10 group-hover:h-[200%] transition-all duration-1000 rotate-[-15deg] group-hover:rotate-[-25deg]" />
                                              {/* Radial gradient background on hover */}
                                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                            </div>

                                            {/* Texts Layer (Independent, floating behind the image) */}
                                            <div className="absolute inset-0 z-[0] md:z-[2] pointer-events-none">
                                              {/* Left Column texts scattered */}
                                              {/* Blood Line Red */}
                                              <div className="absolute top-1/2 left-1/2 w-[220px] md:w-[280px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 scale-75 group-hover:scale-100 -translate-y-4 group-hover:-translate-y-[320px] md:group-hover:-translate-y-[280px] group-hover:-translate-x-[50px] md:group-hover:-translate-x-[550px]">
                                                  <div className="flex gap-3 md:gap-4 items-start">
                                                    <div className="w-6 h-12 md:w-10 md:h-16 bg-[#8a1c1c] shrink-0 shadow-lg" />
                                                    <div className="flex flex-col gap-1 md:gap-2">
                                                      <h5 className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-bold text-black pb-2">Blood Line Red</h5>
                                                      <p className="text-[0.65rem] md:text-[0.75rem] text-black/60 leading-relaxed font-light mt-1">A deep red inspired by the image of a blood line. It represents intensity and emotional tension. Within the palette, this color appears as a sharp visual accent.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Ash Grey */}
                                              <div className="absolute top-1/2 left-1/2 w-[220px] md:w-[280px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 scale-75 group-hover:scale-100 -translate-y-4 group-hover:-translate-y-[150px] md:group-hover:translate-y-[-20px] group-hover:translate-x-[50px] md:group-hover:-translate-x-[600px]">
                                                  <div className="flex gap-3 md:gap-4 items-start">
                                                    <div className="w-6 h-12 md:w-10 md:h-16 bg-[#8c8c8c] shrink-0 shadow-lg" />
                                                    <div className="flex flex-col gap-1 md:gap-2">
                                                      <h5 className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-bold text-black pb-2">Ash Grey</h5>
                                                      <p className="text-[0.65rem] md:text-[0.75rem] text-black/60 leading-relaxed font-light mt-1">A muted grey that recalls dust, ash, and worn surfaces. It introduces a quiet and aged atmosphere, suggesting erosion and the passage of time.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Burnt Earth */}
                                              <div className="absolute top-1/2 left-1/2 w-[220px] md:w-[280px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 scale-75 group-hover:scale-100 -translate-y-4 group-hover:translate-y-[170px] md:group-hover:translate-y-[240px] group-hover:-translate-x-[50px] md:group-hover:-translate-x-[500px]">
                                                  <div className="flex gap-3 md:gap-4 items-start">
                                                    <div className="w-6 h-12 md:w-10 md:h-16 bg-[#cfb499] shrink-0 shadow-lg" />
                                                    <div className="flex flex-col gap-1 md:gap-2">
                                                      <h5 className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-bold text-black pb-2">Burnt Earth</h5>
                                                      <p className="text-[0.65rem] md:text-[0.75rem] text-black/60 leading-relaxed font-light mt-1">A warm, dusty yellow inspired by scorched soil and sun-dried materials. This color reflects heat, dryness, and the feeling of a harsh environment.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Midnight Black */}
                                              <div className="absolute top-1/2 left-1/2 w-[220px] md:w-[280px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 scale-75 group-hover:scale-100 -translate-y-4 group-hover:translate-y-[340px] md:group-hover:translate-y-[220px] group-hover:translate-x-[50px] md:group-hover:translate-x-[420px]">
                                                  <div className="flex gap-3 md:gap-4 items-start">
                                                    <div className="w-6 h-12 md:w-10 md:h-16 bg-[#181818] shrink-0 shadow-lg" />
                                                    <div className="flex flex-col gap-1 md:gap-2">
                                                      <h5 className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-bold text-black pb-2">Midnight Black</h5>
                                                      <p className="text-[0.65rem] md:text-[0.75rem] text-black/60 leading-relaxed font-light mt-1">A deep black that anchors the palette. It adds strength and contrast, creating a dark foundation for the other colors.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Additional Inspiration Box */}
                                              <div className="absolute top-1/2 left-1/2 w-[260px] md:w-[380px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 scale-75 group-hover:scale-100 translate-y-8 group-hover:-translate-y-[480px] md:group-hover:-translate-y-[200px] group-hover:translate-x-0 md:group-hover:translate-x-[450px] bg-white/95 backdrop-blur-md p-5 md:p-8 shadow-2xl">
                                                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff1e00]" />
                                                  <h4 className="text-[0.55rem] md:text-[0.65rem] tracking-[0.4em] font-bold text-[#ff1e00] uppercase mb-3 pb-2">ADDITIONAL INSPIRATION</h4>
                                                  <p className="text-[0.65rem] md:text-[0.8rem] text-black/70 leading-relaxed font-light">
                                                    The costume design in this stop-motion animation inspired the idea of visible threads and stitching. Red yarn lines appearing on the garments create a strong visual detail that feels both fragile and tense. This element connects to the concept of a <strong className="font-medium text-black">“blood line”</strong> and influenced my interest in raw edges, loose threads, and exposed seams.
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            {/* Main Image */}
                                            <div className="relative z-10 w-[95%] max-w-[1400px] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.55] xl:group-hover:scale-[0.5] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)] bg-[#f0f0f0] group-active:scale-[0.5] xl:group-active:scale-[0.45]">
                                              <div className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[16/9]">
                                                <img 
                                                  src="https://raw.githubusercontent.com/jmeng260-hash/color-story/53ef698d0ad7732e3fd98f93179a578ff809f83a/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2088.jpg"
                                                  className="w-full h-full object-cover transition-all duration-1000" 
                                                  alt="Color Story Inspiration"
                                                />
                                              </div>
                                            </div>

                                          </div>
                                        )}
                                        {activeConceptTab === 3 && (
                                          <div className="flex flex-col py-12 md:py-24">
                                            <div className="mb-16 md:mb-24 lg:w-[60%]">
                                              <p className="text-[0.8rem] tracking-[0.3em] uppercase text-black/30 font-bold mb-6">Fabric & Manipulation</p>
                                              <h3 className="text-3xl md:text-5xl font-['Playfair_Display'] italic mb-8">Materiality & Structural Forms</h3>
                                            </div>

                                            <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
                                              <div className="relative group/img z-10 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply flex-1 flex justify-center w-full">
                                                <img 
                                                  src="https://raw.githubusercontent.com/jmeng260-hash/color-story1111/a3552a2e35030ecf6b485b41cef0798f44291839/a445c318-9b95-49c3-babf-ffd31bbd473a.png" 
                                                  alt="Fabric Inspiration 1" 
                                                  className="w-[90%] md:w-[85%] lg:w-[80%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.3] md:group-hover/img:scale-[1.4] lg:group-hover/img:scale-[1.5] origin-center lg:group-hover/img:-translate-x-10 mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                                />
                                              </div>
                                              
                                              <div className="relative group/img z-0 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply flex-1 flex justify-center w-full">
                                                <img 
                                                  src="https://raw.githubusercontent.com/jmeng260-hash/color-story1111/a3552a2e35030ecf6b485b41cef0798f44291839/%E6%88%AA%E5%B1%8F2026-05-01%2022.28.37.png" 
                                                  alt="Silhouette Inspiration 2" 
                                                  className="w-[90%] md:w-[85%] lg:w-[80%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.3] md:group-hover/img:scale-[1.4] lg:group-hover/img:scale-[1.5] origin-center lg:group-hover/img:translate-x-10 mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </motion.div>
                                    </div>
                                  ) : pIdx === 2 ? (
                                    <div className="pl-4 md:pl-12 pb-32 max-w-[1500px]">
                                      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                                        <div className="relative group/img z-10 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply flex-1 flex justify-center w-full">
                                          <img 
                                            src="https://raw.githubusercontent.com/jmeng260-hash/flats/3a7178fe1aebc66c98131125b8948e809393f10b/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%881%E6%97%A5%2022_52_57.png" 
                                            alt="Fashion Plate 1" 
                                            className="w-[95%] md:w-[90%] lg:w-[85%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.5] md:group-hover/img:scale-[1.8] lg:group-hover/img:scale-[2.0] origin-center md:group-hover/img:-translate-x-10 mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                          />
                                        </div>
                                        <div className="relative group/img z-0 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply flex-1 flex justify-center w-full mt-8 md:mt-24">
                                          <img 
                                            src="https://raw.githubusercontent.com/jmeng260-hash/flats/3a7178fe1aebc66c98131125b8948e809393f10b/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%881%E6%97%A5%2022_54_20.png" 
                                            alt="Fashion Plate 2" 
                                            className="w-[95%] md:w-[90%] lg:w-[85%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.5] md:group-hover/img:scale-[1.8] lg:group-hover/img:scale-[2.0] origin-center md:group-hover/img:translate-x-10 mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : pIdx === 3 ? (
                                    <div className="pl-4 md:pl-12 pb-32 max-w-[1500px] flex justify-center w-full">
                                      <div className="relative group/img z-10 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply w-full max-w-4xl flex justify-center">
                                        <img 
                                          src="https://raw.githubusercontent.com/jmeng260-hash/final/c3d52a9b337e801a7bf0e0e0990c47d01b3e4f05/%E6%88%AA%E5%B1%8F2026-05-01%2022.45.22.png" 
                                          alt="Final Illustration" 
                                          className="w-[90%] md:w-[85%] lg:w-[80%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.3] md:group-hover/img:scale-[1.5] lg:group-hover/img:scale-[1.8] origin-center mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="pl-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                      <div className="flex flex-col gap-4">
                                        <div className={`aspect-[4/5] bg-gray-${100 + (pIdx * 100)} grayscale contrast-125`} />
                                        <p className="text-[0.6rem] tracking-[0.2em] opacity-40 uppercase">Archival Entry_0{pIdx+1}A</p>
                                      </div>
                                      <div className="flex flex-col gap-4 pt-12">
                                        <div className={`aspect-[3/4] bg-gray-${200 + (pIdx * 100)} grayscale brightness-75`} />
                                        <p className="text-[0.6rem] tracking-[0.2em] opacity-40 uppercase">Archival Entry_0{pIdx+1}B</p>
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-6">
                            {[
                              { id: "INSPIRATION", imgA: "https://raw.githubusercontent.com/jmeng260-hash/000/95651cd9e263cd17ab9933ba9b46a9c6c4ac79d2/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2044.png", imgB: "https://raw.githubusercontent.com/jmeng260-hash/000/95651cd9e263cd17ab9933ba9b46a9c6c4ac79d2/IMG_7780.JPG" },
                              { id: "TARGET CUSTOMER", imgA: "https://raw.githubusercontent.com/jmeng260-hash/target-customer02/683d522e1758ad5a70d484aa8a6306ed22e8a679/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20101.jpg" },
                              { id: "FABRIC", imgA: "https://raw.githubusercontent.com/jmeng260-hash/color-story-fabric/e85c10c239a7669c862a68c6de1a8414e1f23529/%E6%88%AA%E5%B1%8F2026-05-01%2019.08.30.png", imgB: "https://raw.githubusercontent.com/jmeng260-hash/color-story-fabric/e85c10c239a7669c862a68c6de1a8414e1f23529/%E6%88%AA%E5%B1%8F2026-05-01%2019.08.47.png" },
                              { id: "PROCESS", images: [
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/504%202.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20115.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20116.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20117.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20118.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20119.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20120.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%20121.jpg",
                                "https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2045.png"
                              ] },
                              { id: "LOOKS", imgA: "https://raw.githubusercontent.com/jmeng260-hash/look/fd32aa6cc20997b8edb7184a4b03bd5598814cf1/%E6%9C%AA%E5%91%BD%E5%90%8D%E4%BD%9C%E5%93%81%2046.png" }
                            ].map((phase, pIdx) => (
                              <div key={pIdx} className="flex flex-col gap-4">
                                <button 
                                  onClick={() => setActivePhase(activePhase === pIdx ? null : pIdx)}
                                  className="flex items-center gap-4 group cursor-pointer hover:pl-2 transition-all"
                                >
                                  <span className="text-[0.6rem] font-mono opacity-40">0{pIdx + 1}.</span>
                                  <span className={`text-[0.9rem] tracking-widest uppercase transition-opacity ${activePhase === pIdx ? "opacity-100 font-bold" : "opacity-50 group-hover:opacity-80"}`}>
                                    {phase.id}
                                  </span>
                                </button>
                                
                                <motion.div
                                  initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                                  animate={{ 
                                    height: activePhase === pIdx ? "auto" : 0, 
                                    opacity: activePhase === pIdx ? 1 : 0,
                                    transitionEnd: { overflow: activePhase === pIdx ? "visible" : "hidden" }
                                  }}
                                  className={`relative ${activePhase === pIdx ? "z-40" : "z-0"}`}
                                >
                                  {phase.id === "TARGET CUSTOMER" ? (
                                    <div className="pl-4 md:pl-8 pb-12 flex flex-col gap-10 md:gap-14">
                                      <div className="flex flex-col gap-4">
                                        <div className="w-full relative group/img z-0 hover:z-[60] transition-all duration-500 cursor-zoom-in mix-blend-multiply">
                                          <img src={phase.imgA} alt={`Fluid detail 0${pIdx+1}A`} className="w-[100%] md:w-[80%] lg:w-[70%] max-w-5xl h-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left group-hover/img:scale-[1.3] md:group-hover/img:scale-[1.5] lg:group-hover/img:scale-[1.7] relative z-10 mix-blend-multiply drop-shadow-none brightness-[1.1] contrast-[1.1]" />
                                        </div>
                                        <p className="text-[0.6rem] tracking-[0.2em] opacity-40 uppercase pt-2">{phase.id}_{pIdx+1}A</p>
                                      </div>
                                      
                                      <div className="flex flex-col gap-6 max-w-3xl">
                                        <h4 className="text-[0.8rem] md:text-[1rem] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-4">Target Customer</h4>
                                        <div className="flex flex-col gap-5 text-[0.75rem] md:text-[0.85rem] text-black/70 leading-relaxed font-light">
                                          <p>
                                            My target customer is an urban creative person between 18 and 30 years old. They may be fashion students, art students, stylists, musicians, freelancers, or people working in creative spaces without a strict dress code. Their lifestyle moves between school, studio, city streets, cafés, bars, galleries, and nightlife spaces.
                                          </p>
                                          <p>
                                            They are not looking for clothing that feels too polished or perfect. They are attracted to layering, texture, structure, and personal character. Their wardrobe often includes dark neutral colors, vintage pieces, oversized shapes, fitted details, and garments that feel slightly worn or lived-in.
                                          </p>
                                          <p>
                                            This customer dresses with attitude, but not in a loud way. Their style feels independent, emotional, and personal. They are drawn to clothing that can move with their daily life and express both softness and strength.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : phase.id === "FABRIC" ? (
                                    <div className="w-full relative flex flex-col md:flex-row items-start justify-between py-12 md:py-20 pb-20 md:pb-48 gap-16 md:gap-4">
                                      {phase.imgA && (
                                        <div className="w-full md:w-[55%] lg:w-[50%] relative group/img z-10 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply">
                                          <img src={phase.imgA} alt={`Fabric Story`} className="w-[110%] md:w-[125%] lg:w-[135%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.4] md:group-hover/img:scale-[1.6] lg:group-hover/img:scale-[1.8] mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05] origin-top-left -ml-4 md:-ml-8 lg:-ml-12 relative z-50" />
                                        </div>
                                      )}
                                      {phase.imgB && (
                                        <div className="w-full md:w-[45%] lg:w-[45%] relative group/img z-0 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply md:mt-[25%] lg:mt-[30%] md:-ml-12 lg:-ml-16">
                                          <img src={phase.imgB} alt={`Fabric Manipulation`} className="w-[115%] md:w-[135%] lg:w-[145%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.4] md:group-hover/img:scale-[1.6] lg:group-hover/img:scale-[1.8] mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05] origin-top-left md:translate-x-8 lg:translate-x-16 relative z-50" />
                                        </div>
                                      )}
                                    </div>
                                  ) : phase.id === "PROCESS" && phase.images ? (
                                    <div className="w-full py-20 md:py-32 flex justify-center items-center scatter-scene relative h-[600px] md:h-[800px] cursor-crosshair">
                                      <style>{`
                                        .scatter-scene:hover .main-img-cover {
                                          transform: scale(0.9) translateY(-20px);
                                        }
                                        .scatter-scene:hover .explore-label {
                                          opacity: 0;
                                        }
                                      `}</style>
                                      
                                      {/* Main cover image */}
                                      <div className="relative z-50 w-[95%] md:w-[75%] lg:w-[65%] max-w-6xl transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] main-img-cover">
                                        <img 
                                          src="https://raw.githubusercontent.com/jmeng260-hash/process/ef2403df7017a4733fd8b7474c23cbf75793d2f3/IMG_7779.PNG" 
                                          alt="Main Process Cover" 
                                          className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl brightness-[1.05]" 
                                        />
                                      </div>

                                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.4em] uppercase opacity-40 transition-opacity duration-500 explore-label pointer-events-none">
                                        Hover to explore
                                      </div>

                                      {/* Scattered images */}
                                      {phase.images.map((imgSrc, imgIdx) => {
                                        const positions = [
                                          { x: -90, y: -70, r: -15, scale: 0.7 },
                                          { x: 90, y: -80, r: 12, scale: 0.75 },
                                          { x: -100, y: 20, r: -8, scale: 0.8 },
                                          { x: 105, y: 30, r: 18, scale: 0.65 },
                                          { x: -60, y: -130, r: -22, scale: 0.6 },
                                          { x: 70, y: -140, r: 25, scale: 0.65 },
                                          { x: -80, y: 90, r: -12, scale: 0.7 },
                                          { x: 85, y: 95, r: 14, scale: 0.75 },
                                          { x: 0, y: 130, r: -5, scale: 0.6 },
                                        ];
                                        const mobPositions = [
                                          { x: -70, y: -60, r: -15, scale: 0.7 },
                                          { x: 70, y: -70, r: 12, scale: 0.75 },
                                          { x: -80, y: 20, r: -8, scale: 0.8 },
                                          { x: 80, y: 25, r: 18, scale: 0.65 },
                                          { x: -40, y: -110, r: -22, scale: 0.6 },
                                          { x: 40, y: -120, r: 25, scale: 0.65 },
                                          { x: -60, y: 80, r: -12, scale: 0.7 },
                                          { x: 60, y: 85, r: 14, scale: 0.75 },
                                          { x: 0, y: 110, r: -5, scale: 0.6 },
                                        ];
                                        const pos = positions[imgIdx % positions.length];
                                        
                                        return (
                                          <div 
                                            key={imgIdx} 
                                            className={`absolute top-1/2 left-1/2 w-[220px] md:w-[350px] z-10 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-multiply hover:!z-[70] scatter-wrapper-${imgIdx}`}
                                          >
                                            <style>{`
                                              .scatter-wrapper-${imgIdx} {
                                                transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
                                                opacity: 0;
                                                pointer-events: none;
                                              }
                                              .scatter-scene:hover .scatter-wrapper-${imgIdx} {
                                                transform: translate(calc(-50% + ${pos.x}%), calc(-50% + ${pos.y}%)) scale(${pos.scale}) rotate(${pos.r}deg);
                                                opacity: 1;
                                                pointer-events: auto;
                                              }
                                              @media (max-width: 768px) {
                                                .scatter-scene:hover .scatter-wrapper-${imgIdx} {
                                                  transform: translate(calc(-50% + ${mobPositions[imgIdx % mobPositions.length].x}%), calc(-50% + ${mobPositions[imgIdx % mobPositions.length].y}%)) scale(${mobPositions[imgIdx % mobPositions.length].scale}) rotate(${mobPositions[imgIdx % mobPositions.length].r}deg);
                                                }
                                              }
                                            `}</style>
                                            <img 
                                              src={imgSrc} 
                                              alt={`Process ${imgIdx + 1}`} 
                                              className="w-full h-auto object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-[0.8s] ease-out hover:scale-110 cursor-zoom-in relative z-10" 
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : phase.id === "LOOKS" ? (
                                    <div className="pl-4 md:pl-12 pb-32 max-w-[1500px] flex justify-center w-full">
                                      <div className="relative group/img z-10 hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply w-full max-w-5xl flex justify-center mt-12 md:mt-24">
                                        {phase.imgA && (
                                          <img 
                                            src={phase.imgA} 
                                            alt="Looks Collection" 
                                            className="w-[100%] md:w-[95%] lg:w-[90%] h-auto object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.3] md:group-hover/img:scale-[1.5] lg:group-hover/img:scale-[1.8] origin-center mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05]" 
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full relative flex flex-col md:flex-row items-start justify-between py-16 md:py-24 pb-20 md:pb-48 gap-20 md:gap-8">
                                      <div className="flex flex-col gap-4 w-full md:w-[50%] lg:w-[45%] relative z-10">
                                        {phase.imgA ? (
                                          <div className="w-full relative group/img hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply">
                                            <img src={phase.imgA} alt={`Fluid detail 0${pIdx+1}A`} className="w-[110%] md:w-[125%] lg:w-[140%] h-auto object-contain transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.4] md:group-hover/img:scale-[1.6] lg:group-hover/img:scale-[1.8] mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05] origin-top-left -ml-4 md:-ml-8 relative z-50" />
                                          </div>
                                        ) : (
                                          <div className="aspect-[4/5] bg-gray-300 grayscale contrast-125 w-full" />
                                        )}
                                        <p className="text-[0.6rem] tracking-[0.2em] opacity-40 uppercase pt-4 z-50">{phase.id}_{pIdx+1}A</p>
                                      </div>
                                      <div className="flex flex-col gap-4 pt-12 md:pt-[35%] lg:pt-[40%] w-full md:w-[50%] lg:w-[45%] relative z-0 md:-ml-12 lg:-ml-20">
                                        {phase.imgB ? (
                                          <div className="w-full relative group/img hover:z-[60] transition-all duration-700 cursor-zoom-in mix-blend-multiply">
                                            <img src={phase.imgB} alt={`Fluid detail 0${pIdx+1}B`} className="w-[115%] md:w-[130%] lg:w-[140%] h-auto object-contain transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.4] md:group-hover/img:scale-[1.6] lg:group-hover/img:scale-[1.8] mix-blend-multiply drop-shadow-none brightness-[1.05] contrast-[1.05] origin-top-left md:translate-x-10 lg:translate-x-12 relative z-50" />
                                          </div>
                                        ) : (
                                          <div className="aspect-[3/4] bg-gray-400 grayscale brightness-75 relative overflow-hidden w-full">
                                            <motion.div 
                                              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                                              transition={{ duration: 10, repeat: Infinity }}
                                              className="absolute inset-0 bg-white/10 blur-xl"
                                            />
                                          </div>
                                        )}
                                        <p className="text-[0.6rem] tracking-[0.2em] opacity-40 uppercase pt-4 z-50 md:pl-10 lg:pl-12">{phase.id}_{pIdx+1}B</p>
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </main>
        )}
      </motion.div>

      {/* Footer Tagline */}
      <footer className="w-full px-8 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 text-[0.72rem] leading-[1.5] text-black/55 z-50 mix-blend-difference text-white">
        <div className="max-w-[400px]">
          <p className="mb-4 text-gray-400">MANIFESTO</p>
          <p>The form is not broken. It is intentionally shifted, stretched, and reassembled into a new body. We seek truth in the deviation.</p>
        </div>
        <div className="text-right">
          <p className="mb-4 text-gray-400">CONNECT</p>
          <p>© 2026 MISFORM STUDIO</p>
        </div>
      </footer>

      {/* SVG Filters */}
      <svg width="0" height="0" className="absolute invisible pointer-events-none">
        <defs>
          <filter id="organicDistortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.042" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" dur="14s" values="0.018 0.042; 0.045 0.018; 0.018 0.042" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="27" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <filter id="calmDistortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.024" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" dur="20s" values="0.012 0.024; 0.024 0.012; 0.012 0.024" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="floatingGlassDistortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" dur="18s" values="0.012 0.03; 0.032 0.016; 0.012 0.03" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
