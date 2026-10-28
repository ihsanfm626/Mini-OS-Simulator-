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


}
