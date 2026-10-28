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




