import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateHandwriting } from './strokeValidation';

// Play the actual sound of the character
const playPronunciation = (sound) => {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance();
        utterance.text = sound;
        utterance.lang = 'ko-KR';
        utterance.rate = 0.7;
        utterance.volume = 1;
        utterance.pitch = 1;

        // Get Korean voice if available
        const voices = speechSynthesis.getVoices();
        const koreanVoice = voices.find(v => v.lang.includes('ko'));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }

        speechSynthesis.speak(utterance);
    }
};

export default function CharacterPractice({
                                              character,
                                              onComplete,
                                              accentColor = '#FF6B6B'
                                          }) {
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState('animating'); // 'animating', 'writing'
    const [currentStroke, setCurrentStroke] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const completedStrokesRef = useRef(null);

    const strokes = character?.strokes || [];

    // Initialize and play pronunciation
    useEffect(() => {
        setPhase('animating');
        setCurrentStroke(0);
        setPaths([]);
        setCurrentPath([]);
        setFeedback(null);
        setAnimationKey(prev => prev + 1);

        // Load voices first (needed for some browsers)
        if ('speechSynthesis' in window) {
            speechSynthesis.getVoices();
        }

        // Play pronunciation with slight delay (use the actual sound)
        const timer = setTimeout(() => {
            playPronunciation(character.sound || character.char);
        }, 300);

        return () => clearTimeout(timer);
    }, [character]);

    // Draw completed strokes on canvas during animation
    useEffect(() => {
        if (phase !== 'animating') return;

        const canvas = completedStrokesRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#1A1A2E';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < currentStroke; i++) {
            const stroke = strokes[i];
            if (stroke && stroke.length > 0) {
                ctx.beginPath();
                ctx.moveTo((stroke[0].x / 100) * width, (stroke[0].y / 100) * height);
                for (let j = 1; j < stroke.length; j++) {
                    ctx.lineTo((stroke[j].x / 100) * width, (stroke[j].y / 100) * height);
                }
                ctx.stroke();
            }
        }
    }, [currentStroke, strokes, phase]);

    // Handle stroke animation complete
    const handleStrokeComplete = () => {
        if (currentStroke < strokes.length - 1) {
            setCurrentStroke(prev => prev + 1);
        } else {
            // Animation finished, wait 1 second then transition to writing
            setTimeout(() => {
                setPhase('writing');
            }, 1000);
        }
    };

    // Drawing handlers
    const getPointerPos = useCallback((e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: ((clientX - rect.left) / rect.width) * 100,
            y: ((clientY - rect.top) / rect.height) * 100
        };
    }, []);

    const startDrawing = useCallback((e) => {
        if (phase !== 'writing') return;
        e.preventDefault();
        setIsDrawing(true);
        const pos = getPointerPos(e);
        setCurrentPath([pos]);
    }, [getPointerPos, phase]);

    const draw = useCallback((e) => {
        if (!isDrawing || phase !== 'writing') return;
        e.preventDefault();
        const pos = getPointerPos(e);
        setCurrentPath(prev => [...prev, pos]);
    }, [isDrawing, getPointerPos, phase]);

    const endDrawing = useCallback(() => {
        if (isDrawing && currentPath.length > 0) {
            const newPaths = [...paths, currentPath];
            setPaths(newPaths);

            // Auto-check after each stroke
            checkDrawing(newPaths);
        }
        setIsDrawing(false);
        setCurrentPath([]);
    }, [isDrawing, currentPath, paths]);

    const checkDrawing = (allPaths) => {
        // Use advanced DTW-based validation
        const validation = validateHandwriting(
            allPaths,
            character.char,
            character.strokes
        );

        if (validation.valid) {
            setFeedback('success');
            setTimeout(() => {
                onComplete();
            }, 600);
            return;
        }

        // If validation failed and user has drawn enough strokes, show retry
        const minStrokes = Math.max(1, Math.ceil(character.strokes.length * 0.5));
        if (allPaths.length >= minStrokes) {
            setFeedback('retry');
            setTimeout(() => {
                setFeedback(null);
                setPaths([]);
            }, 800);
        }
    };

    const currentStrokeData = strokes[currentStroke];

    const renderPath = (path, index, isTemp = false) => {
        if (path.length < 2) return null;

        const d = path.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`;
            return `${acc} L ${point.x} ${point.y}`;
        }, '');

        return (
            <path
                key={index}
                d={d}
                fill="none"
                stroke={isTemp ? accentColor : '#1A1A2E'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={isTemp ? 0.6 : 1}
            />
        );
    };

    return (
        <div className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* Background grid */}
            <div className="absolute inset-0 border-2 border-gray-200 rounded-2xl bg-white shadow-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-100" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-gray-100" />
                </div>

                {/* Corner guides */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-gray-200 rounded-tl" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-gray-200 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-gray-200 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-gray-200 rounded-br" />
            </div>

            {/* Animation phase */}
            <AnimatePresence>
                {phase === 'animating' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* Completed strokes canvas */}
                        <canvas
                            ref={completedStrokesRef}
                            width={300}
                            height={300}
                            className="absolute inset-0 w-full h-full"
                        />

                        {/* Current stroke animation */}
                        {currentStrokeData && currentStrokeData.length > 0 && (
                            <svg
                                key={`${animationKey}-${currentStroke}`}
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 100"
                            >
                                <motion.path
                                    d={currentStrokeData.length === 2
                                        ? `M ${currentStrokeData[0].x} ${currentStrokeData[0].y} L ${currentStrokeData[1].x} ${currentStrokeData[1].y}`
                                        : `M ${currentStrokeData.map((p, i) =>
                                            i === 0 ? `${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                                        ).join(' ')}`
                                    }
                                    fill="none"
                                    stroke={accentColor}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                        delay: 0.15
                                    }}
                                    onAnimationComplete={handleStrokeComplete}
                                />
                                {/* Brush tip indicator */}
                                <motion.circle
                                    r="5"
                                    fill={accentColor}
                                    initial={{
                                        cx: currentStrokeData[0].x,
                                        cy: currentStrokeData[0].y,
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    animate={{
                                        cx: currentStrokeData[currentStrokeData.length - 1].x,
                                        cy: currentStrokeData[currentStrokeData.length - 1].y,
                                        opacity: [1, 1, 0.5],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                        delay: 0.15
                                    }}
                                />
                            </svg>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Writing phase */}
            {phase === 'writing' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                >
                    {/* Faint guide character */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[160px] text-gray-100 font-light select-none leading-none">
              {character.char}
            </span>
                    </div>

                    {/* Drawing canvas */}
                    <svg
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10"
                        viewBox="0 0 100 100"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                        onMouseLeave={endDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={endDrawing}
                    >
                        {paths.map((path, i) => renderPath(path, i))}
                        {currentPath.length > 0 && renderPath(currentPath, 'current', true)}
                    </svg>
                </motion.div>
            )}

            {/* Feedback indicators */}
            <AnimatePresence>
                {feedback === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-30 bg-emerald-50/80 rounded-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-6xl"
                        >
                            ✓
                        </motion.div>
                    </motion.div>
                )}

                {feedback === 'retry' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
                    >
                        <div className="bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                            <span>🔄</span>
                            <span>Try again</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phase indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-xs text-gray-400">
          {phase === 'animating' ? 'Watch carefully...' : 'Now write it!'}
        </span>
            </div>
        </div>
    );
}