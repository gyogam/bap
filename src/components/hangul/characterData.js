// Hangul character data with stroke information
// Each character has strokes array where each stroke is an array of {x, y} points (0-100 coordinate system)

export const hangulData = {
    consonants: [
        {
            char: 'ㄱ',
            name: 'geu',
            sound: '그',
            romanization: 'g',
            strokes: [
                [{ x: 20, y: 25 }, { x: 75, y: 25 }],
                [{ x: 75, y: 25 }, { x: 75, y: 80 }]
            ]
        },
        {
            char: 'ㄴ',
            name: 'neu',
            sound: '느',
            romanization: 'n',
            strokes: [
                [{ x: 25, y: 20 }, { x: 25, y: 75 }],
                [{ x: 25, y: 75 }, { x: 80, y: 75 }]
            ]
        },
        {
            char: 'ㄷ',
            name: 'deu',
            sound: '드',
            romanization: 'd',
            strokes: [
                [{ x: 20, y: 25 }, { x: 80, y: 25 }],
                [{ x: 20, y: 25 }, { x: 20, y: 75 }],
                [{ x: 20, y: 75 }, { x: 80, y: 75 }]
            ]
        },
        {
            char: 'ㄹ',
            name: 'reu',
            sound: '르',
            romanization: 'r/l',
            strokes: [
                [{ x: 20, y: 20 }, { x: 80, y: 20 }],
                [{ x: 80, y: 20 }, { x: 20, y: 40 }],
                [{ x: 20, y: 40 }, { x: 80, y: 60 }],
                [{ x: 80, y: 60 }, { x: 20, y: 60 }],
                [{ x: 20, y: 60 }, { x: 20, y: 80 }]
            ]
        },
        {
            char: 'ㅁ',
            name: 'meu',
            sound: '므',
            romanization: 'm',
            strokes: [
                [{ x: 20, y: 20 }, { x: 20, y: 80 }],
                [{ x: 20, y: 20 }, { x: 80, y: 20 }],
                [{ x: 80, y: 20 }, { x: 80, y: 80 }],
                [{ x: 20, y: 80 }, { x: 80, y: 80 }]
            ]
        },
        {
            char: 'ㅂ',
            name: 'beu',
            sound: '브',
            romanization: 'b',
            strokes: [
                [{ x: 25, y: 20 }, { x: 25, y: 80 }],
                [{ x: 75, y: 20 }, { x: 75, y: 80 }],
                [{ x: 25, y: 45 }, { x: 75, y: 45 }],
                [{ x: 25, y: 80 }, { x: 75, y: 80 }]
            ]
        },
        {
            char: 'ㅅ',
            name: 'seu',
            sound: '스',
            romanization: 's',
            strokes: [
                [{ x: 50, y: 20 }, { x: 25, y: 80 }],
                [{ x: 50, y: 20 }, { x: 75, y: 80 }]
            ]
        },
        {
            char: 'ㅇ',
            name: 'eung',
            sound: '응',
            romanization: 'ng',
            strokes: [
                [{ x: 50, y: 20 }, { x: 75, y: 35 }, { x: 75, y: 65 }, { x: 50, y: 80 }, { x: 25, y: 65 }, { x: 25, y: 35 }, { x: 50, y: 20 }]
            ]
        },
        {
            char: 'ㅈ',
            name: 'jeu',
            sound: '즈',
            romanization: 'j',
            strokes: [
                [{ x: 25, y: 25 }, { x: 75, y: 25 }],
                [{ x: 50, y: 25 }, { x: 25, y: 80 }],
                [{ x: 50, y: 25 }, { x: 75, y: 80 }]
            ]
        },
        {
            char: 'ㅊ',
            name: 'cheu',
            sound: '츠',
            romanization: 'ch',
            strokes: [
                [{ x: 50, y: 10 }, { x: 50, y: 20 }],
                [{ x: 25, y: 30 }, { x: 75, y: 30 }],
                [{ x: 50, y: 30 }, { x: 25, y: 85 }],
                [{ x: 50, y: 30 }, { x: 75, y: 85 }]
            ]
        },
        {
            char: 'ㅋ',
            name: 'keu',
            sound: '크',
            romanization: 'k',
            strokes: [
                [{ x: 20, y: 25 }, { x: 80, y: 25 }],
                [{ x: 80, y: 25 }, { x: 80, y: 80 }],
                [{ x: 20, y: 55 }, { x: 80, y: 55 }]
            ]
        },
        {
            char: 'ㅌ',
            name: 'teu',
            sound: '트',
            romanization: 't',
            strokes: [
                [{ x: 20, y: 20 }, { x: 80, y: 20 }],
                [{ x: 20, y: 50 }, { x: 80, y: 50 }],
                [{ x: 20, y: 20 }, { x: 20, y: 80 }],
                [{ x: 20, y: 80 }, { x: 80, y: 80 }]
            ]
        },
        {
            char: 'ㅍ',
            name: 'peu',
            sound: '프',
            romanization: 'p',
            strokes: [
                [{ x: 20, y: 25 }, { x: 80, y: 25 }],
                [{ x: 35, y: 25 }, { x: 35, y: 75 }],
                [{ x: 65, y: 25 }, { x: 65, y: 75 }],
                [{ x: 20, y: 75 }, { x: 80, y: 75 }]
            ]
        },
        {
            char: 'ㅎ',
            name: 'heu',
            sound: '흐',
            romanization: 'h',
            strokes: [
                [{ x: 50, y: 10 }, { x: 50, y: 15 }],
                [{ x: 25, y: 25 }, { x: 75, y: 25 }],
                [{ x: 50, y: 40 }, { x: 70, y: 55 }, { x: 70, y: 70 }, { x: 50, y: 85 }, { x: 30, y: 70 }, { x: 30, y: 55 }, { x: 50, y: 40 }]
            ]
        }
    ],
    vowels: [
        {
            char: 'ㅏ',
            name: 'a',
            sound: '아',
            romanization: 'a',
            strokes: [
                [{ x: 35, y: 15 }, { x: 35, y: 85 }],
                [{ x: 35, y: 50 }, { x: 75, y: 50 }]
            ]
        },
        {
            char: 'ㅑ',
            name: 'ya',
            sound: '야',
            romanization: 'ya',
            strokes: [
                [{ x: 30, y: 15 }, { x: 30, y: 85 }],
                [{ x: 30, y: 35 }, { x: 70, y: 35 }],
                [{ x: 30, y: 65 }, { x: 70, y: 65 }]
            ]
        },
        {
            char: 'ㅓ',
            name: 'eo',
            sound: '어',
            romanization: 'eo',
            strokes: [
                [{ x: 65, y: 15 }, { x: 65, y: 85 }],
                [{ x: 25, y: 50 }, { x: 65, y: 50 }]
            ]
        },
        {
            char: 'ㅕ',
            name: 'yeo',
            sound: '여',
            romanization: 'yeo',
            strokes: [
                [{ x: 70, y: 15 }, { x: 70, y: 85 }],
                [{ x: 30, y: 35 }, { x: 70, y: 35 }],
                [{ x: 30, y: 65 }, { x: 70, y: 65 }]
            ]
        },
        {
            char: 'ㅗ',
            name: 'o',
            sound: '오',
            romanization: 'o',
            strokes: [
                [{ x: 50, y: 25 }, { x: 50, y: 55 }],
                [{ x: 15, y: 55 }, { x: 85, y: 55 }]
            ]
        },
        {
            char: 'ㅛ',
            name: 'yo',
            sound: '요',
            romanization: 'yo',
            strokes: [
                [{ x: 35, y: 25 }, { x: 35, y: 55 }],
                [{ x: 65, y: 25 }, { x: 65, y: 55 }],
                [{ x: 15, y: 55 }, { x: 85, y: 55 }]
            ]
        },
        {
            char: 'ㅜ',
            name: 'u',
            sound: '우',
            romanization: 'u',
            strokes: [
                [{ x: 15, y: 45 }, { x: 85, y: 45 }],
                [{ x: 50, y: 45 }, { x: 50, y: 75 }]
            ]
        },
        {
            char: 'ㅠ',
            name: 'yu',
            sound: '유',
            romanization: 'yu',
            strokes: [
                [{ x: 15, y: 45 }, { x: 85, y: 45 }],
                [{ x: 35, y: 45 }, { x: 35, y: 75 }],
                [{ x: 65, y: 45 }, { x: 65, y: 75 }]
            ]
        },
        {
            char: 'ㅡ',
            name: 'eu',
            sound: '으',
            romanization: 'eu',
            strokes: [
                [{ x: 15, y: 50 }, { x: 85, y: 50 }]
            ]
        },
        {
            char: 'ㅣ',
            name: 'i',
            sound: '이',
            romanization: 'i',
            strokes: [
                [{ x: 50, y: 15 }, { x: 50, y: 85 }]
            ]
        }
    ],
    'double-consonants': [
        {
            char: 'ㄲ',
            name: 'ggeu',
            sound: '끄',
            romanization: 'kk',
            strokes: [
                [{ x: 10, y: 25 }, { x: 40, y: 25 }],
                [{ x: 40, y: 25 }, { x: 40, y: 80 }],
                [{ x: 55, y: 25 }, { x: 85, y: 25 }],
                [{ x: 85, y: 25 }, { x: 85, y: 80 }]
            ]
        },
        {
            char: 'ㄸ',
            name: 'ddeu',
            sound: '뜨',
            romanization: 'tt',
            strokes: [
                [{ x: 10, y: 25 }, { x: 45, y: 25 }],
                [{ x: 10, y: 25 }, { x: 10, y: 75 }],
                [{ x: 10, y: 75 }, { x: 45, y: 75 }],
                [{ x: 55, y: 25 }, { x: 90, y: 25 }],
                [{ x: 55, y: 25 }, { x: 55, y: 75 }],
                [{ x: 55, y: 75 }, { x: 90, y: 75 }]
            ]
        },
        {
            char: 'ㅃ',
            name: 'bbeu',
            sound: '쁘',
            romanization: 'pp',
            strokes: [
                [{ x: 12, y: 20 }, { x: 12, y: 80 }],
                [{ x: 38, y: 20 }, { x: 38, y: 80 }],
                [{ x: 12, y: 50 }, { x: 38, y: 50 }],
                [{ x: 12, y: 80 }, { x: 38, y: 80 }],
                [{ x: 62, y: 20 }, { x: 62, y: 80 }],
                [{ x: 88, y: 20 }, { x: 88, y: 80 }],
                [{ x: 62, y: 50 }, { x: 88, y: 50 }],
                [{ x: 62, y: 80 }, { x: 88, y: 80 }]
            ]
        },
        {
            char: 'ㅆ',
            name: 'sseu',
            sound: '쓰',
            romanization: 'ss',
            strokes: [
                [{ x: 25, y: 20 }, { x: 10, y: 80 }],
                [{ x: 25, y: 20 }, { x: 40, y: 80 }],
                [{ x: 75, y: 20 }, { x: 60, y: 80 }],
                [{ x: 75, y: 20 }, { x: 90, y: 80 }]
            ]
        },
        {
            char: 'ㅉ',
            name: 'jjeu',
            sound: '쯔',
            romanization: 'jj',
            strokes: [
                [{ x: 10, y: 25 }, { x: 45, y: 25 }],
                [{ x: 27, y: 25 }, { x: 12, y: 80 }],
                [{ x: 27, y: 25 }, { x: 42, y: 80 }],
                [{ x: 55, y: 25 }, { x: 90, y: 25 }],
                [{ x: 72, y: 25 }, { x: 57, y: 80 }],
                [{ x: 72, y: 25 }, { x: 87, y: 80 }]
            ]
        }
    ],
    'complex-vowels': [
        {
            char: 'ㅐ',
            name: 'ae',
            sound: '애',
            romanization: 'ae',
            strokes: [
                [{ x: 25, y: 15 }, { x: 25, y: 85 }],
                [{ x: 25, y: 50 }, { x: 55, y: 50 }],
                [{ x: 70, y: 15 }, { x: 70, y: 85 }]
            ]
        },
        {
            char: 'ㅒ',
            name: 'yae',
            sound: '얘',
            romanization: 'yae',
            strokes: [
                [{ x: 20, y: 15 }, { x: 20, y: 85 }],
                [{ x: 20, y: 35 }, { x: 50, y: 35 }],
                [{ x: 20, y: 65 }, { x: 50, y: 65 }],
                [{ x: 70, y: 15 }, { x: 70, y: 85 }]
            ]
        },
        {
            char: 'ㅔ',
            name: 'e',
            sound: '에',
            romanization: 'e',
            strokes: [
                [{ x: 30, y: 15 }, { x: 30, y: 85 }],
                [{ x: 30, y: 50 }, { x: 55, y: 50 }],
                [{ x: 75, y: 15 }, { x: 75, y: 85 }]
            ]
        },
        {
            char: 'ㅖ',
            name: 'ye',
            sound: '예',
            romanization: 'ye',
            strokes: [
                [{ x: 20, y: 15 }, { x: 20, y: 85 }],
                [{ x: 20, y: 35 }, { x: 50, y: 35 }],
                [{ x: 20, y: 65 }, { x: 50, y: 65 }],
                [{ x: 75, y: 15 }, { x: 75, y: 85 }]
            ]
        },
        {
            char: 'ㅘ',
            name: 'wa',
            sound: '와',
            romanization: 'wa',
            strokes: [
                [{ x: 25, y: 25 }, { x: 25, y: 45 }],
                [{ x: 10, y: 45 }, { x: 45, y: 45 }],
                [{ x: 60, y: 15 }, { x: 60, y: 85 }],
                [{ x: 60, y: 50 }, { x: 90, y: 50 }]
            ]
        },
        {
            char: 'ㅙ',
            name: 'wae',
            sound: '왜',
            romanization: 'wae',
            strokes: [
                [{ x: 15, y: 25 }, { x: 15, y: 45 }],
                [{ x: 5, y: 45 }, { x: 30, y: 45 }],
                [{ x: 45, y: 15 }, { x: 45, y: 85 }],
                [{ x: 45, y: 50 }, { x: 65, y: 50 }],
                [{ x: 80, y: 15 }, { x: 80, y: 85 }]
            ]
        },
        {
            char: 'ㅚ',
            name: 'oe',
            sound: '외',
            romanization: 'oe',
            strokes: [
                [{ x: 25, y: 25 }, { x: 25, y: 45 }],
                [{ x: 10, y: 45 }, { x: 45, y: 45 }],
                [{ x: 70, y: 15 }, { x: 70, y: 85 }]
            ]
        },
        {
            char: 'ㅝ',
            name: 'wo',
            sound: '워',
            romanization: 'wo',
            strokes: [
                [{ x: 10, y: 45 }, { x: 45, y: 45 }],
                [{ x: 25, y: 45 }, { x: 25, y: 70 }],
                [{ x: 60, y: 15 }, { x: 60, y: 85 }],
                [{ x: 60, y: 50 }, { x: 90, y: 50 }]
            ]
        },
        {
            char: 'ㅞ',
            name: 'we',
            sound: '웨',
            romanization: 'we',
            strokes: [
                [{ x: 5, y: 45 }, { x: 30, y: 45 }],
                [{ x: 17, y: 45 }, { x: 17, y: 70 }],
                [{ x: 45, y: 15 }, { x: 45, y: 85 }],
                [{ x: 45, y: 50 }, { x: 65, y: 50 }],
                [{ x: 80, y: 15 }, { x: 80, y: 85 }]
            ]
        },
        {
            char: 'ㅟ',
            name: 'wi',
            sound: '위',
            romanization: 'wi',
            strokes: [
                [{ x: 10, y: 45 }, { x: 45, y: 45 }],
                [{ x: 25, y: 45 }, { x: 25, y: 70 }],
                [{ x: 70, y: 15 }, { x: 70, y: 85 }]
            ]
        },
        {
            char: 'ㅢ',
            name: 'ui',
            sound: '의',
            romanization: 'ui',
            strokes: [
                [{ x: 10, y: 50 }, { x: 45, y: 50 }],
                [{ x: 70, y: 15 }, { x: 70, y: 85 }]
            ]
        }
    ]
};

export const getCategoryData = (categoryId) => {
    return hangulData[categoryId] || [];
};

export const getCategoryInfo = (categoryId) => {
    const info = {
        'consonants': { title: '자음', subtitle: 'Consonants', accent: '#FF6B6B' },
        'vowels': { title: '모음', subtitle: 'Vowels', accent: '#4ECDC4' },
        'double-consonants': { title: '쌍자음', subtitle: 'Double Consonants', accent: '#FFB347' },
        'complex-vowels': { title: '복합모음', subtitle: 'Complex Vowels', accent: '#9B8BF4' }
    };
    return info[categoryId] || { title: '', subtitle: '', accent: '#666' };
};