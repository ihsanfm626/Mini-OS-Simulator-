// pada F01, F02, F11 FITUR.md dan DESAIN.md
//  */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMateriSection();
    initCPUUI();
    initMemoryUI();
    initComparisonSection();
    initMobileNav();
});


function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.main-section');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const breadcrumbModule = document.getElementById('breadcrumb-module');

    const PAGE_METADATA = {
        'materi': {
            title: 'Pahami Konsepnya. Lalu Coba Simulasinya.',
            subtitle: 'Pusat belajar konsep dasar CPU Scheduling dan Page Replacement melalui penjelasan dan ilustrasi visual terstruktur.',
            breadcrumb: 'Materi'
        },
        'cpu': {
            title: 'CPU Scheduling Simulator',
            subtitle: 'Bandingkan cara algoritma FCFS, SJF Non-Preemptive, dan Round Robin mengatur giliran proses mengeksekusi CPU.',
            breadcrumb: 'CPU Scheduling'
        },
        'memory': {
            title: 'Page Replacement Simulator',
            subtitle: 'Ikuti pergerakan dan perubahan isi frame memori fisik setiap kali sebuah halaman dalam reference string diminta.',
            breadcrumb: 'Page Replacement'
        },
        'comparison': {
            title: 'Perbandingan Algoritma',
            subtitle: 'Evaluasi performa komparatif antar-algoritma menggunakan himpunan data input yang identik secara objektif.',
            breadcrumb: 'Perbandingan'
        }
    };

    function switchPage(pageKey) {
        // Sembunyikan semua section
        sections.forEach(sec => sec.classList.add('hidden'));

        // Tampilkan section target
        const targetSec = document.getElementById(`section-${pageKey}`);
        if (targetSec) {
            targetSec.classList.remove('hidden');
        }

        // Update nav active state
        navLinks.forEach(link => {
            if (link.dataset.page === pageKey) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Header
        const meta = PAGE_METADATA[pageKey] || PAGE_METADATA['materi'];
        if (pageTitle) pageTitle.textContent = meta.title;
        if (pageSubtitle) pageSubtitle.textContent = meta.subtitle;
        if (breadcrumbModule) breadcrumbModule.textContent = meta.breadcrumb;

        // Tutup mobile drawer jika terbuka
        const sidebar = document.querySelector('.app-sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }

        // Jika membuka halaman perbandingan, segarkan hasil perbandingan dengan input terkini
        if (pageKey === 'comparison') {
            refreshComparisonView();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            switchPage(page);
        });
    });

    // Expose switchPage secara global agar bisa dipanggil dari tombol CTA Materi
    window.navigateToModule = switchPage;

    // Cek URL Hash saat halaman pertama kali dibuka
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['materi', 'cpu', 'memory', 'comparison'].includes(initialHash)) {
        switchPage(initialHash);
    }

    // Tangani perubahan URL Hash dari browser back/forward
    window.addEventListener('hashchange', () => {
        const h = window.location.hash.replace('#', '');
        if (h && ['materi', 'cpu', 'memory', 'comparison'].includes(h)) {
            switchPage(h);
        }
    });
}

/**
 * Modul Halaman Materi (F01)
 */
function initMateriSection() {
    const tabCPU = document.getElementById('tab-materi-cpu');
    const tabMemory = document.getElementById('tab-materi-memory');
    const contentCPU = document.getElementById('content-materi-cpu');
    const contentMemory = document.getElementById('content-materi-memory');

    const btnGoCPU = document.getElementById('btn-materi-to-cpu');
    const btnGoMemory = document.getElementById('btn-materi-to-memory');

    if (tabCPU && tabMemory) {
        tabCPU.addEventListener('click', () => {
            tabCPU.classList.add('active');
            tabMemory.classList.remove('active');
            if (contentCPU) contentCPU.classList.remove('hidden');
            if (contentMemory) contentMemory.classList.add('hidden');
        });

        tabMemory.addEventListener('click', () => {
            tabMemory.classList.add('active');
            tabCPU.classList.remove('active');
            if (contentMemory) contentMemory.classList.remove('hidden');
            if (contentCPU) contentCPU.classList.add('hidden');
        });
    }

    if (btnGoCPU) {
        btnGoCPU.addEventListener('click', () => {
            window.navigateToModule('cpu');
        });
    }

    if (btnGoMemory) {
        btnGoMemory.addEventListener('click', () => {
            window.navigateToModule('memory');
        });
    }
}

/**
 * Modul Halaman Perbandingan (F11)
 */
function initComparisonSection() {
    const tabCompCPU = document.getElementById('tab-comp-cpu');
    const tabCompMem = document.getElementById('tab-comp-memory');
    const panelCompCPU = document.getElementById('panel-comp-cpu');
    const panelCompMem = document.getElementById('panel-comp-memory');

    // Kontrol CPU Perbandingan
    const btnRunCPU = document.getElementById('btn-run-cpu-comparison');
    const btnSyncCPU = document.getElementById('btn-comp-sync-cpu');
    const btnPresetCPU = document.getElementById('btn-comp-cpu-preset');
    const linkGotoCPU = document.getElementById('link-goto-cpu');

    // Kontrol Memori Perbandingan
    const btnRunMem = document.getElementById('btn-run-mem-comparison');
    const btnSyncMem = document.getElementById('btn-comp-sync-mem');
    const btnPresetMem = document.getElementById('btn-comp-mem-preset');
    const linkGotoMem = document.getElementById('link-goto-mem');

    // Tab Switching
    if (tabCompCPU && tabCompMem) {
        tabCompCPU.addEventListener('click', () => {
            tabCompCPU.classList.add('active');
            tabCompMem.classList.remove('active');
            if (panelCompCPU) panelCompCPU.classList.remove('hidden');
            if (panelCompMem) panelCompMem.classList.add('hidden');
            renderCurrentCPUComparison();
        });

        tabCompMem.addEventListener('click', () => {
            tabCompMem.classList.add('active');
            tabCompCPU.classList.remove('active');
            if (panelCompMem) panelCompMem.classList.remove('hidden');
            if (panelCompCPU) panelCompCPU.classList.add('hidden');
            const inputRef = document.getElementById('input-ref-string');
            const compRef = document.getElementById('comp-ref-string');
            if (inputRef && compRef && !inputRef.value.trim()) {
                compRef.value = '';
            }
            renderCurrentMemoryComparison();
        });
    }

    // Aksi Tombol Komparasi CPU
    if (btnRunCPU) {
        btnRunCPU.addEventListener('click', () => {
            renderCurrentCPUComparison();
        });
    }

    if (btnSyncCPU) {
        btnSyncCPU.addEventListener('click', () => {
            // Ambil data proses terkini dari simulator CPU
            const simProcs = typeof window.getCPUProcesses === 'function' ? window.getCPUProcesses() : window.cpuProcesses;
            const simQuantum = document.getElementById('input-time-quantum');
            const compQuantum = document.getElementById('comp-time-quantum');
            if (simQuantum && compQuantum && simQuantum.value) {
                compQuantum.value = simQuantum.value;
            }
            renderCurrentCPUComparison(simProcs);
        });
    }

    if (btnPresetCPU) {
        btnPresetCPU.addEventListener('click', () => {
            const preset = [
                { id: 'P1', at: 0, bt: 5 },
                { id: 'P2', at: 1, bt: 3 },
                { id: 'P3', at: 2, bt: 8 },
                { id: 'P4', at: 3, bt: 6 }
            ];
            if (typeof window.setCPUProcesses === 'function') {
                window.setCPUProcesses(preset);
            } else {
                window.cpuProcesses = preset;
            }
            const compQuantum = document.getElementById('comp-time-quantum');
            if (compQuantum) compQuantum.value = 2;
            renderCurrentCPUComparison(preset);
        });
    }

    if (linkGotoCPU) {
        linkGotoCPU.addEventListener('click', () => {
            window.navigateToModule('cpu');
        });
    }

    // Aksi Tombol Komparasi Memori
    if (btnRunMem) {
        btnRunMem.addEventListener('click', () => {
            renderCurrentMemoryComparison();
        });
    }

    if (btnSyncMem) {
        btnSyncMem.addEventListener('click', () => {
            const inputRef = document.getElementById('input-ref-string');
            const inputFrames = document.getElementById('input-frame-count');
            const compRef = document.getElementById('comp-ref-string');
            const compFrames = document.getElementById('comp-frame-count');
            if (inputRef && compRef) {
                compRef.value = inputRef.value;
            }
            if (inputFrames && compFrames && inputFrames.value) {
                compFrames.value = inputFrames.value;
            }
            renderCurrentMemoryComparison();
        });
    }

    if (btnPresetMem) {
        btnPresetMem.addEventListener('click', () => {
            const compRef = document.getElementById('comp-ref-string');
            const compFrames = document.getElementById('comp-frame-count');
            if (compRef) compRef.value = '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1';
            if (compFrames) compFrames.value = 3;
            renderCurrentMemoryComparison();
        });
    }

    if (linkGotoMem) {
        linkGotoMem.addEventListener('click', () => {
            window.navigateToModule('memory');
        });
    }

    // Inisialisasi render awal tabel agar tidak pernah kosong
    renderCurrentCPUComparison();
}

function refreshComparisonView() {
    // Jika reference string di simulator kosong, kosongkan juga di halaman perbandingan
    const inputRef = document.getElementById('input-ref-string');
    const compRef = document.getElementById('comp-ref-string');
    if (inputRef && compRef && !inputRef.value.trim()) {
        compRef.value = '';
    }

    const tabCompCPU = document.getElementById('tab-comp-cpu');
    if (tabCompCPU && tabCompCPU.classList.contains('active')) {
        renderCurrentCPUComparison();
    } else {
        renderCurrentMemoryComparison();
    }
}

/**
 * Render Perbandingan CPU di Halaman Perbandingan
 */
function renderCurrentCPUComparison(procsOverride = null) {
    const container = document.getElementById('container-comparison-cpu-table');
    const tagsContainer = document.getElementById('comp-cpu-process-tags');
    const compQuantum = document.getElementById('comp-time-quantum');
    const qVal = compQuantum ? parseInt(compQuantum.value, 10) || 2 : 2;

    const procs = procsOverride || (typeof window.getCPUProcesses === 'function' ? window.getCPUProcesses() : window.cpuProcesses);

    // Tampilkan chips/tag proses yang sedang dibandingkan
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (procs && procs.length > 0) {
            procs.forEach(p => {
                const color = typeof window.getProcessColor === 'function' ? window.getProcessColor(p.id) : { bg: '#087E83', text: '#FFF' };
                const tag = document.createElement('span');
                tag.className = 'process-tag';
                tag.style.backgroundColor = color.bg;
                tag.style.color = color.text;
                tag.textContent = `${p.id} (AT:${p.at}, BT:${p.bt})`;
                tagsContainer.appendChild(tag);
            });
        } else {
            tagsContainer.innerHTML = '<span class="sub-text" style="font-style: italic;">Belum ada data proses. Klik "Contoh Standar" atau tambahkan proses di simulator.</span>';
        }
    }

    if (!procs || procs.length === 0) {
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Belum ada data proses untuk dibandingkan. Tambahkan proses terlebih dahulu atau gunakan tombol "Contoh Standar".</p>
                </div>
            `;
        }
        return;
    }

    const data = window.compareCPUAlgorithms(procs, qVal);
    window.renderCPUComparison(container, data);
}

/**
 * Render Perbandingan Memori di Halaman Perbandingan
 */
function renderCurrentMemoryComparison() {
    const container = document.getElementById('container-comparison-memory-table');
    const compRef = document.getElementById('comp-ref-string');
    const compFrames = document.getElementById('comp-frame-count');

    const refStr = compRef ? compRef.value.trim() : '';
    if (!refStr) {
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Belum ada data reference string untuk dibandingkan. Masukkan deretan referensi halaman di atas atau klik "Contoh Standar".</p>
                </div>
            `;
        }
        return;
    }

    const fCount = compFrames ? parseInt(compFrames.value, 10) || 3 : 3;
    const tokens = refStr.split(/[\s,]+/).filter(t => t.length > 0).map(Number).filter(n => !isNaN(n) && n >= 0);

    if (tokens.length === 0) {
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Format reference string tidak valid. Masukkan deretan angka halaman yang dipisahkan koma atau spasi.</p>
                </div>
            `;
        }
        return;
    }

    const data = window.compareMemoryAlgorithms(tokens, fCount);
    window.renderMemoryComparison(container, data);
}

if (typeof window !== 'undefined') {
    window.refreshComparisonView = refreshComparisonView;
    window.renderCurrentCPUComparison = renderCurrentCPUComparison;
    window.renderCurrentMemoryComparison = renderCurrentMemoryComparison;
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggleBtn = document.getElementById('btn-mobile-nav-toggle');
    const sidebar = document.querySelector('.app-sidebar');
    const overlay = document.getElementById('mobile-overlay');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }
}
