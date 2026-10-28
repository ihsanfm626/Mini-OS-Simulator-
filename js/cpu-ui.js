/**
 * cpu-ui.js — Mini OS Simulator
 */

/ Data proses awal 
let cpuProcesses = [
    { id: 'P1', at: 0, bt: 5 },
    { id: 'P2', at: 1, bt: 3 },
    { id: 'P3', at: 2, bt: 8 },
    { id: 'P4', at: 3, bt: 6 }
];

let cpuSimulationResult = null;
let cpuStepper = null;
let editingProcessIndex = -1;

function initCPUUI() {
    const form = document.getElementById('form-add-process');
    const selectAlgo = document.getElementById('select-cpu-algo');
    const quantumGroup = document.getElementById('group-time-quantum');
    const btnRunInstant = document.getElementById('btn-run-cpu-instant');
    const btnPreset = document.getElementById('btn-cpu-preset');
    const btnClearProcs = document.getElementById('btn-cpu-clear');

    // Stepper buttons
    const btnStart = document.getElementById('btn-cpu-step-start');
    const btnPause = document.getElementById('btn-cpu-step-pause');
    const btnResume = document.getElementById('btn-cpu-step-resume');
    const btnNext = document.getElementById('btn-cpu-step-next');
    const btnPrev = document.getElementById('btn-cpu-step-prev');
    const btnReset = document.getElementById('btn-cpu-step-reset');

    if (selectAlgo && quantumGroup) {
        selectAlgo.addEventListener('change', () => {
            if (selectAlgo.value === 'RR') {
                quantumGroup.classList.remove('hidden');
            } else {
                quantumGroup.classList.add('hidden');
            }
            resetCPUSimulationView();
        });
    }

    // Form Tambah (Edit Proses)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleProcessFormSubmit();
        });
    }

    if (btnPreset) {
        btnPreset.addEventListener('click', () => {
            cpuProcesses = [
                { id: 'P1', at: 0, bt: 5 },
                { id: 'P2', at: 1, bt: 3 },
                { id: 'P3', at: 2, bt: 8 },
                { id: 'P4', at: 3, bt: 6 }
            ];
            window.cpuProcesses = cpuProcesses;
            editingProcessIndex = -1;
            renderProcessTable();
            showCPUError('');
            resetCPUSimulationView();
            if (typeof window.refreshComparisonView === 'function') {
                window.refreshComparisonView();
            }
        });
    }

     if (btnClearProcs) {
        btnClearProcs.addEventListener('click', () => {
            if (cpuProcesses.length > 0 && confirm('Kosongkan semua daftar proses?')) {
                cpuProcesses = [];
                window.cpuProcesses = cpuProcesses;
                editingProcessIndex = -1;
                renderProcessTable();
                resetCPUSimulationView();
                if (typeof window.refreshComparisonView === 'function') {
                    window.refreshComparisonView();
                }
            }
        });
    }

    if (btnRunInstant) {
        btnRunInstant.addEventListener('click', () => {
            runCPUSimulation(false);
        });
    }

    cpuStepper = new SimulationStepper({
        speed: 1200,
        onStepChange: (stepIndex) => {
            updateCPUStepView(stepIndex);
        },
        onComplete: () => {
            const expl = document.getElementById('cpu-step-explanation');
            if (expl) {
                expl.innerHTML = `<span class="badge-success">Simulasi Selesai</span> Semua proses telah selesai dieksekusi oleh CPU. Periksa tabel metrik lengkap di bawah.`;
            }
            updateCPUStepperControls(true);
        }
    });

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (!cpuSimulationResult) {
                const ok = runCPUSimulation(true);
                if (!ok) return;
            }
            cpuStepper.start();
            updateCPUStepperControls();
        });
    }

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            cpuStepper.pause();
            updateCPUStepperControls();
        });
    }

    if (btnResume) {
        btnResume.addEventListener('click', () => {
            cpuStepper.resume();
            updateCPUStepperControls();
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (!cpuSimulationResult) {
                const ok = runCPUSimulation(true);
                if (!ok) return;
            }
            cpuStepper.nextStep();
            updateCPUStepperControls();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (cpuStepper) {
                cpuStepper.prevStep();
                updateCPUStepperControls();
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetCPUSimulationView();
        });
    }

    renderProcessTable();
}

/**
 * Validasi dan Tambah/Edit Proses
 */
function handleProcessFormSubmit() {
    const inputId = document.getElementById('cpu-process-id');
    const inputAT = document.getElementById('cpu-process-at');
    const inputBT = document.getElementById('cpu-process-bt');
    const submitBtn = document.getElementById('btn-submit-process');

    const id = inputId.value.trim().toUpperCase();
    const atStr = inputAT.value.trim();
    const btStr = inputBT.value.trim();

    showCPUError('');

    // Validasi Process ID
    if (!id) {
        showCPUError('Process ID tidak boleh kosong.');
        inputId.focus();
        return;
    }

    // Validasi Arrival Time
    if (atStr === '' || isNaN(atStr) || !Number.isInteger(Number(atStr)) || Number(atStr) < 0) {
        showCPUError('Arrival Time harus berupa bilangan bulat non-negatif (0 atau lebih).');
        inputAT.focus();
        return;
    }

    // Validasi Burst Time
    if (btStr === '' || isNaN(btStr) || !Number.isInteger(Number(btStr)) || Number(btStr) <= 0) {
        showCPUError('Burst Time harus berupa bilangan bulat lebih besar dari 0.');
        inputBT.focus();
        return;
    }

    const at = parseInt(atStr, 10);
    const bt = parseInt(btStr, 10);

    const duplicateIndex = cpuProcesses.findIndex(p => p.id === id);
    if (editingProcessIndex === -1 && duplicateIndex !== -1) {
        showCPUError(`Process ID "${id}" sudah ada dalam daftar. Gunakan ID yang berbeda.`);
        inputId.focus();
        return;
    }
    if (editingProcessIndex !== -1 && duplicateIndex !== -1 && duplicateIndex !== editingProcessIndex) {
        showCPUError(`Process ID "${id}" sudah digunakan oleh proses lain.`);
        inputId.focus();
        return;
    }

    if (editingProcessIndex === -1) {
        cpuProcesses.push({ id, at, bt });
    } else {
        cpuProcesses[editingProcessIndex] = { id, at, bt };
        editingProcessIndex = -1;
        if (submitBtn) submitBtn.textContent = 'Tambah Proses';
    }

    inputId.value = `P${cpuProcesses.length + 1}`;
    inputAT.value = '0';
    inputBT.value = '1';
    inputId.focus();

    renderProcessTable();
    resetCPUSimulationView();
}

/**
 * Render Tabel Data Proses Input
 */
function renderProcessTable() {
    const tbody = document.getElementById('table-body-processes');
    const countBadge = document.getElementById('badge-process-count');
    if (countBadge) countBadge.textContent = `${cpuProcesses.length} Proses`;

    if (!tbody) return;
    tbody.innerHTML = '';

    if (cpuProcesses.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-cell">
                    Belum ada proses. Tambahkan data proses terlebih dahulu di atas.
                </td>
            </tr>
        `;
        return;
    }

    cpuProcesses.forEach((p, index) => {
        const tr = document.createElement('tr');
        const color = getProcessColor(p.id);

        tr.innerHTML = `
            <td>
                <span class="process-tag" style="background-color: ${color.bg}; color: ${color.text}">
                    ${p.id}
                </span>
            </td>
            <td>${p.at}</td>
            <td>${p.bt}</td>
            <td class="action-cell">
                <button type="button" class="btn-table-action btn-edit" title="Edit proses ${p.id}">Edit</button>
                <button type="button" class="btn-table-action btn-delete" title="Hapus proses ${p.id}">Hapus</button>
            </td>
        `;

        tr.querySelector('.btn-edit').addEventListener('click', () => editProcess(index));
        tr.querySelector('.btn-delete').addEventListener('click', () => deleteProcess(index));

        tbody.appendChild(tr);
    });
}

function editProcess(index) {
    const p = cpuProcesses[index];
    if (!p) return;

    editingProcessIndex = index;
    const inputId = document.getElementById('cpu-process-id');
    const inputAT = document.getElementById('cpu-process-at');
    const inputBT = document.getElementById('cpu-process-bt');
    const submitBtn = document.getElementById('btn-submit-process');

    if (inputId) inputId.value = p.id;
    if (inputAT) inputAT.value = p.at;
    if (inputBT) inputBT.value = p.bt;
    if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';

    if (inputId) inputId.focus();
}

function deleteProcess(index) {
    if (index >= 0 && index < cpuProcesses.length) {
        cpuProcesses.splice(index, 1);
        if (editingProcessIndex === index) {
            editingProcessIndex = -1;
            const submitBtn = document.getElementById('btn-submit-process');
            if (submitBtn) submitBtn.textContent = 'Tambah Proses';
        }
        renderProcessTable();
        resetCPUSimulationView();
    }
}

function showCPUError(msg) {
    const alertBox = document.getElementById('cpu-validation-msg');
    if (!alertBox) return;
    if (!msg) {
        alertBox.textContent = '';
        alertBox.classList.add('hidden');
    } else {
        alertBox.textContent = msg;
        alertBox.classList.remove('hidden');
    }
}

/**
 * Jalankan Simulasi CPU
 */
function runCPUSimulation(isStepperMode = false) {
    showCPUError('');

    if (cpuProcesses.length === 0) {
        showCPUError('Tambahkan minimal satu proses sebelum menjalankan simulasi.');
        return false;
    }

    const algoSelect = document.getElementById('select-cpu-algo');
    const algo = algoSelect ? algoSelect.value : 'FCFS';
    const quantumInput = document.getElementById('input-time-quantum');

    let quantum = 2;
    if (algo === 'RR') {
        const qVal = quantumInput ? quantumInput.value.trim() : '';
        if (!qVal || isNaN(qVal) || !Number.isInteger(Number(qVal)) || Number(qVal) <= 0) {
            showCPUError('Time Quantum diperlukan untuk Round Robin dan harus berupa bilangan bulat > 0.');
            if (quantumInput) quantumInput.focus();
            return false;
        }
        quantum = parseInt(qVal, 10);
    }

    if (algo === 'FCFS') {
        cpuSimulationResult = runFCFS(cpuProcesses);
    } else if (algo === 'SJF') {
        cpuSimulationResult = runSJF(cpuProcesses);
    } else if (algo === 'RR') {
        cpuSimulationResult = runRoundRobin(cpuProcesses, quantum);
    }

    const resultSection = document.getElementById('cpu-results-section');
    if (resultSection) resultSection.classList.remove('hidden');

    if (isStepperMode) {
        cpuStepper.setTotalSteps(cpuSimulationResult.steps.length);
        cpuStepper.goToStep(1);
    } else {
        cpuStepper.pause();
        const ganttContainer = document.getElementById('cpu-gantt-container');
        renderGanttChart(ganttContainer, cpuSimulationResult.timeline, -1);
        renderCPUMetricsTable(cpuSimulationResult.metrics, cpuSimulationResult.averages);

        const expl = document.getElementById('cpu-step-explanation');
        if (expl) {
            expl.innerHTML = `<span class="badge-info">Hasil Lengkap</span> Simulasi selesai dijalankan sekaligus. Total waktu eksekusi: ${cpuSimulationResult.timeline[cpuSimulationResult.timeline.length - 1].end} unit waktu. Gunakan tombol stepper di atas untuk menelusuri langkah demi langkah.`;
        }

        cpuStepper.totalSteps = cpuSimulationResult.steps.length;
        cpuStepper.currentStep = cpuSimulationResult.steps.length;
        cpuStepper.isPlaying = false;

        const stepBadge = document.getElementById('cpu-current-step-badge');
        if (stepBadge) stepBadge.textContent = `Langkah: ${cpuSimulationResult.steps.length} / ${cpuSimulationResult.steps.length}`;

        updateCPUStepperControls(true);
    }

    return true;
}

/**
 * Update UI saat step stepper berubah
 */
function updateCPUStepView(stepIndex) {
    if (!cpuSimulationResult || !cpuSimulationResult.steps) return;

    const ganttContainer = document.getElementById('cpu-gantt-container');
    const expl = document.getElementById('cpu-step-explanation');
    const stepBadge = document.getElementById('cpu-current-step-badge');

    if (stepIndex === 0) {
        renderGanttChart(ganttContainer, [], -1);
        if (expl) expl.textContent = 'Simulasi direset. Tekan Mulai atau Langkah Berikutnya.';
        if (stepBadge) stepBadge.textContent = `Langkah: 0 / ${cpuSimulationResult.steps.length}`;
        return;
    }

    const currentStepData = cpuSimulationResult.steps[stepIndex - 1];
    if (stepBadge) {
        stepBadge.textContent = `Langkah: ${stepIndex} / ${cpuSimulationResult.steps.length}`;
    }

    const activeTimeline = cpuSimulationResult.timeline.slice(0, stepIndex);
    renderGanttChart(ganttContainer, activeTimeline, stepIndex - 1);

    if (expl && currentStepData) {
        expl.innerHTML = `
            <strong>Langkah ${currentStepData.step} [Waktu ${currentStepData.timeStart} – ${currentStepData.timeEnd}]:</strong> 
            ${currentStepData.description}
        `;
    }

    renderCPUMetricsTable(cpuSimulationResult.metrics, cpuSimulationResult.averages);
    updateCPUStepperControls();
}

/**
 * Render Tabel Metrik Proses & Nilai Rata-rata
 */
function renderCPUMetricsTable(metrics, averages) {
    const tbody = document.getElementById('table-body-cpu-metrics');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!metrics || metrics.length === 0) return;

    metrics.forEach(m => {
        const tr = document.createElement('tr');
        const color = getProcessColor(m.id);
        tr.innerHTML = `
            <td>
                <span class="process-tag" style="background-color: ${color.bg}; color: ${color.text}">
                    ${m.id}
                </span>
            </td>
            <td>${m.at}</td>
            <td>${m.bt}</td>
            <td><strong>${m.ct}</strong></td>
            <td>${m.tat}</td>
            <td>${m.wt}</td>
            <td>${m.rt}</td>
        `;
        tbody.appendChild(tr);
    });

    const avgTr = document.createElement('tr');
    avgTr.className = 'row-average';
    avgTr.innerHTML = `
        <td colspan="3"><strong>Rata-rata</strong></td>
        <td><strong>${averages.avgCT}</strong></td>
        <td><strong>${averages.avgTAT}</strong></td>
        <td><strong>${averages.avgWT}</strong></td>
        <td><strong>${averages.avgRT}</strong></td>
    `;
    tbody.appendChild(avgTr);

    const elAvgWT = document.getElementById('stat-cpu-avg-wt');
    const elAvgTAT = document.getElementById('stat-cpu-avg-tat');
    if (elAvgWT) elAvgWT.textContent = `${averages.avgWT} ms`;
    if (elAvgTAT) elAvgTAT.textContent = `${averages.avgTAT} ms`;
}

function updateCPUStepperControls(isFinished = false) {
    const btnStart = document.getElementById('btn-cpu-step-start');
    const btnPause = document.getElementById('btn-cpu-step-pause');
    const btnResume = document.getElementById('btn-cpu-step-resume');
    const btnNext = document.getElementById('btn-cpu-step-next');
    const btnPrev = document.getElementById('btn-cpu-step-prev');

    if (!cpuStepper) return;

    if (cpuStepper.isPlaying) {
        if (btnStart) btnStart.disabled = true;
        if (btnPause) btnPause.disabled = false;
        if (btnResume) btnResume.disabled = true;
        if (btnNext) btnNext.disabled = true;
    } else {
        if (btnPause) btnPause.disabled = true;
        if (cpuStepper.currentStep > 0 && cpuStepper.currentStep < cpuStepper.totalSteps) {
            if (btnResume) btnResume.disabled = false;
            if (btnStart) btnStart.disabled = true;
        } else {
            if (btnStart) btnStart.disabled = false;
            if (btnResume) btnResume.disabled = true;
        }
        if (btnNext) btnNext.disabled = isFinished || (cpuStepper.totalSteps > 0 && cpuStepper.currentStep >= cpuStepper.totalSteps);
    }

    if (btnPrev) {
        btnPrev.disabled = !cpuStepper || cpuStepper.currentStep <= 1;
    }
}

function resetCPUSimulationView() {
    if (cpuStepper) cpuStepper.pause();
    cpuSimulationResult = null;

    const ganttContainer = document.getElementById('cpu-gantt-container');
    const tbody = document.getElementById('table-body-cpu-metrics');
    const expl = document.getElementById('cpu-step-explanation');
    const stepBadge = document.getElementById('cpu-current-step-badge');
    const resultSection = document.getElementById('cpu-results-section');

    if (ganttContainer) renderGanttChart(ganttContainer, []);
    if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="empty-cell">Jalankan simulasi untuk melihat metrik.</td></tr>';
    if (expl) expl.textContent = 'Klik "Mulai" atau "Langkah Berikutnya" untuk menjalankan simulasi secara bertahap.';
    if (stepBadge) stepBadge.textContent = 'Langkah: - / -';
    if (resultSection) resultSection.classList.add('hidden');

    const elAvgWT = document.getElementById('stat-cpu-avg-wt');
    const elAvgTAT = document.getElementById('stat-cpu-avg-tat');
    if (elAvgWT) elAvgWT.textContent = '-';
    if (elAvgTAT) elAvgTAT.textContent = '-';

    updateCPUStepperControls();
}

function getCPUProcesses() {
    return cpuProcesses;
}

function setCPUProcesses(newProcs) {
    if (Array.isArray(newProcs)) {
        cpuProcesses = newProcs;
        window.cpuProcesses = cpuProcesses;
        renderProcessTable();
        resetCPUSimulationView();
    }
}

if (typeof window !== 'undefined') {
    window.initCPUUI = initCPUUI;
    window.cpuProcesses = cpuProcesses;
    window.getCPUProcesses = getCPUProcesses;
    window.setCPUProcesses = setCPUProcesses;
    window.runCPUSimulation = runCPUSimulation;
}





