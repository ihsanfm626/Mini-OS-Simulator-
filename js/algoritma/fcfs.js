/**
 * Algoritma CPU Scheduling: First-Come, First-Served (FCFS)
 **/

function runFCFS(processes) {
    if (!processes || processes.length === 0) {
        return {
            timeline: [],
            metrics: [],
            averages: { avgCT: 0, avgTAT: 0, avgWT: 0, avgRT: 0 },
            steps: []
        };
    }

    // Proses disalin (biar gak ngerusak data input asli)
    const procs = processes.map(p => ({
        id: p.id,
        at: Number(p.at),
        bt: Number(p.bt),
        originalIndex: p.originalIndex !== undefined ? p.originalIndex : 0
    }));

    // diurutkan sesuai Arrival Time, kalo sama sesuai urutan input
    procs.sort((a, b) => a.at - b.at || a.originalIndex - b.originalIndex);

    const timeline = [];
    const metricsMap = {};
    const steps = [];
    let currentTime = 0;
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

    for (let i = 0; i < procs.length; i++) {
        const p = procs[i];

        // Jika CPU menganggur (idle) sebelum proses tiba
        if (currentTime < p.at) {
            const idleDuration = p.at - currentTime;
            timeline.push({
                id: 'Idle',
                start: currentTime,
                end: p.at,
                duration: idleDuration,
                isIdle: true
            });

            stepCount++;
            steps.push({
                step: stepCount,
                timeStart: currentTime,
                timeEnd: p.at,
                currentProcess: 'Idle',
                isIdle: true,
                description: `CPU menganggur (idle) dari waktu ${currentTime} hingga ${p.at} karena belum ada proses yang tiba di antrean siap.`
            });

            currentTime = p.at;
        }

        const start = currentTime;
        const end = currentTime + p.bt;
        const firstStart = start;

        timeline.push({
            id: p.id,
            start: start,
            end: end,
            duration: p.bt,
            isIdle: false
        });

        metricsMap[p.id].startTime = firstStart;
        metricsMap[p.id].ct = end;
        metricsMap[p.id].tat = end - p.at;
        metricsMap[p.id].wt = metricsMap[p.id].tat - p.bt;
        metricsMap[p.id].rt = firstStart - p.at;

        stepCount++;
        steps.push({
            step: stepCount,
            timeStart: start,
            timeEnd: end,
            currentProcess: p.id,
            isIdle: false,
            description: `Proses ${p.id} dipilih karena memiliki waktu kedatangan paling awal (AT = ${p.at}) di antara proses yang siap. Dieksekusi hingga selesai pada waktu ${end}.`
        });

        currentTime = end;
    }

    // Kembalikan metrik sesuai urutan input asli
    const metricsList = processes.map(orig => metricsMap[orig.id]);

    const totalCT = metricsList.reduce((acc, m) => acc + m.ct, 0);
    const totalTAT = metricsList.reduce((acc, m) => acc + m.tat, 0);
    const totalWT = metricsList.reduce((acc, m) => acc + m.wt, 0);
    const totalRT = metricsList.reduce((acc, m) => acc + m.rt, 0);
    const count = metricsList.length;

    return {
        timeline,
        metrics: metricsList,
        averages: {
            avgCT: Number((totalCT / count).toFixed(2)),
            avgTAT: Number((totalTAT / count).toFixed(2)),
            avgWT: Number((totalWT / count).toFixed(2)),
            avgRT: Number((totalRT / count).toFixed(2))
        },
        steps
    };
}

if (typeof window !== 'undefined') {
    window.runFCFS = runFCFS;
}
