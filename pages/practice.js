import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Trophy, RotateCcw } from 'lucide-react';
import { getCategoryData, getCategoryInfo } from '../components/hangul/characterData';
import CharacterPractice from '../components/hangul/CharacterPractice';

export default function Practice() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category') || 'consonants';

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showComplete, setShowComplete] = useState(false);
    const [key, setKey] = useState(0);

    const characters = getCategoryData(categoryId);
    const categoryInfo = getCategoryInfo(categoryId);
    const currentChar = characters[currentIndex];

    const progress = ((currentIndex) / characters.length) * 100;

    const handleCharacterComplete = () => {
        if (currentIndex < characters.length - 1) {
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                setKey(prev => prev + 1);
            }, 200);
        } else {
            setShowComplete(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setShowComplete(false);
        setKey(prev => prev + 1);
    };

    const handleReplaySound = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance();
            utterance.text = currentChar.sound || currentChar.char;
            utterance.lang = 'ko-KR';
            utterance.rate = 0.7;

            const voices = speechSynthesis.getVoices();
            const koreanVoice = voices.find(v => v.lang.includes('ko'));
            if (koreanVoice) utterance.voice = koreanVoice;

            speechSynthesis.speak(utterance);
        }
    };

    if (!currentChar && !showComplete) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <p className="text-gray-500">Category not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-gray-100">
            {/* Header */}
            <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm z-40 px-4 py-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => window.location.href = createPageUrl('Home')}
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors p-2 -ml-2 touch-manipulation"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="text-center flex-1">
                            <div className="flex items-center justify-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: categoryInfo.accent }}
                                />
                                <span className="text-sm font-medium text-[#1A1A2E]">
                  {categoryInfo.title}
                </span>
                                <span className="text-xs text-gray-400">
                  {categoryInfo.subtitle}
                </span>
                            </div>
                        </div>

                        <div className="w-6" /> {/* Spacer for alignment */}
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ backgroundColor: categoryInfo.accent }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Character markers */}
                        <div className="absolute inset-0 flex justify-between px-1">
                            {characters.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                                        i < currentIndex ? 'bg-white/50' : 'bg-transparent'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                        <span>{currentIndex + 1} / {characters.length}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-lg mx-auto px-6 py-6">
                <AnimatePresence mode="wait">
                    {showComplete ? (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-12"
                        >
                            {/* Celebration */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                                className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8"
                                style={{ backgroundColor: `${categoryInfo.accent}15` }}
                            >
                                <Trophy className="w-14 h-14" style={{ color: categoryInfo.accent }} />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-light text-[#1A1A2E] mb-3"
                            >
                                잘했어요!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-500 mb-2"
                            >
                                Great job!
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-sm text-gray-400 mb-10"
                            >
                                You've mastered all {characters.length} {categoryInfo.subtitle.toLowerCase()}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col gap-3"
                            >
                                <button
                                    onClick={handleRestart}
                                    className="flex items-center justify-center gap-2 px-8 py-4 text-white rounded-2xl transition-all hover:opacity-90 mx-auto"
                                    style={{ backgroundColor: categoryInfo.accent }}
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Practice Again
                                </button>
                                <Link
                                    to={createPageUrl('Home')}
                                    className="px-8 py-4 text-gray-600 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Choose Another Category
                                </Link>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`char-${currentIndex}`}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* Character display */}
                            <div className="text-center mb-6">
                                <motion.div
                                    key={currentChar.char}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center gap-4"
                                >
                                    <h1 className="text-6xl md:text-7xl font-light text-[#1A1A2E]">
                                        {currentChar.char}
                                    </h1>
                                    <button
                                        onClick={handleReplaySound}
                                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        <Volume2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </motion.div>
                                <div className="mt-3 flex items-center justify-center gap-3 text-sm">
                                    <span className="text-gray-600 font-medium">{currentChar.name}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-gray-400 italic">[{currentChar.romanization}]</span>
                                </div>
                            </div>

                            {/* Practice canvas */}
                            <div className="py-4">
                                <CharacterPractice
                                    key={key}
                                    character={currentChar}
                                    onComplete={handleCharacterComplete}
                                    accentColor={categoryInfo.accent}
                                />
                            </div>

                            {/* Stroke count hint */}
                            <div className="text-center mt-12">
                <span className="text-xs text-gray-400">
                  {currentChar.strokes.length} stroke{currentChar.strokes.length > 1 ? 's' : ''}
                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}