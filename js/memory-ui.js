/**
 * memori-ui
 */

const DEFAULT_REF_STRING = '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1';
const DEFAULT_FRAME_COUNT = '3';

let memorySimulationResult = null;
let memoriStepper = null;
let parsedReferenceString = [];
let currentFrameCount = 3;

function initMemoriUI() {
    const inputRef = document.getElementById('input-ref-string');
    const inputFrames = document.getElementById('input-frame-count');
    const selectAlgo = document.getElementById('select-memory-algo');
    const btnPreset = document.getElementById('btn-memory-preset');
    const btnClear = document.getElementById('btn-memory-clear');
    const btnRunInstant = document.getElementById('btn-run-memory-instant');

    // buttons
    const btnStart = document.getElementById('btn-mem-step-start');
    const btnPause = document.getElementById('btn-mem-step-pause');
    const btnResume = document.getElementById('btn-mem-step-resume');
    const btnNext = document.getElementById('btn-mem-step-next');
    const btnPrev = document.getElementById('btn-mem-step-prev');
    const btnReset = document.getElementById('btn-mem-step-reset');

    if (inputRef && !inputRef.value) {
        inputRef.value = DEFAULT_REF_STRING;
    }
    if (inputFrames && !inputFrames.value) {
        inputFrames.value = DEFAULT_FRAME_COUNT;
    }

    if (btnPreset) {
        btnPreset.addEventListener('click', () => {
            if (inputRef) inputRef.value = DEFAULT_REF_STRING;
            if (inputFrames) inputFrames.value = DEFAULT_FRAME_COUNT;
            showMemoryError('');
            resetMemorySimulationView();
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (inputRef) {
                inputRef.value = '';
                inputRef.focus();
            }
            showMemoryError('');
            resetMemorySimulationView();

            // Kosongkan juga data di halaman perbandingan jika dari page replacement kosong
            const compRef = document.getElementById('comp-ref-string');
            if (compRef) {
                compRef.value = '';
            }
            if (typeof window.refreshComparisonView === 'function') {
                window.refreshComparisonView();
            }
        });
    }

    if (inputRef) {
        inputRef.addEventListener('input', () => {
            if (!inputRef.value.trim()) {
                const compRef = document.getElementById('comp-ref-string');
                if (compRef) {
                    compRef.value = '';
                }
                if (typeof window.refreshComparisonView === 'function') {
                    window.refreshComparisonView();
                }
            }
        });
    }

    if (selectAlgo) {
        selectAlgo.addEventListener('change', () => {
            resetMemorySimulationView();
        });
    }

    if (btnRunInstant) {
        btnRunInstant.addEventListener('click', () => {
            runMemorySimulation(false);
        });
    }

    // Stepper Engine Inisialisasi
    memoryStepper = new SimulationStepper({
        speed: 1200,
        onStepChange: (stepIndex) => {
            updateMemoryStepView(stepIndex);
        },
        onComplete: () => {
            const expl = document.getElementById('mem-step-explanation');
            if (expl) {
                expl.innerHTML = `<span class="badge-success">Simulasi Selesai</span> Seluruh deretan referensi halaman telah selesai diproses. Periksa metrik akhir di atas.`;
            }
            updateMemoryStepperControls(true);
        }
    });

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (!memorySimulationResult) {
                const ok = runMemorySimulation(true);
                if (!ok) return;
            }
            memoryStepper.start();
            updateMemoryStepperControls();
        });
    }

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            memoryStepper.pause();
            updateMemoryStepperControls();
        });
    }

    if (btnResume) {
        btnResume.addEventListener('click', () => {
            memoryStepper.resume();
            updateMemoryStepperControls();
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (!memorySimulationResult) {
                const ok = runMemorySimulation(true);
                if (!ok) return;
            }
            memoryStepper.nextStep();
            updateMemoryStepperControls();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (memoryStepper) {
                memoryStepper.prevStep();
                updateMemoryStepperControls();
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetMemorySimulationView();
        });
    }
}

/**
 * Parsing dan Validasi Input Reference String dan Jumlah Frame
 */
function parseAndValidateMemoryInput() {
    const inputRef = document.getElementById('input-ref-string');
    const inputFrames = document.getElementById('input-frame-count');

    const refStr = inputRef ? inputRef.value.trim() : '';
    const framesStr = inputFrames ? inputFrames.value.trim() : '';

    showMemoryError('');

    if (!refStr) {
        showMemoryError('Reference string tidak boleh kosong.');
        if (inputRef) inputRef.focus();
        return false;
    }

    // Pisahkan berdasarkan koma atau spasi
    const tokens = refStr.split(/[\s,]+/).filter(t => t.length > 0);
    if (tokens.length === 0) {
        showMemoryError('Reference string harus memuat setidaknya satu nomor halaman.');
        if (inputRef) inputRef.focus();
        return false;
    }

    const pages = [];
    for (let i = 0; i < tokens.length; i++) {
        const val = Number(tokens[i]);
        if (isNaN(val) || !Number.isInteger(val) || val < 0) {
            showMemoryError(`Nilai halaman "${tokens[i]}" pada posisi ke-${i + 1} tidak valid. Halaman harus berupa bilangan bulat non-negatif (>= 0).`);
            if (inputRef) inputRef.focus();
            return false;
        }
        pages.push(val);
    }

    // Validasi frame count
    if (!framesStr || isNaN(framesStr) || !Number.isInteger(Number(framesStr)) || Number(framesStr) <= 0) {
        showMemoryError('Jumlah frame harus berupa bilangan bulat lebih besar dari 0 (minimal 1 frame).');
        if (inputFrames) inputFrames.focus();
        return false;
    }

    const fCount = parseInt(framesStr, 10);
    if (fCount > 10) {
        showMemoryError('Jumlah frame maksimal disarankan adalah 10 agar tabel tetap nyaman dibaca.');
        if (inputFrames) inputFrames.focus();
        return false;
    }

    parsedReferenceString = pages;
    currentFrameCount = fCount;
    return true;
}

function showMemoryError(msg) {
    const alertBox = document.getElementById('memory-validation-msg');
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
 * Jalankan Simulasi Page Replacement
 */
function runMemorySimulation(isStepperMode = false) {
    if (!parseAndValidateMemoryInput()) {
        return false;
    }

    const selectAlgo = document.getElementById('select-memory-algo');
    const algo = selectAlgo ? selectAlgo.value : 'FIFO';

    if (algo === 'FIFO') {
        memorySimulationResult = runFIFO(parsedReferenceString, currentFrameCount);
    } else if (algo === 'LRU') {
        memorySimulationResult = runLRU(parsedReferenceString, currentFrameCount);
    } else if (algo === 'OPTIMAL') {
        memorySimulationResult = runOptimal(parsedReferenceString, currentFrameCount);
    }

    const resultSection = document.getElementById('memory-results-section');
    if (resultSection) resultSection.classList.remove('hidden');

    if (isStepperMode) {
        memoryStepper.setTotalSteps(memorySimulationResult.steps.length);
        memoryStepper.goToStep(1);
    } else {
        memoryStepper.pause();
        const tableContainer = document.getElementById('memory-table-container');
        renderMemoryTable(tableContainer, memorySimulationResult.steps, currentFrameCount, -1);
        updateMemoryMetricsCards(memorySimulationResult.metrics);

        const expl = document.getElementById('mem-step-explanation');
        if (expl) {
            expl.innerHTML = `<span class="badge-info">Hasil Lengkap</span> Simulasi selesai untuk total ${parsedReferenceString.length} referensi halaman. Gunakan tombol stepper di atas untuk menelusuri langkah demi langkah.`;
        }

        // Set stepper state agar tombol Mulai/Sebelumnya/dll berfungsi setelah instant run
        memoryStepper.totalSteps = memorySimulationResult.steps.length;
        memoryStepper.currentStep = memorySimulationResult.steps.length;
        memoryStepper.isPlaying = false;

        const stepBadge = document.getElementById('mem-current-step-badge');
        if (stepBadge) stepBadge.textContent = `Langkah: ${memorySimulationResult.steps.length} / ${memorySimulationResult.steps.length}`;

        updateMemoryStepperControls(true);
    }

    return true;
}

/**
 * Update UI saat step stepper berubah
 */
function updateMemoryStepView(stepIndex) {
    if (!memorySimulationResult || !memorySimulationResult.steps) return;

    const tableContainer = document.getElementById('memory-table-container');
    const expl = document.getElementById('mem-step-explanation');
    const stepBadge = document.getElementById('mem-current-step-badge');

    if (stepIndex === 0) {
        renderMemoryTable(tableContainer, [], currentFrameCount, -1);
        if (expl) expl.textContent = 'Simulasi direset. Tekan Mulai atau Langkah Berikutnya.';
        if (stepBadge) stepBadge.textContent = `Langkah: 0 / ${memorySimulationResult.steps.length}`;
        return;
    }

    const currentStepData = memorySimulationResult.steps[stepIndex - 1];
    if (stepBadge) {
        stepBadge.textContent = `Langkah: ${stepIndex} / ${memorySimulationResult.steps.length}`;
    }

    // Tampilkan tabel hingga langkah saat ini dengan highlight kolom aktif
    renderMemoryTable(tableContainer, memorySimulationResult.steps, currentFrameCount, stepIndex);

    if (expl && currentStepData) {
        const statusBadge = currentStepData.status === 'HIT'
            ? `<span class="badge-success">PAGE HIT</span>`
            : `<span class="badge-warning">PAGE FAULT</span>`;
        expl.innerHTML = `
            <strong>Langkah ${currentStepData.step} (Halaman ${currentStepData.page}):</strong> 
            ${statusBadge} ${currentStepData.description}
        `;
    }

    // Hitung metrik sementara hingga langkah ini
    const stepsSoFar = memorySimulationResult.steps.slice(0, stepIndex);
    const faultsSoFar = stepsSoFar.filter(s => s.status === 'FAULT').length;
    const hitsSoFar = stepsSoFar.filter(s => s.status === 'HIT').length;
    const hitRatio = Number(((hitsSoFar / stepIndex) * 100).toFixed(2));
    const faultRatio = Number(((faultsSoFar / stepIndex) * 100).toFixed(2));

    updateMemoryMetricsCards({
        pageFaults: faultsSoFar,
        pageHits: hitsSoFar,
        hitRatio: hitRatio,
        faultRatio: faultRatio
    });

    updateMemoryStepperControls();
}

/**
 * Update Ringkasan Metrik Kartu Memori
 */
function updateMemoryMetricsCards(metrics) {
    const elFaults = document.getElementById('stat-mem-faults');
    const elHits = document.getElementById('stat-mem-hits');
    const elHitRatio = document.getElementById('stat-mem-hit-ratio');
    const elFaultRatio = document.getElementById('stat-mem-fault-ratio');

    if (elFaults) elFaults.textContent = metrics.pageFaults;
    if (elHits) elHits.textContent = metrics.pageHits;
    if (elHitRatio) elHitRatio.textContent = `${metrics.hitRatio}%`;
    if (elFaultRatio) elFaultRatio.textContent = `${metrics.faultRatio}%`;
}

function updateMemoryStepperControls(isFinished = false) {
    const btnStart = document.getElementById('btn-mem-step-start');
    const btnPause = document.getElementById('btn-mem-step-pause');
    const btnResume = document.getElementById('btn-mem-step-resume');
    const btnNext = document.getElementById('btn-mem-step-next');
    const btnPrev = document.getElementById('btn-mem-step-prev');

    if (!memoryStepper) return;

    if (memoryStepper.isPlaying) {
        if (btnStart) btnStart.disabled = true;
        if (btnPause) btnPause.disabled = false;
        if (btnResume) btnResume.disabled = true;
        if (btnNext) btnNext.disabled = true;
    } else {
        if (btnPause) btnPause.disabled = true;
        if (memoryStepper.currentStep > 0 && memoryStepper.currentStep < memoryStepper.totalSteps) {
            if (btnResume) btnResume.disabled = false;
            if (btnStart) btnStart.disabled = true;
        } else {
            if (btnStart) btnStart.disabled = false;
            if (btnResume) btnResume.disabled = true;
        }
        if (btnNext) btnNext.disabled = isFinished || (memoryStepper.totalSteps > 0 && memoryStepper.currentStep >= memoryStepper.totalSteps);
    }

    if (btnPrev) {
        btnPrev.disabled = !memoryStepper || memoryStepper.currentStep <= 1;
    }
}

function resetMemorySimulationView() {
    if (memoryStepper) memoryStepper.pause();
    memorySimulationResult = null;

    const tableContainer = document.getElementById('memory-table-container');
    const expl = document.getElementById('mem-step-explanation');
    const stepBadge = document.getElementById('mem-current-step-badge');
    const resultSection = document.getElementById('memory-results-section');

    if (tableContainer) {
        tableContainer.innerHTML = `
            <div class="empty-state">
                <p>Masukkan reference string dan jumlah frame untuk memulai simulasi.</p>
            </div>
        `;
    }
    if (expl) expl.textContent = 'Klik "Mulai" atau "Langkah Berikutnya" untuk menjalankan simulasi secara bertahap.';
    if (stepBadge) stepBadge.textContent = 'Langkah: - / -';
    if (resultSection) resultSection.classList.add('hidden');

    updateMemoryMetricsCards({
        pageFaults: '-',
        pageHits: '-',
        hitRatio: '-',
        faultRatio: '-'
    });

    updateMemoryStepperControls();
}

function getMemoryData() {
    const inputRef = document.getElementById('input-ref-string');
    const inputFrames = document.getElementById('input-frame-count');
    const refStr = (inputRef && inputRef.value.trim()) ? inputRef.value.trim() : DEFAULT_REF_STRING;
    const fCount = (inputFrames && inputFrames.value) ? parseInt(inputFrames.value, 10) || DEFAULT_FRAME_COUNT : DEFAULT_FRAME_COUNT;
    return {
        refString: refStr,
        frameCount: fCount
    };
}

function setMemoryData(refStr, fCount) {
    const inputRef = document.getElementById('input-ref-string');
    const inputFrames = document.getElementById('input-frame-count');
    if (inputRef && refStr !== undefined) inputRef.value = refStr;
    if (inputFrames && fCount !== undefined) inputFrames.value = fCount;
    resetMemorySimulationView();
}

if (typeof window !== 'undefined') {
    window.initMemoryUI = initMemoryUI;
    window.runMemorySimulation = runMemorySimulation;
    window.getMemoryData = getMemoryData;
    window.setMemoryData = setMemoryData;
    window.DEFAULT_REF_STRING = DEFAULT_REF_STRING;
    window.DEFAULT_FRAME_COUNT = DEFAULT_FRAME_COUNT;
}
