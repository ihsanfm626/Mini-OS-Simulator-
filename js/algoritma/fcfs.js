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
