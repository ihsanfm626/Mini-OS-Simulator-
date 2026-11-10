/**
 * visualization.js — Mini OS Simulator
 */

// Palet warna konsisten untuk proses CPU (kontras dan harmonis di atas kanvas krem)
const PROCESS_COLORS = [
    { bg: '#087E83', text: '#FFFFFF', border: '#06666B' }, // Teal
    { bg: '#F07861', text: '#FFFFFF', border: '#D65C45' }, // Coral
    { bg: '#3D8B68', text: '#FFFFFF', border: '#2D6B50' }, // Sage Green
    { bg: '#DE8F38', text: '#FFFFFF', border: '#B87226' }, // Amber / Ochre
    { bg: '#6B5B95', text: '#FFFFFF', border: '#544677' }, // Retro Purple
    { bg: '#4A7C9B', text: '#FFFFFF', border: '#37607A' }, // Slate Blue
    { bg: '#C05C7E', text: '#FFFFFF', border: '#9E4462' }, // Rosewood
    { bg: '#5D8A66', text: '#FFFFFF', border: '#45694C' }  // Moss
];

const IDLE_COLOR = {
    bg: '#E2DCD2',
    text: '#64716F',
    border: '#C7BFB3'
};

// Map warna statis untuk setiap Process ID agar konsisten antar-render
const processColorCache = {};

function getProcessColor(processId) {
    if (processId === 'Idle') {
        return IDLE_COLOR;
    }
    if (!processColorCache[processId]) {
        const keys = Object.keys(processColorCache);
        const index = keys.length % PROCESS_COLORS.length;
        processColorCache[processId] = PROCESS_COLORS[index];
    }
    return processColorCache[processId];
}

/**
 * Render Gantt Chart CPU
 * @param {HTMLElement} container 
 * @param {Array} timeline 
 * @param {number} activeStepIndex (-1 untuk semua aktif / selesai)
 */
function renderGanttChart(container, timeline, activeStepIndex = -1) {
    if (!container) return;
    container.innerHTML = '';

    if (!timeline || timeline.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Belum ada eksekusi proses untuk ditampilkan.</p>
            </div>
        `;
        return;
    }

    const totalDuration = timeline.reduce((acc, seg) => acc + seg.duration, 0);
    if (totalDuration === 0) return;

    const chartWrapper = document.createElement('div');
    chartWrapper.className = 'gantt-chart-wrapper';

    // Hitung min-width agar setiap blok punya cukup ruang dan tidak terkompres
    const MIN_BLOCK_WIDTH = 60; // px per blok, cukup untuk label
    const totalMinWidth = Math.max(timeline.length * MIN_BLOCK_WIDTH, 300);

    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'gantt-inner';
    innerWrapper.style.minWidth = totalMinWidth + 'px';

    const barContainer = document.createElement('div');
    barContainer.className = 'gantt-bars';

    const timeAxis = document.createElement('div');
    timeAxis.className = 'gantt-time-axis';

    // Tambahkan titik waktu awal (0)
    const startTick = document.createElement('span');
    startTick.className = 'gantt-tick start-tick';
    startTick.textContent = timeline[0].start;
    timeAxis.appendChild(startTick);

    timeline.forEach((seg, index) => {
        const flexRatio = Math.max(seg.duration, 0.5);
        const color = getProcessColor(seg.id);

        const block = document.createElement('div');
        block.className = `gantt-block ${seg.isIdle ? 'idle-block' : 'process-block'}`;
        if (activeStepIndex !== -1 && index === activeStepIndex) {
            block.classList.add('is-active-step');
        } else if (activeStepIndex !== -1 && index > activeStepIndex) {
            block.classList.add('is-future-step');
        }

        block.style.flex = `${flexRatio} 0 ${MIN_BLOCK_WIDTH}px`;
        block.style.backgroundColor = color.bg;
        block.style.color = color.text;
        block.style.borderColor = color.border;

        block.innerHTML = `
            <span class="gantt-label">${seg.id}</span>
            <span class="gantt-duration">(${seg.duration})</span>
        `;
        barContainer.appendChild(block);

        // Titik penanda waktu selesai blok
        const tick = document.createElement('span');
        tick.className = 'gantt-tick';
        tick.textContent = seg.end;
        tick.style.flex = `${flexRatio} 0 ${MIN_BLOCK_WIDTH}px`;
        timeAxis.appendChild(tick);
    });

    innerWrapper.appendChild(barContainer);
    innerWrapper.appendChild(timeAxis);
    chartWrapper.appendChild(innerWrapper);
    container.appendChild(chartWrapper);
}

/**
 * Render Matriks Frame Page Replacement
 * @param {HTMLElement} container 
 * @param {Array} steps 
 * @param {number} frameCount 
 * @param {number} currentStepIndex (1-based, atau -1 untuk menampilkan semua)
 */
function renderMemoryTable(container, steps, frameCount, currentStepIndex = -1) {
    if (!container) return;
    container.innerHTML = '';

    if (!steps || steps.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Belum ada langkah simulasi halaman untuk ditampilkan.</p>
            </div>
        `;
        return;
    }

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'memory-table-scroll-container';

    const table = document.createElement('table');
    table.className = 'memory-frame-table';

    // 1. Baris Referensi Halaman
    const thead = document.createElement('thead');
    const refRow = document.createElement('tr');
    refRow.className = 'row-reference';
    
    const thLabel = document.createElement('th');
    thLabel.className = 'sticky-col header-label-col';
    thLabel.textContent = 'Referensi';
    refRow.appendChild(thLabel);

    steps.forEach((st, idx) => {
        const th = document.createElement('th');
        th.className = 'ref-cell';
        th.textContent = st.page;
        if (currentStepIndex === idx + 1) {
            th.classList.add('active-column');
        }
        refRow.appendChild(th);
    });
    thead.appendChild(refRow);
    table.appendChild(thead);

    // 2. Baris-baris Frame (Frame 1 hingga Frame N)
    const tbody = document.createElement('tbody');
    for (let f = 0; f < frameCount; f++) {
        const frameRow = document.createElement('tr');
        frameRow.className = 'row-frame';

        const labelTd = document.createElement('td');
        labelTd.className = 'sticky-col frame-label-col';
        labelTd.textContent = `Frame ${f + 1}`;
        frameRow.appendChild(labelTd);

        steps.forEach((st, idx) => {
            const td = document.createElement('td');
            td.className = 'frame-slot-cell';
            const pageVal = st.frames[f];
            td.textContent = (pageVal !== null && pageVal !== undefined) ? pageVal : '—';

            // Jika langkah ini adalah frame yang baru dimasukkan / diganti
            if (st.status === 'FAULT' && st.targetFrameIndex === f) {
                td.classList.add('slot-updated');
            } else if (st.status === 'HIT' && st.targetFrameIndex === f) {
                td.classList.add('slot-hit');
            }

            if (currentStepIndex === idx + 1) {
                td.classList.add('active-column');
            }
            frameRow.appendChild(td);
        });

        tbody.appendChild(frameRow);
    }

    // 3. Baris Status (HIT / FAULT)
    const statusRow = document.createElement('tr');
    statusRow.className = 'row-status';

    const statusLabelTd = document.createElement('td');
    statusLabelTd.className = 'sticky-col status-label-col';
    statusLabelTd.textContent = 'Status';
    statusRow.appendChild(statusLabelTd);

    steps.forEach((st, idx) => {
        const td = document.createElement('td');
        td.className = `status-cell ${st.status === 'HIT' ? 'status-hit' : 'status-fault'}`;
        td.textContent = st.status; // Ditulis jelas sebagai teks "HIT" atau "FAULT"
        if (currentStepIndex === idx + 1) {
            td.classList.add('active-column');
        }
        statusRow.appendChild(td);
    });
    tbody.appendChild(statusRow);

    // 4. Baris Korban Penggantian (Replaced Page)
    const replacedRow = document.createElement('tr');
    replacedRow.className = 'row-victim';

    const victimLabelTd = document.createElement('td');
    victimLabelTd.className = 'sticky-col victim-label-col';
    victimLabelTd.textContent = 'Diganti';
    replacedRow.appendChild(victimLabelTd);

    steps.forEach((st, idx) => {
        const td = document.createElement('td');
        td.className = 'victim-cell';
        td.textContent = st.replacedPage !== null && st.replacedPage !== undefined ? st.replacedPage : '—';
        if (currentStepIndex === idx + 1) {
            td.classList.add('active-column');
        }
        replacedRow.appendChild(td);
    });
    tbody.appendChild(replacedRow);

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    container.appendChild(tableWrapper);

    // Scroll otomatis ke kolom aktif jika ada
    if (currentStepIndex > 0) {
        const activeCells = tableWrapper.querySelectorAll('.active-column');
        if (activeCells.length > 0) {
            const firstActive = activeCells[0];
            const scrollLeft = firstActive.offsetLeft - (tableWrapper.clientWidth / 2);
            tableWrapper.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }
}

/**
 * Controller Animasi Bertahap (Stepper Engine)
 */
class SimulationStepper {
    constructor({ onStepChange, onComplete, speed = 1000 }) {
        this.totalSteps = 0;
        this.currentStep = 0;
        this.isPlaying = false;
        this.speed = speed;
        this.timer = null;
        this.onStepChange = onStepChange || (() => {});
        this.onComplete = onComplete || (() => {});
    }

    setTotalSteps(total) {
        this.reset();
        this.totalSteps = total;
    }

    start() {
        if (this.totalSteps === 0) return;
        if (this.currentStep >= this.totalSteps) {
            this.currentStep = 0;
        }
        this.isPlaying = true;
        this.stepLoop();
    }

    stepLoop() {
        if (!this.isPlaying) return;
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.onStepChange(this.currentStep);
            this.timer = setTimeout(() => this.stepLoop(), this.speed);
        } else {
            this.pause();
            this.onComplete();
        }
    }

    pause() {
        this.isPlaying = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    resume() {
        if (this.currentStep >= this.totalSteps) {
            this.currentStep = 0;
        }
        this.isPlaying = true;
        this.stepLoop();
    }

    nextStep() {
        this.pause();
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.onStepChange(this.currentStep);
            if (this.currentStep === this.totalSteps) {
                this.onComplete();
            }
            return true;
        }
        return false;
    }

    prevStep() {
        this.pause();
        if (this.currentStep > 1) {
            this.currentStep--;
            this.onStepChange(this.currentStep);
            return true;
        }
        return false;
    }

    goToStep(step) {
        this.pause();
        const bounded = Math.max(1, Math.min(this.totalSteps, step));
        this.currentStep = bounded;
        this.onStepChange(this.currentStep);
    }

    reset() {
        this.pause();
        this.currentStep = 0;
        this.onStepChange(0);
    }
}

if (typeof window !== 'undefined') {
    window.renderGanttChart = renderGanttChart;
    window.renderMemoryTable = renderMemoryTable;
    window.getProcessColor = getProcessColor;
    window.SimulationStepper = SimulationStepper;
}
