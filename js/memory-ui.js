/**
 * memori-ui
 */

const DEFAULT_REF_STRING = '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1';
const DEFAULT_FRAME_COUNT = '3';

let memorySimulationResult = null;
let memoriStepper = null;
let parsedReferenceString = [];
let currentFrameCount = 3;
