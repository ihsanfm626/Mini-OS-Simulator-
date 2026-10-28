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

    // Render tabel awal
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





