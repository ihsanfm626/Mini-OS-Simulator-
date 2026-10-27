/**
 * Algoritma CPU Scheduling: First-Come, First-Served (FCFS)
 */

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
