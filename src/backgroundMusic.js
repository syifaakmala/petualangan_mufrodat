let homeMusicAudio = null;
let clickAudioContext = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!clickAudioContext) clickAudioContext = new AudioContextClass();
  if (clickAudioContext.state === 'suspended') clickAudioContext.resume().catch(() => {});
  return clickAudioContext;
}

// Efek klik pendek buatan sendiri: nada naik saat musik dinyalakan,
// dan nada turun saat musik dimatikan.
export function playMusicToggleSound(turningOn = true) {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const notes = turningOn ? [659.25, 880, 1174.66] : [880, 659.25];
  notes.forEach((frequency, index) => {
    const start = now + index * 0.075;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.075, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.14);
  });
}

export async function startHomeMusic() {
  if (typeof window === 'undefined') return false;
  if (!homeMusicAudio) {
    homeMusicAudio = new Audio('/audio/music/home-cheerful-original.mp3');
    homeMusicAudio.loop = true;
    homeMusicAudio.preload = 'auto';
    homeMusicAudio.volume = 0.28;
  }
  try {
    await homeMusicAudio.play();
    return true;
  } catch {
    return false;
  }
}

export function stopHomeMusic() {
  if (!homeMusicAudio) return;
  homeMusicAudio.pause();
  try { homeMusicAudio.currentTime = 0; } catch { /* ignore seek errors */ }
}
