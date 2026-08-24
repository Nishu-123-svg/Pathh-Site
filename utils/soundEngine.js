// Sacred Web Audio Engine (Zero external dependencies, 100% offline & serverless friendly)

let audioCtx = null;
let droneNodes = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Ring the ceremonial Brass Temple Bell (घंटी)
 */
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.45, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
    masterGain.connect(ctx.destination);

    // Realistic Temple Bell Harmonics (Frequencies in Hz)
    const partials = [
      { freq: 587.33, gain: 0.7, decay: 3.0 },  // D5 Fundamental
      { freq: 880.00, gain: 0.5, decay: 2.5 },  // A5
      { freq: 1174.66, gain: 0.35, decay: 2.0 }, // D6
      { freq: 1760.00, gain: 0.2, decay: 1.5 },  // A6
      { freq: 2349.32, gain: 0.1, decay: 1.0 },  // D7
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      pGain.gain.setValueAtTime(gain, now);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(pGain);
      pGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });

    // Strike transient noise burst for realistic brass clang
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1800;
    noiseFilter.Q.value = 3;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noise.start(now);
  } catch (e) {
    console.warn("Audio bell playback error:", e);
  }
}

/**
 * Jap Mala bead click sound
 */
export function playMalaClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn("Mala click error:", e);
  }
}

/**
 * Completion gong / Shankh tone for milestones (108 chants or Daily Pooja complete)
 */
export function playCelebrationGong() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.5, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    masterGain.connect(ctx.destination);

    const gongFrequencies = [216, 432, 648, 864];
    gongFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const amp = 0.4 / (idx + 1);
      gGain.gain.setValueAtTime(amp, now);
      gGain.gain.exponentialRampToValueAtTime(0.0001, now + (4.0 - idx * 0.5));

      osc.connect(gGain);
      gGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 4.5);
    });
  } catch (e) {
    console.warn("Gong error:", e);
  }
}

/**
 * 432Hz Om / Tanpura Meditative Ambient Drone
 */
export function toggleOmDrone(isPlaying) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (!isPlaying && droneNodes) {
      // Fade out
      const now = ctx.currentTime;
      droneNodes.gain.gain.setValueAtTime(droneNodes.gain.gain.value, now);
      droneNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        if (droneNodes) {
          droneNodes.oscillators.forEach(osc => {
            try { osc.stop(); } catch (_) {}
          });
          droneNodes = null;
        }
      }, 1300);
      return false;
    } else if (isPlaying && !droneNodes) {
      const now = ctx.currentTime;
      const masterDroneGain = ctx.createGain();
      masterDroneGain.gain.setValueAtTime(0.0001, now);
      masterDroneGain.gain.exponentialRampToValueAtTime(0.18, now + 2.0);

      // Lowpass filter for warm soothing texture
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 550;

      masterDroneGain.connect(filter);
      filter.connect(ctx.destination);

      // 432 Hz Root (A=432), Fifth (E=324 / 648), Octave (216, 108)
      const baseFreq = 108; // Deep base Om
      const ratios = [1, 1.5, 2, 3, 4];
      const oscillators = [];

      ratios.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const subGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        // Subtle detuning for natural beating / chorusing
        osc.frequency.setValueAtTime(baseFreq * ratio + (i * 0.15), now);

        subGain.gain.value = 0.25 / (i + 1);
        osc.connect(subGain);
        subGain.connect(masterDroneGain);

        osc.start(now);
        oscillators.push(osc);
      });

      droneNodes = {
        gain: masterDroneGain,
        oscillators,
      };
      return true;
    }
  } catch (e) {
    console.warn("Om drone error:", e);
    return false;
  }
}
