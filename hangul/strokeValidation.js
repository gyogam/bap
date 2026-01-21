// Advanced Hangul Stroke Validation with DTW (Dynamic Time Warping)

/**
 * Normalize a stroke to a fixed number of points for comparison
 */
export const normalizeStroke = (points, numPoints = 20) => {
    if (points.length < 2) return [];

    // Calculate total path length
    let totalLength = 0;
    for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        totalLength += Math.sqrt(dx * dx + dy * dy);
    }

    if (totalLength < 1) return [];

    // Resample to fixed number of points
    const normalized = [{ x: points[0].x, y: points[0].y }];
    const segmentLength = totalLength / (numPoints - 1);
    let currentLength = 0;
    let pointIndex = 0;

    for (let i = 1; i < numPoints; i++) {
        const targetLength = i * segmentLength;

        while (pointIndex < points.length - 1) {
            const dx = points[pointIndex + 1].x - points[pointIndex].x;
            const dy = points[pointIndex + 1].y - points[pointIndex].y;
            const segLen = Math.sqrt(dx * dx + dy * dy);

            if (currentLength + segLen >= targetLength) {
                const ratio = (targetLength - currentLength) / segLen;
                normalized.push({
                    x: points[pointIndex].x + dx * ratio,
                    y: points[pointIndex].y + dy * ratio
                });
                break;
            }

            currentLength += segLen;
            pointIndex++;
        }

        if (normalized.length <= i) {
            normalized.push({ ...points[points.length - 1] });
        }
    }

    return normalized;
};

/**
 * Normalize stroke to unit scale (0-1 range) and center
 */
export const scaleNormalizeStroke = (points) => {
    if (points.length < 2) return [];

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = maxX - minX;
    const height = maxY - minY;
    const scale = Math.max(width, height) || 1;

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return points.map(p => ({
        x: (p.x - centerX) / scale,
        y: (p.y - centerY) / scale
    }));
};

/**
 * Dynamic Time Warping distance between two sequences
 */
export const dtwDistance = (seq1, seq2) => {
    if (seq1.length === 0 || seq2.length === 0) return Infinity;

    const n = seq1.length;
    const m = seq2.length;

    // Create DTW matrix
    const dtw = Array(n + 1).fill(null).map(() => Array(m + 1).fill(Infinity));
    dtw[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const cost = Math.sqrt(
                Math.pow(seq1[i - 1].x - seq2[j - 1].x, 2) +
                Math.pow(seq1[i - 1].y - seq2[j - 1].y, 2)
            );

            dtw[i][j] = cost + Math.min(
                dtw[i - 1][j],     // insertion
                dtw[i][j - 1],     // deletion
                dtw[i - 1][j - 1]  // match
            );
        }
    }

    return dtw[n][m] / Math.max(n, m); // Normalize by path length
};

/**
 * Calculate stroke direction (returns angle in degrees)
 */
export const getStrokeDirection = (points) => {
    if (points.length < 2) return null;

    const start = points[0];
    const end = points[points.length - 1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Angle in degrees (0 = right, 90 = down, 180 = left, 270 = up)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    return angle;
};

/**
 * Classify stroke direction
 */
export const classifyDirection = (angle) => {
    if (angle === null) return 'unknown';

    // Normalize to 0-360
    angle = ((angle % 360) + 360) % 360;

    // Define direction ranges with tolerance
    if (angle >= 315 || angle < 45) return 'right';      // →
    if (angle >= 45 && angle < 135) return 'down';       // ↓
    if (angle >= 135 && angle < 225) return 'left';      // ←
    if (angle >= 225 && angle < 315) return 'up';        // ↑

    return 'unknown';
};

/**
 * Check if stroke is predominantly straight or curved
 */
export const getStrokeCurvature = (points) => {
    if (points.length < 3) return 0;

    const start = points[0];
    const end = points[points.length - 1];
    const directDistance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    // Calculate actual path length
    let pathLength = 0;
    for (let i = 1; i < points.length; i++) {
        pathLength += Math.sqrt(
            Math.pow(points[i].x - points[i - 1].x, 2) +
            Math.pow(points[i].y - points[i - 1].y, 2)
        );
    }

    if (directDistance < 1) return Infinity; // Circular

    return pathLength / directDistance; // 1.0 = perfectly straight, higher = more curved
};

/**
 * Check if stroke forms a closed loop (like ㅇ)
 */
export const isClosedLoop = (points) => {
    if (points.length < 5) return false;

    const start = points[0];
    const end = points[points.length - 1];

    const distance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    // Calculate bounding box
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);
    const diagonal = Math.sqrt(width * width + height * height);

    // If start and end are close relative to the size, it's a loop
    return distance < diagonal * 0.3 && diagonal > 10;
};

/**
 * Define expected stroke patterns for each character
 */
export const strokePatterns = {
    'ㄱ': {
        strokeCount: 2,
        strokes: [
            { direction: 'right', type: 'straight' },
            { direction: 'down', type: 'straight' }
        ],
        aspectRatio: { min: 0.5, max: 2.0 },
        isAngular: true
    },
    'ㄴ': {
        strokeCount: 2,
        strokes: [
            { direction: 'down', type: 'straight' },
            { direction: 'right', type: 'straight' }
        ],
        aspectRatio: { min: 0.5, max: 2.0 },
        isAngular: true
    },
    'ㄷ': {
        strokeCount: 3,
        strokes: [
            { direction: 'right', type: 'straight' },
            { direction: 'down', type: 'straight' },
            { direction: 'right', type: 'straight' }
        ],
        aspectRatio: { min: 0.4, max: 2.5 },
        isAngular: true
    },
    'ㄹ': {
        strokeCount: 6,
        minStrokes: 4,
        isAngular: true
    },
    'ㅁ': {
        strokeCount: 4,
        minStrokes: 3,
        aspectRatio: { min: 0.6, max: 1.6 },
        isAngular: true
    },
    'ㅂ': {
        strokeCount: 4,
        minStrokes: 3,
        isAngular: true
    },
    'ㅅ': {
        strokeCount: 2,
        strokes: [
            { direction: 'down', type: 'straight' },
            { direction: 'down', type: 'straight' }
        ],
        isAngular: true
    },
    'ㅇ': {
        strokeCount: 1,
        strokes: [
            { type: 'loop' }
        ],
        aspectRatio: { min: 0.7, max: 1.4 },
        isCircular: true
    },
    'ㅈ': {
        strokeCount: 3,
        minStrokes: 2,
        isAngular: true
    },
    'ㅊ': {
        strokeCount: 4,
        minStrokes: 3,
        isAngular: true
    },
    'ㅋ': {
        strokeCount: 3,
        minStrokes: 2,
        isAngular: true
    },
    'ㅌ': {
        strokeCount: 4,
        minStrokes: 3,
        isAngular: true
    },
    'ㅍ': {
        strokeCount: 4,
        minStrokes: 3,
        isAngular: true
    },
    'ㅎ': {
        strokeCount: 3,
        minStrokes: 2,
        hasCircularPart: true
    },
    // Vowels
    'ㅏ': { strokeCount: 2, minStrokes: 2, isAngular: true },
    'ㅑ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅓ': { strokeCount: 2, minStrokes: 2, isAngular: true },
    'ㅕ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅗ': { strokeCount: 2, minStrokes: 2, isAngular: true },
    'ㅛ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅜ': { strokeCount: 2, minStrokes: 2, isAngular: true },
    'ㅠ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅡ': { strokeCount: 1, minStrokes: 1, isAngular: true },
    'ㅣ': { strokeCount: 1, minStrokes: 1, isAngular: true },
    // Double consonants
    'ㄲ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㄸ': { strokeCount: 6, minStrokes: 4, isAngular: true },
    'ㅃ': { strokeCount: 8, minStrokes: 5, isAngular: true },
    'ㅆ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㅉ': { strokeCount: 6, minStrokes: 4, isAngular: true },
    // Complex vowels
    'ㅐ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅒ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㅔ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅖ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㅘ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㅙ': { strokeCount: 5, minStrokes: 4, isAngular: true },
    'ㅚ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅝ': { strokeCount: 4, minStrokes: 3, isAngular: true },
    'ㅞ': { strokeCount: 5, minStrokes: 4, isAngular: true },
    'ㅟ': { strokeCount: 3, minStrokes: 2, isAngular: true },
    'ㅢ': { strokeCount: 2, minStrokes: 2, isAngular: true }
};

/**
 * Image-based shape similarity using canvas rasterization
 * Simulates CNN-like comparison by comparing rendered shapes
 */
const calculateImageSimilarity = (userStrokes, templateStrokes, canvasSize = 64) => {
    // Create virtual canvases for comparison
    const renderToGrid = (strokes, size) => {
        const grid = Array(size).fill(null).map(() => Array(size).fill(0));

        for (const stroke of strokes) {
            for (let i = 1; i < stroke.length; i++) {
                const x0 = Math.floor((stroke[i-1].x / 100) * size);
                const y0 = Math.floor((stroke[i-1].y / 100) * size);
                const x1 = Math.floor((stroke[i].x / 100) * size);
                const y1 = Math.floor((stroke[i].y / 100) * size);

                // Bresenham's line algorithm
                const dx = Math.abs(x1 - x0);
                const dy = Math.abs(y1 - y0);
                const sx = x0 < x1 ? 1 : -1;
                const sy = y0 < y1 ? 1 : -1;
                let err = dx - dy;
                let x = x0, y = y0;

                while (true) {
                    if (x >= 0 && x < size && y >= 0 && y < size) {
                        grid[y][x] = 1;
                        // Add thickness
                        for (let ty = -1; ty <= 1; ty++) {
                            for (let tx = -1; tx <= 1; tx++) {
                                const ny = y + ty, nx = x + tx;
                                if (ny >= 0 && ny < size && nx >= 0 && nx < size) {
                                    grid[ny][nx] = 1;
                                }
                            }
                        }
                    }
                    if (x === x1 && y === y1) break;
                    const e2 = 2 * err;
                    if (e2 > -dy) { err -= dy; x += sx; }
                    if (e2 < dx) { err += dx; y += sy; }
                }
            }
        }
        return grid;
    };

    const userGrid = renderToGrid(userStrokes, canvasSize);
    const templateGrid = renderToGrid(templateStrokes, canvasSize);

    // Calculate IoU (Intersection over Union)
    let intersection = 0;
    let union = 0;

    for (let y = 0; y < canvasSize; y++) {
        for (let x = 0; x < canvasSize; x++) {
            if (userGrid[y][x] && templateGrid[y][x]) intersection++;
            if (userGrid[y][x] || templateGrid[y][x]) union++;
        }
    }

    const iou = union > 0 ? intersection / union : 0;

    // Calculate coverage (how much of template is covered)
    let templatePixels = 0;
    let coveredPixels = 0;

    for (let y = 0; y < canvasSize; y++) {
        for (let x = 0; x < canvasSize; x++) {
            if (templateGrid[y][x]) {
                templatePixels++;
                // Check if user covered nearby (with tolerance)
                let covered = false;
                for (let ty = -2; ty <= 2 && !covered; ty++) {
                    for (let tx = -2; tx <= 2 && !covered; tx++) {
                        const ny = y + ty, nx = x + tx;
                        if (ny >= 0 && ny < canvasSize && nx >= 0 && nx < canvasSize) {
                            if (userGrid[ny][nx]) covered = true;
                        }
                    }
                }
                if (covered) coveredPixels++;
            }
        }
    }

    const coverage = templatePixels > 0 ? coveredPixels / templatePixels : 0;

    return {
        iou,
        coverage,
        similarity: (iou * 0.4 + coverage * 0.6)
    };
};

/**
 * Main validation function - User-friendly hybrid approach
 * Hard constraint: stroke count
 * Soft scoring: DTW similarity + Image-based matching
 */
export const validateHandwriting = (userStrokes, character, templateStrokes) => {
    const pattern = strokePatterns[character];
    if (!pattern) {
        // Unknown character - use lenient validation
        return { valid: userStrokes.length > 0, reason: 'Unknown character', score: 0.5 };
    }

    const result = {
        valid: false,
        score: 0,
        details: {},
        reason: ''
    };

    // ========== HARD CONSTRAINT: STROKE COUNT ==========
    const minStrokes = pattern.minStrokes || Math.max(1, pattern.strokeCount - 1);
    const maxStrokes = pattern.strokeCount + 3;

    if (userStrokes.length < minStrokes) {
        result.reason = `Need more strokes`;
        return result;
    }

    // Collect all points
    const allPoints = userStrokes.flat();
    if (allPoints.length < 5) {
        result.reason = 'Draw more';
        return result;
    }

    // Check drawing size
    const xs = allPoints.map(p => p.x);
    const ys = allPoints.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);

    if (width < 8 && height < 8) {
        result.reason = 'Drawing too small';
        return result;
    }

    // ========== STRUCTURAL CHECK: CIRCULAR VS ANGULAR ==========
    let hasLoop = false;
    for (const stroke of userStrokes) {
        if (isClosedLoop(stroke)) {
            hasLoop = true;
            break;
        }
    }

    // Critical mismatch - drawing circle for angular character
    if (pattern.isAngular && !pattern.hasCircularPart && hasLoop && userStrokes.length <= 2) {
        result.reason = 'Wrong shape';
        result.score = 0.2;
        return result;
    }

    // Critical mismatch - drawing angular for circular character
    if (pattern.isCircular && !hasLoop) {
        result.reason = 'Need circular shape';
        result.score = 0.2;
        return result;
    }

    // ========== SOFT SCORING: DTW SIMILARITY ==========
    let dtwScore = 0.5; // Default

    if (templateStrokes && templateStrokes.length > 0) {
        let totalDistance = 0;
        let matchedCount = 0;

        for (const userStroke of userStrokes) {
            const normalizedUser = scaleNormalizeStroke(normalizeStroke(userStroke, 16));
            if (normalizedUser.length === 0) continue;

            let bestDistance = Infinity;
            for (const templateStroke of templateStrokes) {
                const normalizedTemplate = scaleNormalizeStroke(normalizeStroke(templateStroke, 16));
                if (normalizedTemplate.length === 0) continue;

                const dist = dtwDistance(normalizedUser, normalizedTemplate);
                if (dist < bestDistance) bestDistance = dist;
            }

            if (bestDistance < Infinity) {
                totalDistance += bestDistance;
                matchedCount++;
            }
        }

        if (matchedCount > 0) {
            const avgDist = totalDistance / matchedCount;
            dtwScore = Math.max(0, Math.min(1, 1 - avgDist / 1.2));
        }
    }

    result.details.dtwScore = dtwScore;

    // ========== SOFT SCORING: IMAGE SIMILARITY (CNN-like) ==========
    let imageScore = 0.5;

    if (templateStrokes && templateStrokes.length > 0) {
        const imgResult = calculateImageSimilarity(userStrokes, templateStrokes);
        imageScore = imgResult.similarity;
        result.details.imageIoU = imgResult.iou;
        result.details.imageCoverage = imgResult.coverage;
    }

    result.details.imageScore = imageScore;

    // ========== SOFT SCORING: STROKE COUNT CLOSENESS ==========
    const strokeDiff = Math.abs(userStrokes.length - pattern.strokeCount);
    const strokeScore = Math.max(0, 1 - strokeDiff / pattern.strokeCount);
    result.details.strokeScore = strokeScore;

    // ========== CALCULATE WEIGHTED CONFIDENCE SCORE ==========
    const weights = {
        dtw: 0.3,
        image: 0.45,
        stroke: 0.25
    };

    result.score =
        dtwScore * weights.dtw +
        imageScore * weights.image +
        strokeScore * weights.stroke;

    // ========== DETERMINE PASS/FAIL ==========
    // More lenient threshold for natural handwriting variation
    const PASS_THRESHOLD = 0.35;

    if (result.score >= PASS_THRESHOLD) {
        result.valid = true;
        result.reason = 'Good!';
    } else {
        result.reason = 'Try again';
    }

    return result;
};