import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 'consonants',
        title: '자음',
        subtitle: 'Consonants',
        count: 14,
        color: 'from-rose-100 to-rose-50',
        accent: '#FF6B6B',
        characters: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'
    },
    {
        id: 'vowels',
        title: '모음',
        subtitle: 'Vowels',
        count: 10,
        color: 'from-sky-100 to-sky-50',
        accent: '#4ECDC4',
        characters: 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'
    },
    {
        id: 'double-consonants',
        title: '쌍자음',
        subtitle: 'Double Consonants',
        count: 5,
        color: 'from-amber-100 to-amber-50',
        accent: '#FFB347',
        characters: 'ㄲㄸㅃㅆㅉ'
    },
    {
        id: 'complex-vowels',
        title: '복합모음',
        subtitle: 'Complex Vowels',
        count: 11,
        color: 'from-violet-100 to-violet-50',
        accent: '#9B8BF4',
        characters: 'ㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ'
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 md:py-20">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-light text-[#1A1A2E] tracking-tight mb-3">
                        한글
                    </h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">
                        Learn by Writing
                    </p>
                </motion.div>

                {/* Category Cards */}
                <div className="space-y-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={createPageUrl(`Practice?category=${category.id}`)}>
                                <div
                                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${category.color} p-6 md:p-8 
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group`}
                                >
                                    {/* Background Characters */}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl md:text-7xl font-light opacity-10 text-[#1A1A2E]">
                                        {category.characters.slice(0, 3)}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <h2 className="text-3xl md:text-4xl font-light text-[#1A1A2E]">
                                                {category.title}
                                            </h2>
                                            <span className="text-sm text-gray-500">
                        {category.subtitle}
                      </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: category.accent }}
                                            />
                                            <span className="text-sm text-gray-500">
                        {category.count} characters
                      </span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                    transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <svg className="w-6 h-6 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-gray-400 text-xs mt-12 tracking-wide"
                >
                    Tap a category to start practicing
                </motion.p>
            </div>
        </div>
    );
}