/**
 * Algoritma CPU Scheduling: Round Robin (RR)
 * */
 
function runRoundRobin(processes, quantum) {
    const q = parseInt(quantum, 10);
    if (!processes || processes.length === 0 || isNaN(q) || q <= 0) {
        return {
            timeline: [],
            metrics: [],
            averages: { avgCT: 0, avgTAT: 0, avgWT: 0, avgRT: 0 },
            steps: []
        };
    }

    // Salin proses
    const procs = processes.map((p, idx) => ({
        id: p.id,
        at: Number(p.at),
        bt: Number(p.bt),
        remainingBT: Number(p.bt),
        originalIndex: idx,
        isCompleted: false
    }));

    // Urutkan berdasarkan Arrival Time untuk antrean masuk
    const sortedByArrival = [...procs].sort((a, b) => a.at - b.at || a.originalIndex - b.originalIndex);

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

    const readyQueue = [];
    const inQueueOrCompleted = new Set();

    // Masukkan proses awal yang sudah tiba pada currentTime = 0 (atau terawal)
    function enqueueArrived(time) {
        sortedByArrival.forEach(p => {
            if (p.at <= time && !inQueueOrCompleted.has(p.id)) {
                readyQueue.push(p);
                inQueueOrCompleted.add(p.id);
            }
        });
    }

    enqueueArrived(currentTime);

    while (completedCount < procs.length) {
        if (readyQueue.length === 0) {
            // CPU idle sampai kedatangan proses berikutnya
            const remaining = sortedByArrival.filter(p => !p.isCompleted && !inQueueOrCompleted.has(p.id));
            if (remaining.length > 0) {
                const nextArrival = remaining[0].at;
                const idleDuration = nextArrival - currentTime;

                timeline.push({
                    id: 'Idle',
                    start: currentTime,
                    end: nextArrival,
                    duration: idleDuration,
                    isIdle: true
                });

                stepCount++;
                steps.push({
                    step: stepCount,
                    timeStart: currentTime,
                    timeEnd: nextArrival,
                    currentProcess: 'Idle',
                    isIdle: true,
                    description: `CPU menganggur (idle) dari waktu ${currentTime} hingga ${nextArrival} karena tidak ada proses dalam antrean siap.`
                });

                currentTime = nextArrival;
                enqueueArrived(currentTime);
            }
            continue;
        }

        const currentProc = readyQueue.shift();

        // Catat first start time untuk Response Time jika baru pertama kali jalan
        if (metricsMap[currentProc.id].startTime === -1) {
            metricsMap[currentProc.id].startTime = currentTime;
        }

        const executeDuration = Math.min(q, currentProc.remainingBT);
        const startTime = currentTime;
        const endTime = currentTime + executeDuration;

        timeline.push({
            id: currentProc.id,
            start: startTime,
            end: endTime,
            duration: executeDuration,
            isIdle: false
        });

        currentProc.remainingBT -= executeDuration;

        // Proses yang tiba saat proses ini sedang dieksekusi (di rentang waktu startTime hingga endTime)
        // harus masuk antrean terlebih dahulu sebelum proses saat ini dimasukkan kembali
        sortedByArrival.forEach(p => {
            if (p.at > startTime && p.at <= endTime && !inQueueOrCompleted.has(p.id)) {
                readyQueue.push(p);
                inQueueOrCompleted.add(p.id);
            }
        });

        stepCount++;

        if (currentProc.remainingBT > 0) {
            // Masih ada sisa Burst Time -> masukkan kembali ke belakang antrean
            readyQueue.push(currentProc);
            steps.push({
                step: stepCount,
                timeStart: startTime,
                timeEnd: endTime,
                currentProcess: currentProc.id,
                isIdle: false,
                description: `Proses ${currentProc.id} berjalan selama Time Quantum (${executeDuration} unit waktu). Sisa Burst Time: ${currentProc.remainingBT}. Proses kembali ke belakang antrean siap.`
            });
        } else {
            // Proses selesai
            currentProc.isCompleted = true;
            completedCount++;
            metricsMap[currentProc.id].ct = endTime;
            metricsMap[currentProc.id].tat = endTime - currentProc.at;
            metricsMap[currentProc.id].wt = metricsMap[currentProc.id].tat - currentProc.bt;
            metricsMap[currentProc.id].rt = metricsMap[currentProc.id].startTime - currentProc.at;

            steps.push({
                step: stepCount,
                timeStart: startTime,
                timeEnd: endTime,
                currentProcess: currentProc.id,
                isIdle: false,
                description: `Proses ${currentProc.id} dieksekusi selama ${executeDuration} unit waktu dan telah SELESAI pada waktu ${endTime}. (CT: ${endTime}, TAT: ${metricsMap[currentProc.id].tat}, WT: ${metricsMap[currentProc.id].wt})`
            });
        }

        currentTime = endTime;
    }

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
    window.runRoundRobin = runRoundRobin;
}
 