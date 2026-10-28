/**
 * Algoritma Page Replacement: Least Recently Used (LRU)
 */

function runLRU(referenceString, frameCount) {
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
    const lastUsedMap = {}; // page -> stepNumber terakhir diakses
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;

    referenceString.forEach((page, stepIndex) => {
        const stepNum = stepIndex + 1;
        const existingIndex = frames.indexOf(page);

        if (existingIndex !== -1) {
            // Page Hit
            pageHits++;
            const prevAccess = lastUsedMap[page];
            lastUsedMap[page] = stepNum;

            steps.push({
                step: stepNum,
                page: page,
                frames: [...frames],
                status: 'HIT',
                replacedPage: null,
                targetFrameIndex: existingIndex,
                description: `Halaman ${page} sudah ada di Frame ${existingIndex + 1}. Terjadi Page Hit. Catatan waktu akses terakhir diperbarui ke langkah ${stepNum}.`
            });
        } else {
            // Page Fault
            pageFaults++;
            let targetFrameIndex;
            let replacedPage = null;

            const emptyFrameIndex = frames.indexOf(null);
            if (emptyFrameIndex !== -1) {
                targetFrameIndex = emptyFrameIndex;
                frames[targetFrameIndex] = page;
                lastUsedMap[page] = stepNum;

                steps.push({
                    step: stepNum,
                    page: page,
                    frames: [...frames],
                    status: 'FAULT',
                    replacedPage: null,
                    targetFrameIndex: targetFrameIndex,
                    description: `Halaman ${page} belum ada di memori (Page Fault). Ditempatkan pada Frame ${targetFrameIndex + 1} yang masih kosong.`
                });
            } else {
                // Semua frame terisi, cari halaman yang paling lama tidak digunakan (minimum lastUsed)
                let lruPage = frames[0];
                let minStep = lastUsedMap[lruPage];
                targetFrameIndex = 0;

                for (let i = 1; i < frames.length; i++) {
                    const p = frames[i];
                    if (lastUsedMap[p] < minStep) {
                        minStep = lastUsedMap[p];
                        lruPage = p;
                        targetFrameIndex = i;
                    }
                }

                replacedPage = lruPage;
                frames[targetFrameIndex] = page;
                lastUsedMap[page] = stepNum;

                steps.push({
                    step: stepNum,
                    page: page,
                    frames: [...frames],
                    status: 'FAULT',
                    replacedPage: replacedPage,
                    targetFrameIndex: targetFrameIndex,
                    description: `Halaman ${page} tidak ada di memori (Page Fault). Halaman ${replacedPage} di Frame ${targetFrameIndex + 1} diganti karena paling lama tidak digunakan (terakhir diakses pada langkah ${minStep}).`
                });
            }
        }
    });

    const total = referenceString.length;
    const hitRatio = Number(((pageHits / total) * 100).toFixed(2));
    const faultRatio = Number(((pageFaults / total) * 100).toFixed(2));

    return {
        steps,
        metrics: {
            pageFaults,
            pageHits,
            totalReferences: total,
            hitRatio,
            faultRatio
        }
    };
}

if (typeof window !== 'undefined') {
    window.runLRU = runLRU;
}
