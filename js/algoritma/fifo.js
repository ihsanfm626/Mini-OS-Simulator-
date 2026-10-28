/**
 * Algoritma Page Replacement: First-In, First-Out (FIFO)
 */

function runFIFO(referenceString, frameCount) {
    const framesNum = parseInt(frameCount, 10);
    if (!referenceString || referenceString.length === 0 || isNaN(framesNum) || framesNum <= 0) {
        return {
            steps: [],
            metrics: {
                pageFaults: 0,
                pageHits: 0,
                totalReferences: 0,
                hitRatio: 0,
                faultRatio: 0
            }
        };
    }

    const frames = new Array(framesNum).fill(null);
    const fifoQueue = [];
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;

    referenceString.forEach((page, index) => {
        const stepNUM = stepIndex + 1;
        const existingIndex = frames.indexOf(page);

        if (existingIndex !== -1) {
            // Page hit
            pageHits++;
            steps.push({
                step: stepNUM,
                page: page,
                frames: [...frames],
                status: 'Hit',
                replacedPage: null,
                targetFrameIndex: existingIndex
                description: 'Halaman ${page} sudah berada di frame ${existingIndex + 1}. Terjadi Page Hit (tidak ada halaman yang diganti).'
         });
        } else {
            pageFaults++;
            let targetFrameIndex;
            let replacedPage = null;

