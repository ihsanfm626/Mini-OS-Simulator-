/**
 * Algoritma Page Replacement: Optimal (OPT / MIN)
 **/

function runOptimal(referenceString, frameCount) {
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
    const steps = [];
    let pageFaults = 0;
    let pageHits = 0;

    referenceString.forEach((page, stepIndex) => {
        const stepNum = stepIndex + 1;
        const existingIndex = frames.indexOf(page);

        if (existingIndex !== -1) {
            // Page Hit
            pageHits++;
            steps.push({
                step: stepNum,
                page: page,
                frames: [...frames],
                status: 'HIT',
                replacedPage: null,
                targetFrameIndex: existingIndex,
                description: `Halaman ${page} sudah ada di Frame ${existingIndex + 1}. Terjadi Page Hit.`
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
                // Semua frame penuh: periksa masa depan (Optimal lookahead)
                let farthestDistance = -1;
                let victimFrameIndex = 0;
                let victimPage = frames[0];
                let reasonDetail = '';

                // Periksa setiap halaman yang ada di frame saat ini
                for (let i = 0; i < frames.length; i++) {
                    const currentInFrame = frames[i];
                    let nextUseIndex = -1;

                    for (let j = stepIndex + 1; j < referenceString.length; j++) {
                        if (referenceString[j] === currentInFrame) {
                            nextUseIndex = j;
                            break;
                        }
                    }

                    if (nextUseIndex === -1) {
                        // Halaman ini tidak akan digunakan lagi di masa depan!
                        // Prioritas utama untuk diganti
                        farthestDistance = Infinity;
                        victimFrameIndex = i;
                        victimPage = currentInFrame;
                        reasonDetail = `tidak akan pernah digunakan lagi di masa depan`;
                        break; // Sudah menemukan halaman tak terpakai
                    } else {
                        const distance = nextUseIndex - stepIndex;
                        if (distance > farthestDistance) {
                            farthestDistance = distance;
                            victimFrameIndex = i;
                            victimPage = currentInFrame;
                            reasonDetail = `pemakaian berikutnya paling jauh di masa depan (pada langkah ${nextUseIndex + 1})`;
                        }
                    }
                }

                targetFrameIndex = victimFrameIndex;
                replacedPage = victimPage;
                frames[targetFrameIndex] = page;

                steps.push({
                    step: stepNum,
                    page: page,
                    frames: [...frames],
                    status: 'FAULT',
                    replacedPage: replacedPage,
                    targetFrameIndex: targetFrameIndex,
                    description: `Halaman ${page} tidak ada di memori (Page Fault). Halaman ${replacedPage} di Frame ${targetFrameIndex + 1} diganti karena ${reasonDetail} (Algoritma Optimal).`
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
