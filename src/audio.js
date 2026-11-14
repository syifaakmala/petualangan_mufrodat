let activeAudio = null;
let speechRequestId = 0;

export function getVocabularyAudioPath(topicId, itemId) {
  if (!topicId || !itemId) return null;
  return `/audio/vocabulary/${topicId}/${itemId}.mp3`;
}

function notifyAudio(message) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('pm-audio-notice', { detail: message }));
}

export function stopAllAudio() {
  if (typeof window === 'undefined') return;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  speechRequestId += 1;
}

function waitForVoices(synthesis) {
  const current = synthesis.getVoices();
  if (current.length) return Promise.resolve(current);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synthesis.removeEventListener?.('voiceschanged', finish);
      resolve(synthesis.getVoices());
    };
    synthesis.addEventListener?.('voiceschanged', finish, { once: true });
    window.setTimeout(finish, 1200);
  });
}

function chooseVoice(voices, language) {
  const prefix = language.toLowerCase().split('-')[0];
  return voices.find((voice) => voice.lang?.toLowerCase() === language.toLowerCase())
    || voices.find((voice) => voice.lang?.toLowerCase().startsWith(`${prefix}-`))
    || voices.find((voice) => voice.lang?.toLowerCase() === prefix)
    || null;
}

function speakWithBrowser(text, language, rate) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    notifyAudio('Browser ini tidak mendukung audio otomatis. Rekaman MP3 perlu ditambahkan ke proyek.');
    return Promise.resolve(false);
  }

  const synthesis = window.speechSynthesis;
  const requestId = ++speechRequestId;

  return waitForVoices(synthesis).then((voices) => new Promise((resolve) => {
    if (requestId !== speechRequestId) return resolve(false);

    const voice = chooseVoice(voices, language);
    const isArabic = language.toLowerCase().startsWith('ar');
    if (isArabic && !voice) {
      notifyAudio('Suara bahasa Arab belum tersedia di browser ini. Tambahkan rekaman MP3 Arab agar audio bisa diputar di semua browser.');
      return resolve(false);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice?.lang || language;
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = isArabic ? 1.02 : 1;
    utterance.onend = () => resolve(true);
    utterance.onerror = () => {
      if (isArabic) notifyAudio('Browser gagal memutar suara Arab. Rekaman MP3 adalah pilihan yang lebih stabil.');
      resolve(false);
    };
    synthesis.speak(utterance);
  }));
}

async function playMp3(path) {
  if (typeof window === 'undefined' || !path) return false;
  const audio = new Audio(path);
  audio.preload = 'auto';
  activeAudio = audio;

  try {
    await new Promise((resolve, reject) => {
      audio.onended = resolve;
      audio.onerror = () => reject(new Error('Audio file is not available'));
      const playResult = audio.play();
      if (playResult?.catch) playResult.catch(reject);
    });
    if (activeAudio === audio) activeAudio = null;
    return true;
  } catch {
    if (activeAudio === audio) activeAudio = null;
    audio.pause();
    return false;
  }
}

export async function playArabic(text, topicId, itemId) {
  stopAllAudio();
  const path = getVocabularyAudioPath(topicId, itemId);
  if (path) {
    const played = await playMp3(path);
    if (played) return true;
  }
  return speakWithBrowser(text, 'ar-SA', 0.78);
}

export function playFeedback(text) {
  stopAllAudio();
  return speakWithBrowser(text, 'id-ID', 0.96);
}

export async function playFeedbackThenArabic(feedback, arabic, topicId, itemId) {
  stopAllAudio();
  await speakWithBrowser(feedback, 'id-ID', 0.96);
  return playArabic(arabic, topicId, itemId);
}
