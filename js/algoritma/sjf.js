/**
 * Algoritma CPU Scheduling: Shortest Job First (SJF) Non-Preemptive
 */

function runSJF(processes) {
    if (!processes || processes.length === 0) {
        return {
            timeline: [],
            metrics: [],
            averages: { avgCT: 0, avgTAT: 0, avgWT: 0, avgRT: 0 },
            steps: []
        };
    }
    // menyalin proses
    const procs = processes.map((p, idx) => ({
        id: p.id,
        at: Number(p.at),
        bt: Number(p.bt),
        originalIndex: idx,
        isCompleted: false
    }));

    const timeline = [];
    const metricsMap = {};
    const steps = [];
    let currentTime = 0;
    let completedCount = 0;
    let stepCount = 0;

    procs.forEach(p => {
        metricsMap[p.id] = {
            id: p.id,
            at: p.at,
            bt: p.bt,
            startTime: -1,
            ct: 0,
            tat: 0,
            wt: 0,
            rt: 0
        };
    });
    while (completedCount < procs.length) {
        // Cari proses yang sudah tiba dan belum selesai
        const readyQueue = procs.filter(p => !p.isCompleted && p.at <= currentTime);

        if (readyQueue.length === 0) {
            // CPU idle sampai ada proses berikutnya yang tiba
            const remaining = procs.filter(p => !p.isCompleted);
            const nextArrival = Math.min(...remaining.map(p => p.at));

            timeline.push({
                id: 'Idle',
                start: currentTime,
                end: nextArrival,
                duration: nextArrival - currentTime,
                isIdle: true
            });

            stepCount++;
            steps.push({
                step: stepCount,
                timeStart: currentTime,
                timeEnd: nextArrival,
                currentProcess: 'Idle',
                isIdle: true,
                description: `CPU menganggur (idle) dari waktu ${currentTime} hingga ${nextArrival} karena belum ada proses dalam antrean siap.`
            });

            currentTime = nextArrival;
            continue;
        }
        
        // Pilih proses dengan Burst Time terpendek (Non-Preemptive)
        // Jika BT sama, pilih AT terkecil, jika AT sama, pilih original index
        readyQueue.sort((a, b) => a.bt - b.bt || a.at - b.at || a.originalIndex - b.originalIndex);
        const selected = readyQueue[0];

        const start = currentTime;
        const end = currentTime + selected.bt;

        timeline.push({
            id: selected.id,
            start: start,
            end: end,
            duration: selected.bt,
            isIdle: false
        });

        metricsMap[selected.id].startTime = start;
        metricsMap[selected.id].ct = end;
        metricsMap[selected.id].tat = end - selected.at;
        metricsMap[selected.id].wt = metricsMap[selected.id].tat - selected.bt;
        metricsMap[selected.id].rt = start - selected.at;

        // Siapkan deskripsi proses yang siap
        const readyListDesc = readyQueue
            .map(p => `${p.id} (BT: ${p.bt})`)
            .join(', ');

        stepCount++;
        steps.push({
            step: stepCount,
            timeStart: start,
            timeEnd: end,
            currentProcess: selected.id,
            isIdle: false,
            description: `Proses ${selected.id} dipilih karena memiliki Burst Time terpendek (${selected.bt}) di antara proses yang siap: [${readyListDesc}]. Berjalan sampai selesai pada waktu ${end}.`
        });

        selected.isCompleted = true;
        completedCount++;
        currentTime = end;
    }
