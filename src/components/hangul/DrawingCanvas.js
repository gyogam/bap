import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

export default function DrawingCanvas({
                                          character,
                                          onComplete,
                                          accentColor = '#FF6B6B'
                                      }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [canvasSize, setCanvasSize] = useState({ width: 280, height: 280 });

    useEffect(() => {
        clearCanvas();
    }, [character]);

    useEffect(() => {
        const updateSize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                setCanvasSize({ width: rect.width, height: rect.height });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

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
        e.preventDefault();
        setIsDrawing(true);
        const pos = getPointerPos(e);
        setCurrentPath([pos]);
    }, [getPointerPos]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPointerPos(e);
        setCurrentPath(prev => [...prev, pos]);
    }, [isDrawing, getPointerPos]);

    const endDrawing = useCallback(() => {
        if (isDrawing && currentPath.length > 0) {
            setPaths(prev => [...prev, currentPath]);
        }
        setIsDrawing(false);
        setCurrentPath([]);
    }, [isDrawing, currentPath]);

    const clearCanvas = () => {
        setPaths([]);
        setCurrentPath([]);
        setFeedback(null);
    };

    const checkDrawing = () => {
        // Simple validation: check if user has drawn enough strokes
        const minStrokes = Math.max(1, Math.floor(character.strokes.length * 0.5));

        if (paths.length >= minStrokes) {
            // Check if strokes cover reasonable area
            const allPoints = paths.flat();
            const xs = allPoints.map(p => p.x);
            const ys = allPoints.map(p => p.y);
            const coverage = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));

            if (coverage > 200) { // Minimum coverage threshold
                setFeedback('success');
                setTimeout(() => {
                    onComplete();
                }, 800);
                return;
            }
        }

        setFeedback('retry');
        setTimeout(() => {
            clearCanvas();
        }, 600);
    };

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
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
            {/* Background grid */}
            <div className="absolute inset-0 border-2 border-gray-200 rounded-xl bg-white shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-100" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-gray-100" />
                </div>
            </div>

            {/* Guide character (faint) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[140px] text-gray-100 font-light select-none">
          {character.char}
        </span>
            </div>

            {/* Drawing area */}
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

            {/* Feedback overlay */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute inset-0 rounded-xl flex items-center justify-center z-20 ${
                            feedback === 'success'
                                ? 'bg-emerald-50/90'
                                : 'bg-red-50/90'
                        }`}
                    >
                        <div className="text-center">
                            {feedback === 'success' ? (
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-3"
                                    >
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <p className="text-emerald-700 font-medium">Great!</p>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3"
                                    >
                                        <RotateCcw className="w-8 h-8 text-gray-500" />
                                    </motion.div>
                                    <p className="text-gray-600 font-medium">Try again</p>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
                <button
                    onClick={clearCanvas}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700
            bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                </button>
                <button
                    onClick={checkDrawing}
                    disabled={paths.length === 0}
                    className="flex items-center gap-2 px-6 py-2 text-sm text-white rounded-lg transition-all
            disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        backgroundColor: paths.length > 0 ? accentColor : '#ccc',
                    }}
                >
                    Check
                </button>
            </div>
        </div>
    );
}