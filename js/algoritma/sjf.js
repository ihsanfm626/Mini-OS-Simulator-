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
