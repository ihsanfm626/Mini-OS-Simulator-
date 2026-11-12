/**
 * comparison.js — Mini OS Simulator
 * Logika dan antarmuka perbandingan performa algoritma CPU Scheduling dan Page Replacement.
 * Mengacu pada F11 FITUR.md dan Bagian 6 DESAIN.md
 */

function compareCPUAlgorithms(processes, quantum = 2) {
    if (!processes || processes.length === 0) {
        return null;
    }

    const q = Math.max(1, parseInt(quantum, 10) || 2);

    const fcfsResult = runFCFS(processes);
    const sjfResult = runSJF(processes);
    const rrResult = runRoundRobin(processes, q);

    const results = [
        {
            name: 'FCFS',
            description: 'First-Come, First-Served',
            avgWT: fcfsResult.averages.avgWT,
            avgTAT: fcfsResult.averages.avgTAT,
            avgRT: fcfsResult.averages.avgRT,
            avgCT: fcfsResult.averages.avgCT
        },
        {
            name: 'SJF Non-Preemptive',
            description: 'Shortest Job First',
            avgWT: sjfResult.averages.avgWT,
            avgTAT: sjfResult.averages.avgTAT,
            avgRT: sjfResult.averages.avgRT,
            avgCT: sjfResult.averages.avgCT
        },
        {
            name: `Round Robin (Q = ${q})`,
            description: `Time Quantum: ${q}`,
            avgWT: rrResult.averages.avgWT,
            avgTAT: rrResult.averages.avgTAT,
            avgRT: rrResult.averages.avgRT,
            avgCT: rrResult.averages.avgCT
        }
    ];

    // Temukan yang terbaik secara spesifik berdasarkan metrik
    const minWT = Math.min(...results.map(r => r.avgWT));
    const minTAT = Math.min(...results.map(r => r.avgTAT));

    const bestWTAlgo = results.filter(r => r.avgWT === minWT).map(r => r.name).join(', ');
    const bestTATAlgo = results.filter(r => r.avgTAT === minTAT).map(r => r.name).join(', ');

    return {
        results,
        minWT,
        minTAT,
        bestWTAlgo,
        bestTATAlgo
    };
}

function compareMemoryAlgorithms(referenceString, frameCount = 3) {
    if (!referenceString || referenceString.length === 0) {
        return null;
    }

    const fCount = Math.max(1, parseInt(frameCount, 10) || 3);

    const fifoResult = runFIFO(referenceString, fCount);
    const lruResult = runLRU(referenceString, fCount);
    const optResult = runOptimal(referenceString, fCount);

    const results = [
        {
            name: 'FIFO',
            description: 'First-In, First-Out',
            pageFaults: fifoResult.metrics.pageFaults,
            pageHits: fifoResult.metrics.pageHits,
            hitRatio: fifoResult.metrics.hitRatio,
            faultRatio: fifoResult.metrics.faultRatio
        },
        {
            name: 'LRU',
            description: 'Least Recently Used',
            pageFaults: lruResult.metrics.pageFaults,
            pageHits: lruResult.metrics.pageHits,
            hitRatio: lruResult.metrics.hitRatio,
            faultRatio: lruResult.metrics.faultRatio
        },
        {
            name: 'Optimal',
            description: 'Optimal Page Replacement',
            pageFaults: optResult.metrics.pageFaults,
            pageHits: optResult.metrics.pageHits,
            hitRatio: optResult.metrics.hitRatio,
            faultRatio: optResult.metrics.faultRatio
        }
    ];

    const minFaults = Math.min(...results.map(r => r.pageFaults));
    const maxHits = Math.max(...results.map(r => r.pageHits));

    const bestFaultAlgo = results.filter(r => r.pageFaults === minFaults).map(r => r.name).join(', ');
    const bestHitAlgo = results.filter(r => r.pageHits === maxHits).map(r => r.name).join(', ');

    return {
        results,
        minFaults,
        maxHits,
        bestFaultAlgo,
        bestHitAlgo,
        totalRefs: referenceString.length
    };
}

/**
 * Render Perbandingan CPU
 */
function renderCPUComparison(container, comparisonData) {
    if (!container) return;

    if (!comparisonData) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Belum ada data proses untuk dibandingkan. Tambahkan data proses terlebih dahulu.</p>
            </div>
        `;
        return;
    }

    const { results, minWT, minTAT, bestWTAlgo, bestTATAlgo } = comparisonData;
    const maxBarWT = Math.max(...results.map(r => r.avgWT), 1);
    const maxBarTAT = Math.max(...results.map(r => r.avgTAT), 1);

    let rowsHtml = '';
    results.forEach(item => {
        const isBestWT = item.avgWT === minWT;
        const isBestTAT = item.avgTAT === minTAT;
        const wtWidth = Math.max(8, (item.avgWT / maxBarWT) * 100);
        const tatWidth = Math.max(8, (item.avgTAT / maxBarTAT) * 100);

        rowsHtml += `
            <tr>
                <td>
                    <strong>${item.name}</strong>
                    <div class="sub-text">${item.description}</div>
                </td>
                <td class="${isBestWT ? 'cell-best' : ''}">
                    <div class="metric-val-with-bar">
                        <span class="value-text">${item.avgWT} ms</span>
                        <div class="mini-bar-track">
                            <div class="mini-bar-fill bar-wt" style="width: ${wtWidth}%"></div>
                        </div>
                    </div>
                </td>
                <td class="${isBestTAT ? 'cell-best' : ''}">
                    <div class="metric-val-with-bar">
                        <span class="value-text">${item.avgTAT} ms</span>
                        <div class="mini-bar-track">
                            <div class="mini-bar-fill bar-tat" style="width: ${tatWidth}%"></div>
                        </div>
                    </div>
                </td>
                <td>${item.avgRT} ms</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-responsive">
            <table class="data-table comparison-table">
                <thead>
                    <tr>
                        <th>Algoritma</th>
                        <th>Rata-rata Waiting Time (WT) *</th>
                        <th>Rata-rata Turnaround Time (TAT) *</th>
                        <th>Rata-rata Response Time (RT)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
        <div class="comparison-analysis-box">
            <div class="analysis-badge">ANALISIS PERBANDINGAN</div>
            <p><strong>Berdasarkan Rata-rata Waiting Time terendah:</strong> <span class="highlight-text">${bestWTAlgo}</span> (${minWT} ms)</p>
            <p><strong>Berdasarkan Rata-rata Turnaround Time terendah:</strong> <span class="highlight-text">${bestTATAlgo}</span> (${minTAT} ms)</p>
            <p class="analysis-note"><em>Catatan edukatif:</em> Metrik dengan tanda (*) adalah metrik evaluasi wajib. SJF Non-Preemptive umumnya meminimalkan rata-rata waiting time pada kumpulan proses yang tersedia bersamaan, sementara performa Round Robin sangat dipengaruhi oleh kecocokan nilai Time Quantum terhadap pola Burst Time.</p>
        </div>
    `;
}

/**
 * Render Perbandingan Memori
 */
function renderMemoryComparison(container, comparisonData) {
    if (!container) return;

    if (!comparisonData) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Belum ada reference string untuk dibandingkan. Masukkan data referensi halaman terlebih dahulu.</p>
            </div>
        `;
        return;
    }

    const { results, minFaults, maxHits, bestFaultAlgo, bestHitAlgo, totalRefs } = comparisonData;

    let rowsHtml = '';
    results.forEach(item => {
        const isBestFault = item.pageFaults === minFaults;
        const isBestHit = item.pageHits === maxHits;
        const faultWidth = Math.max(8, (item.pageFaults / totalRefs) * 100);
        const hitWidth = Math.max(8, (item.pageHits / totalRefs) * 100);

        rowsHtml += `
            <tr>
                <td>
                    <strong>${item.name}</strong>
                    <div class="sub-text">${item.description}</div>
                </td>
                <td class="${isBestFault ? 'cell-best' : ''}">
                    <div class="metric-val-with-bar">
                        <span class="value-text">${item.pageFaults}</span>
                        <div class="mini-bar-track">
                            <div class="mini-bar-fill bar-fault" style="width: ${faultWidth}%"></div>
                        </div>
                    </div>
                </td>
                <td class="${isBestHit ? 'cell-best' : ''}">
                    <div class="metric-val-with-bar">
                        <span class="value-text">${item.pageHits}</span>
                        <div class="mini-bar-track">
                            <div class="mini-bar-fill bar-hit" style="width: ${hitWidth}%"></div>
                        </div>
                    </div>
                </td>
                <td>${item.hitRatio}%</td>
                <td>${item.faultRatio}%</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-responsive">
            <table class="data-table comparison-table">
                <thead>
                    <tr>
                        <th>Algoritma</th>
                        <th>Page Fault *</th>
                        <th>Page Hit *</th>
                        <th>Hit Ratio</th>
                        <th>Fault Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
        <div class="comparison-analysis-box">
            <div class="analysis-badge">ANALISIS PERBANDINGAN</div>
            <p><strong>Berdasarkan Page Fault paling sedikit:</strong> <span class="highlight-text">${bestFaultAlgo}</span> (${minFaults} fault)</p>
            <p><strong>Berdasarkan Page Hit terbanyak:</strong> <span class="highlight-text">${bestHitAlgo}</span> (${maxHits} hit)</p>
            <p class="analysis-note"><em>Catatan edukatif:</em> Metrik dengan tanda (*) adalah metrik evaluasi wajib. Algoritma Optimal selalu menjadi acuan batas teoretis terbaik (lowest fault rate) karena mengetahui urutan masa depan. Dalam sistem operasi nyata, LRU sering digunakan sebagai aproksimasi praktis dari Optimal.</p>
        </div>
    `;
}

if (typeof window !== 'undefined') {
    window.compareCPUAlgorithms = compareCPUAlgorithms;
    window.compareMemoryAlgorithms = compareMemoryAlgorithms;
    window.renderCPUComparison = renderCPUComparison;
    window.renderMemoryComparison = renderMemoryComparison;
}
