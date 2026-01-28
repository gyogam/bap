import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function StrokeAnimation({ character, onComplete, isPlaying = true }) {
    const [currentStroke, setCurrentStroke] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);
    const canvasRef = useRef(null);
    const strokes = character?.strokes || [];

    useEffect(() => {
        setCurrentStroke(0);
        setAnimationKey(prev => prev + 1);
    }, [character]);

    useEffect(() => {
        if (!isPlaying) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw completed strokes
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
    }, [currentStroke, strokes, isPlaying]);

    const handleStrokeComplete = () => {
        if (currentStroke < strokes.length - 1) {
            setCurrentStroke(prev => prev + 1);
        } else {
            // Animation complete
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 500);
        }
    };

    const currentStrokeData = strokes[currentStroke];

    return (
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
            {/* Background grid */}
            <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-100" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-gray-100" />
                </div>
            </div>

            {/* Completed strokes canvas */}
            <canvas
                ref={canvasRef}
                width={280}
                height={280}
                className="absolute inset-0 w-full h-full"
            />

            {/* Current stroke animation */}
            {isPlaying && currentStrokeData && currentStrokeData.length > 0 && (
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
                        stroke="#FF6B6B"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            delay: 0.2
                        }}
                        onAnimationComplete={handleStrokeComplete}
                    />
                    {/* Animated dot at the end */}
                    <motion.circle
                        r="4"
                        fill="#FF6B6B"
                        initial={{
                            cx: currentStrokeData[0].x,
                            cy: currentStrokeData[0].y,
                            opacity: 1
                        }}
                        animate={{
                            cx: currentStrokeData[currentStrokeData.length - 1].x,
                            cy: currentStrokeData[currentStrokeData.length - 1].y,
                            opacity: [1, 1, 0]
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            delay: 0.2
                        }}
                    />
                </svg>
            )}

            {/* Stroke counter */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {currentStroke + 1} / {strokes.length}
            </div>
        </div>
    );
}