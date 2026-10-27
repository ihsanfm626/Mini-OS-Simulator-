/**
 * Algoritma CPU Scheduling: Round Robin
 * /
 * 
 * function runRoundRobin(processes, quantum) {
 *     const q = parseInt(quantum, 10);
 *     if (!processes || processes.length === 0 || isNaN(q) || q <= 0) {
 *         return {
 *             timeline: [],
 *             metrics: [],
 *             averages: { avgCT: 0, avgTAT: 0, avgWT: 0, avgRT: 0 },
 *             steps: []
 *         };
 *     }
 * 
 *      // Salin proses (biar gak ngerusak data input asli)
 *      const procs = processes.map((p, idx) => ({ 
 *          id: p.id,
 *          at: Number(p.at),
 *          bt: Number(p.bt),
 *          remainingTime: Number(p.bt),
 *          originalIndex: idx
 *          isCompleted: false
 *      }));
 *   