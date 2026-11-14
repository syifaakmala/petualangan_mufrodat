import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CheckCircle2, ChevronRight, Clock3, Gamepad2,
  Grid2X2, Hash, Heart, Lightbulb, Music2, Play, RotateCcw, Search, Sparkles, Star,
  Target, Trophy, Volume2, XCircle
} from 'lucide-react';
import { games, getGameWords, getLearnWords, levelInfo, sample, shuffle, stripArabic, topics } from './data.js';
import { playArabic, playFeedback, playFeedbackThenArabic, stopAllAudio } from './audio.js';
import { playMusicToggleSound, startHomeMusic, stopHomeMusic } from './backgroundMusic.js';
import { VocabularyArt, TopicArt, GameArt, LevelArt } from './Illustrations.jsx';

function AudioNotice() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    let timer;
    const handleNotice = (event) => {
      setMessage(event.detail || 'Audio belum tersedia.');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 6500);
    };
    window.addEventListener('pm-audio-notice', handleNotice);
    return () => { window.removeEventListener('pm-audio-notice', handleNotice); window.clearTimeout(timer); };
  }, []);
  if (!message) return null;
  return <div className="audio-notice" role="status" aria-live="polite"><Volume2 size={17}/><span>{message}</span></div>;
}

function AudioButton({ text, topicId, itemId, label = 'Dengarkan', compact = false }) {
  return (
    <button className={`audio-button ${compact ? 'audio-button-small' : ''}`} onClick={() => playArabic(text, topicId, itemId)} type="button" aria-label={label} title={label}>
      <Volume2 size={compact ? 16 : 18} />
      {!compact && <span>{label}</span>}
    </button>
  );
}

function Mascots({ className = '', animated = false }) {
  return (
    <div className={`mascot-stage ${animated ? 'mascot-stage-animated' : ''} ${className}`} role="img" aria-label="Dua anak Muslim yang tersenyum dan melambaikan tangan">
      <img className="mascots mascot-base" src="/mascots/duo-base.png" alt="" />
      <img className="mascot-wave-hand mascot-wave-hand-girl" src="/mascots/girl-wave-hand.png" alt="" aria-hidden="true" />
      <img className="mascot-wave-hand mascot-wave-hand-boy" src="/mascots/boy-wave-hand.png" alt="" aria-hidden="true" />
    </div>
  );
}

function BackButton({ onClick, children = 'Kembali' }) {
  return <button className="back-button" type="button" onClick={onClick}><ArrowLeft size={17} />{children}</button>;
}

function Header({ title, subtitle, onBack, right }) {
  return (
    <header className="page-header">
      <div className="header-left">
        {onBack && <BackButton onClick={onBack} />}
        <div>
          <p className="eyebrow">PETUALANGAN MUFRADAT</p>
          <h1>{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}

function LevelStars({ level }) {
  const count = level === 'easy' ? 1 : level === 'medium' ? 2 : 3;
  return <span className="level-chip-stars" aria-hidden="true">{Array.from({ length: count }, (_, i) => <Star key={i} size={14} fill="currentColor" />)} {levelInfo[level].label}</span>;
}

function ProgressBar({ value, total }) {
  const percent = total ? Math.min(100, (value / total) * 100) : 0;
  return <div className="progress-wrap"><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div><span>{value}/{total}</span></div>;
}

function makeCatchObjects(target, words) {
  const distractors = sample(words.filter((w) => w.id !== target.id), Math.min(11, Math.max(5, words.length - 1)));
  const pool = [
    { id: `${target.id}-target-1`, item: target, isTarget: true },
    { id: `${target.id}-target-2`, item: target, isTarget: true },
    { id: `${target.id}-target-3`, item: target, isTarget: true },
    ...distractors.map((w, i) => ({ id: `${target.id}-d-${i}-${w.id}`, item: w, isTarget: false })),
  ];
  // Place the large targets in a loose 4-column constellation so they stay
  // separated and visible on desktop, tablet, and phone screens.
  const columns = [7, 30, 53, 76];
  const rows = [8, 33, 58, 78];
  return shuffle(pool).map((obj, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      ...obj,
      left: columns[col] + (Math.random() * 4 - 2),
      top: rows[row] + (Math.random() * 4 - 2),
      duration: 3.8 + Math.random() * 3.8,
      delay: Math.random() * -5,
      drift: `${Math.round(Math.random() * 24 - 12)}px`,
      z: i,
    };
  });
}

const ARABIC_FILL = Array.from('ابتثجحخدذرزسشصضطظعغفقكلمنهويءأإ');

function createWordPuzzle(word, level) {
  const letters = Array.from(stripArabic(word.arabic));
  const size = Math.min(24, Math.max(12, letters.length + 3));
  const directions = level === 'easy' ? [[-1, 0]] : level === 'medium' ? [[-1, 0], [0, 1]] : [[-1, 0], [0, 1], [-1, 1]];
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  let path = null;
  for (let attempt = 0; attempt < 800 && !path; attempt++) {
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    const startX = dx === -1 ? letters.length - 1 + Math.floor(Math.random() * (size - letters.length + 1)) : Math.floor(Math.random() * size);
    const startY = dy === 1 ? Math.floor(Math.random() * (size - letters.length + 1)) : Math.floor(Math.random() * size);
    const cells = letters.map((_, i) => ({ r: startY + dy * i, c: startX + dx * i }));
    if (cells.some((p) => p.r < 0 || p.r >= size || p.c < 0 || p.c >= size)) continue;
    path = cells;
  }
  if (!path) path = letters.map((_, i) => ({ r: 0, c: size - 1 - i }));
  path.forEach((p, i) => { grid[p.r][p.c] = letters[i]; });
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = ARABIC_FILL[Math.floor(Math.random() * ARABIC_FILL.length)];
    }
  }
  return { grid, path, size, answer: letters.join('') };
}

function lineCells(start, end) {
  const dr = end.r - start.r;
  const dc = end.c - start.c;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [start];
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  return Array.from({ length: steps + 1 }, (_, i) => ({ r: start.r + sr * i, c: start.c + sc * i }));
}

function HomePage({ onStart, musicOn, onToggleMusic }) {
  return (
    <main className="home-page">
      <div className="home-sky-decor decor-one" /><div className="home-sky-decor decor-two" />
      <div className="home-topline">
        <span className="brand-pill"><Sparkles size={15} /> MEDIA BELAJAR BAHASA ARAB</span>
        <div className="home-topline-right">
          <button className={`home-music-toggle ${musicOn ? 'is-playing' : ''}`} type="button" onClick={onToggleMusic} aria-pressed={musicOn} aria-label={musicOn ? 'Matikan musik ceria' : 'Putar musik ceria'} title={musicOn ? 'Matikan musik ceria' : 'Putar musik ceria'}>
            {musicOn ? <Volume2 size={18}/> : <Music2 size={18}/>}
            <span>{musicOn ? 'Musik menyala' : 'Putar musik'}</span>
            {musicOn && <span className="music-equalizer" aria-hidden="true"><i/><i/><i/><i/></span>}
          </button>
          <span className="arabic-brand" dir="rtl">مُغَامَرَةُ الْمُفْرَدَاتِ</span>
        </div>
      </div>
      <section className="hero-card">
        <div className="hero-copy">
          <div className="hero-tag"><Sparkles size={16}/> Belajar jadi petualangan!</div>
          <h1>Petualangan <span>Mufradat</span></h1>
          <p className="hero-arabic" dir="rtl">مُغَامَرَةُ الْمُفْرَدَاتِ</p>
          <p className="hero-description">Ayo bermain dan belajar bahasa Arab! Temukan kosakata baru lewat empat permainan seru bersama teman-teman kecilmu.</p>
          <button className="primary-button hero-button" onClick={onStart}><Play size={21} fill="currentColor" /> Mulai Belajar <ChevronRight size={20} /></button>
          <div className="hero-mini-points"><span><Star size={16} fill="currentColor"/> 9 tema seru</span><span><Gamepad2 size={16}/> 4 permainan</span><span><Award size={16}/> 3 level pilihan</span></div>
        </div>
        <div className="hero-art"><div className="hero-art-cloud cloud-a"/><div className="hero-art-cloud cloud-b"/><div className="hero-star star-a">✦</div><div className="hero-star star-b">✧</div><Mascots animated /></div>
      </section>
      <section className="home-bottom"><div><span className="bottom-icon"><BookOpen size={25}/></span><div><strong>Belajar kosakata</strong><small>Lihat gambar, baca, dan dengarkan.</small></div></div><div><span className="bottom-icon"><Gamepad2 size={25}/></span><div><strong>Main sambil belajar</strong><small>Empat game untuk mengasah ingatan.</small></div></div><div><span className="bottom-icon"><Trophy size={25}/></span><div><strong>Kumpulkan bintang</strong><small>Rayakan setiap kemajuanmu.</small></div></div></section>
      <p className="home-footer">Dibuat untuk belajar dengan gembira <Heart size={15} fill="currentColor"/></p>
    </main>
  );
}

function LevelPage({ onBack, onChoose }) {
  const levels = [
    { id: 'easy', name: 'Mudah', color: 'level-easy', detail: 'Ayo mulai mengenal mufradat!' },
    { id: 'medium', name: 'Sedang', color: 'level-medium', detail: 'Saatnya tambah kosakata baru.' },
    { id: 'hard', name: 'Sulit', color: 'level-hard', detail: 'Tantangan seru menantimu!' },
  ];
  return <div className="app-page"><Header title="Pilih Levelmu!" subtitle="Semua level terbuka. Pilih yang kamu suka!" onBack={onBack} /><div className="mascot-greeting"><Mascots /><div className="speech-bubble">Yuk, pilih petualanganmu hari ini!</div></div><div className="level-grid">{levels.map((l) => <button className={`level-card ${l.color}`} key={l.id} onClick={() => onChoose(l.id)}><LevelArt level={l.id} className="level-illustration"/><span className="level-stars" aria-label={`${l.id === 'easy' ? 1 : l.id === 'medium' ? 2 : 3} bintang`}>{Array.from({length:l.id === 'easy' ? 1 : l.id === 'medium' ? 2 : 3},(_,i)=><Star key={i} size={17} fill="currentColor"/>)}</span><strong>{l.name}</strong><small>{l.detail}</small><span className="card-action">Pilih level <ChevronRight size={16}/></span></button>)}</div></div>;
}

function GamePage({ onBack, onChoose }) {
  return <div className="app-page"><Header title="Pilih Permainan" subtitle="Ada empat permainan seru untukmu!" onBack={onBack} /><div className="game-grid">{games.map((g, i) => <button className={`game-card game-${g.accent}`} key={g.id} onClick={() => onChoose(g.id)}><span className="game-number">0{i + 1}</span><GameArt gameId={g.id} className="game-illustration"/><strong>{g.title}</strong><p>{g.description}</p><span className="card-action">Pilih permainan <ChevronRight size={16}/></span></button>)}</div><div className="friendly-note"><Lightbulb size={19}/> Pilih game yang ingin kamu mainkan. Semua game bisa dicoba kapan saja!</div></div>;
}

function TopicPage({ onBack, onChoose }) {
  return <div className="app-page"><Header title="Pilih Tema" subtitle="Dunia mana yang ingin kamu jelajahi?" onBack={onBack} /><div className="topic-grid">{topics.map((topic) => <button className={`topic-card topic-${topic.color}`} key={topic.id} onClick={() => onChoose(topic.id)}><TopicArt topicId={topic.id} className="topic-illustration"/><span className="topic-copy"><strong>{topic.title}</strong><span className="topic-arabic" dir="rtl">{topic.arabicTitle}</span></span><ChevronRight className="topic-arrow" size={19}/></button>)}</div><div className="friendly-note"><Sparkles size={18}/> Pilih satu tema, lalu kenali kosakata Arabnya sebelum bermain.</div></div>;
}

function LearnPage({ topic, level, onBack, onStart }) {
  const words = getLearnWords(topic, level);
  return <div className="app-page learn-page"><Header title={`Belajar: ${topic.title}`} subtitle="Kenali gambar, arti, dan cara mengucapkannya." onBack={onBack} right={<span className="level-chip"><LevelStars level={level}/></span>} />
    <div className="learn-intro"><div className="learn-topic-icon"><TopicArt topicId={topic.id}/></div><div><strong>Kenalan dulu, yuk!</strong><p>Tekan tombol speaker untuk mendengarkan pengucapan bahasa Arab. Kamu boleh mengulanginya berkali-kali.</p></div></div>
    {topic.id === 'numbers' && <div className="special-note"><Hash size={19}/> Semua angka 1–50 tersedia di sini. Saat bermain, sistem memilih soal secara acak sesuai level.</div>}
    {topic.id === 'time-days' && <div className="special-note"><Clock3 size={19}/> Pelajari jam analog dan digital bulat, nama hari, serta kosakata pagi, siang, sore, dan malam.</div>}
    <div className="learn-count">{words.length} kosakata untuk dipelajari</div>
    <div className="learn-grid">{words.map((w) => <article className="learn-card" key={w.id}><div className="learn-visual"><VocabularyArt item={w} topicId={topic.id}/></div><div className="learn-label">{w.label}</div><div className="arabic-word" dir="rtl">{w.arabic}</div><AudioButton text={w.arabic} topicId={topic.id} itemId={w.id} label="Dengarkan pengucapan" /></article>)}</div>
    <div className="learn-actions"><button className="secondary-button" onClick={() => onStart(true)}><ArrowRight size={18}/> Langsung Bermain</button><button className="primary-button" onClick={() => onStart(false)}>Aku Siap Bermain! <Sparkles size={18}/></button></div>
    <p className="audio-disclaimer">Audio akan memprioritaskan rekaman MP3 jika tersedia. Jika belum ada, browser mencoba suara Arab bawaan perangkat; ketersediaannya berbeda di Chrome dan Edge.</p>
  </div>;
}

function MemoryGame({ words, topicId, onFinish }) {
  const [cards] = useState(() => shuffle(words.flatMap((w) => [
    { id: `${w.id}-image`, item: w, kind: 'image' },
    { id: `${w.id}-word`, item: w, kind: 'word' },
  ])));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked, setLocked] = useState(false);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState('Buka dua kartu dan temukan pasangannya!');

  const clickCard = (index) => {
    if (locked || flipped.includes(index) || matched.includes(cards[index].item.id)) return;
    const next = [...flipped, index];
    setFlipped(next);
    if (next.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const a = cards[next[0]];
      const b = cards[next[1]];
      const isMatch = a.item.id === b.item.id && a.kind !== b.kind;
      if (isMatch) {
        window.setTimeout(() => {
          const nextMatched = [...matched, a.item.id];
          const nextPoints = points + 10;
          setMatched(nextMatched);
          setFlipped([]);
          setLocked(false);
          setPoints(nextPoints);
          setFeedback('Hebat! Kamu menemukan pasangan yang tepat!');
          playFeedbackThenArabic('Hebat!', a.item.arabic, topicId, a.item.id);
          if (nextMatched.length === words.length) window.setTimeout(() => onFinish({ points: nextPoints, total: words.length, correct: words.length }), 1050);
        }, 380);
      } else {
        setFeedback('Belum cocok. Coba pasangan yang lain, ya!');
        window.setTimeout(() => { setFlipped([]); setLocked(false); }, 950);
      }
    }
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill"><Grid2X2 size={16}/> {matched.length} / {words.length} pasangan</span><span className="status-pill">Langkah: {moves}</span><span className="status-pill"><Star size={15} fill="currentColor"/> {points} poin</span></div>
    <div className="game-instruction">{feedback}</div>
    <div className="memory-grid">{cards.map((card, index) => {
      const open = flipped.includes(index) || matched.includes(card.item.id);
      return <button type="button" key={card.id} className={`memory-card ${open ? 'is-open' : ''} ${matched.includes(card.item.id) ? 'is-matched' : ''}`} onClick={() => clickCard(index)} aria-label="Kartu memori">
        {open ? card.kind === 'image' ? <VocabularyArt item={card.item} topicId={topicId} className="memory-visual-art"/> : <span className="memory-arabic" dir="rtl">{card.item.arabic}</span> : <span className="card-question"><Sparkles size={35}/></span>}
      </button>;
    })}</div>
    <div className="game-tip"><Lightbulb size={17}/> Ingat, satu pasangan terdiri dari satu kartu gambar dan satu kartu tulisan Arab.</div>
  </div>;
}

function WordSearchGame({ words, level, topicId, onFinish }) {
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [found, setFound] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [seconds, setSeconds] = useState(level === 'hard' ? 60 : null);
  const [tapStart, setTapStart] = useState(null);
  const [selection, setSelection] = useState([]);
  const dragStart = useRef(null);
  const [feedback, setFeedback] = useState('Cari kata Arab yang cocok dengan gambar dan petunjuk Indonesia.');
  const current = words[index];
  const puzzle = useMemo(() => createWordPuzzle(current, level), [current.id, level]);
  const solutionKeys = new Set(puzzle.path.map((p) => `${p.r}-${p.c}`));

  useEffect(() => {
    setFound(false); setHintUsed(false); setShowHint(false); setTapStart(null); setSelection([]); dragStart.current = null;
    setSeconds(level === 'hard' ? 60 : null);
    setFeedback('Cari kata Arab yang cocok dengan gambar dan petunjuk Indonesia.');
  }, [index, level]);

  useEffect(() => {
    if (level !== 'hard' || found || seconds === null) return undefined;
    if (seconds <= 0) {
      if (!hintUsed) {
        setHintUsed(true); setShowHint(true); setSeconds(30);
        setFeedback('Waktu awal habis. Huruf pertama diberi petunjuk dan kamu mendapat 30 detik tambahan!');
      } else {
        setSeconds(null); setShowHint(true);
        setFeedback('Waktu tambahan selesai. Tenang, kamu tetap boleh mencoba tanpa batas waktu.');
      }
      return undefined;
    }
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, level, found, hintUsed]);

  const completeWord = (assisted) => {
    if (found) return;
    setFound(true);
    const earned = assisted ? 7 : 10;
    const nextPoints = points + earned;
    setPoints(nextPoints);
    setFeedback('Hebat! Kata berhasil ditemukan!');
    playFeedbackThenArabic(assisted ? 'Bagus sekali!' : 'Hebat!', current.arabic, topicId, current.id);
    setSelection([]); setTapStart(null);
    // Store the score in local state and finish only when the learner presses Next.
    setPoints(nextPoints);
  };

  const checkPath = (path) => {
    if (!path || path.length < 2 || found) return false;
    const seq = path.map((p) => puzzle.grid[p.r][p.c]).join('');
    const reverse = Array.from(seq).reverse().join('');
    if (seq === puzzle.answer || reverse === puzzle.answer) {
      completeWord(hintUsed);
      return true;
    }
    setFeedback('Belum tepat. Coba cari lagi, ya!');
    playFeedback('Coba lagi!');
    setSelection([]); setTapStart(null);
    return false;
  };

  const pointerDown = (r, c) => {
    if (found) return;
    dragStart.current = { r, c };
    setSelection([{ r, c }]);
  };
  const pointerEnter = (r, c) => {
    if (!dragStart.current || found) return;
    const line = lineCells(dragStart.current, { r, c });
    if (line) setSelection(line);
  };
  const pointerUp = (r, c) => {
    if (found) return;
    const end = { r, c };
    if (dragStart.current) {
      const line = lineCells(dragStart.current, end);
      dragStart.current = null;
      if (line && line.length > 1) { checkPath(line); return; }
    }
    if (tapStart) {
      const line = lineCells(tapStart, end);
      if (line && line.length > 1) checkPath(line);
      else { setTapStart(end); setSelection([end]); }
    } else {
      setTapStart(end); setSelection([end]);
    }
  };

  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill"><Search size={16}/> Kata {index + 1} / {words.length}</span><span className="status-pill"><Star size={15} fill="currentColor"/> {points} poin</span>{level === 'hard' && seconds !== null && <span className="status-pill timer-pill"><Clock3 size={15}/> {seconds} detik</span>}</div>
    <ProgressBar value={index + (found ? 1 : 0)} total={words.length}/>
    <div className="wordsearch-prompt"><div className="prompt-visual"><VocabularyArt item={current} topicId={topicId}/></div><div><span className="prompt-kicker">TEMUKAN KATA INI</span><strong>{current.label}</strong>{found && <div className="arabic-reveal" dir="rtl">{current.arabic}</div>}</div><div className="prompt-actions">{found ? <AudioButton text={current.arabic} topicId={topicId} itemId={current.id} compact label="Putar ulang pengucapan"/> : <span className="prompt-lock">Arab disembunyikan</span>}</div></div>
    {level === 'hard' && showHint && !found && <div className="hint-banner"><Lightbulb size={17}/> Petunjuk: huruf pertama kata ditandai di kotak.</div>}
    <div className="word-grid-scroll"><div className="word-grid" style={{ '--grid-size': puzzle.size }}>
      {puzzle.grid.map((row, r) => row.map((letter, c) => {
        const key = `${r}-${c}`;
        const selected = selection.some((p) => p.r === r && p.c === c);
        const hinted = showHint && solutionKeys.has(key) && puzzle.path[0].r === r && puzzle.path[0].c === c;
        return <button type="button" key={key} className={`letter-cell ${selected ? 'selected-cell' : ''} ${hinted ? 'hint-cell' : ''}`} onPointerDown={() => pointerDown(r,c)} onPointerEnter={() => pointerEnter(r,c)} onPointerUp={() => pointerUp(r,c)} aria-label={`Huruf ${letter}`}>
          <span dir="rtl">{letter}</span>
        </button>;
      }))}
    </div></div>
    <div className="game-tip"><Target size={17}/> Geser jari/mouse dari huruf awal ke huruf akhir. Di layar sentuh, kamu juga bisa sentuh huruf awal lalu huruf akhir.</div>
    {found && <div className="success-panel"><div className="success-icon"><Trophy size={34}/></div><div><strong>Hebat! Kamu menemukannya!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span>{current.label} dalam bahasa Arab.</span></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Kata Berikutnya'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function ArrangeGame({ words, level, topicId, onFinish }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('Susun huruf-huruf acak menjadi kata bahasa Arab yang benar.');
  const current = words[index];
  const answer = useMemo(() => Array.from(stripArabic(current.arabic)), [current.id]);
  const tokens = useMemo(() => {
    const extraCount = level === 'easy' ? 0 : level === 'medium' ? 2 : 4;
    const extras = sample(ARABIC_FILL.filter((ch) => !answer.includes(ch)), extraCount);
    return shuffle([...answer, ...extras].map((letter, i) => ({ id: `${current.id}-${i}-${letter}`, letter })));
  }, [current.id, level]);

  useEffect(() => { setSelected([]); setCorrect(false); setFeedback('Susun huruf-huruf acak menjadi kata bahasa Arab yang benar.'); }, [index]);

  const addToken = (token) => {
    if (correct || selected.some((s) => s.id === token.id) || selected.length >= answer.length) return;
    setSelected((prev) => [...prev, token]);
  };
  const removeToken = (tokenId) => {
    if (correct) return;
    setSelected((prev) => prev.filter((s) => s.id !== tokenId));
  };
  const checkAnswer = () => {
    const response = selected.map((s) => s.letter).join('');
    if (response === answer.join('')) {
      const nextPoints = points + 10;
      setPoints(nextPoints); setCorrect(true); setFeedback('Masyaallah! Susunan hurufmu benar!');
      playFeedbackThenArabic('Hebat!', current.arabic, topicId, current.id);
    } else {
      setFeedback('Belum tepat. Coba susun lagi, ya!'); playFeedback('Coba lagi!');
    }
  };
  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill"><BookOpen size={16}/> Kata {index + 1} / {words.length}</span><span className="status-pill"><Star size={15} fill="currentColor"/> {points} poin</span><span className="status-pill">Pengecoh: {level === 'easy' ? '0' : level === 'medium' ? '2' : '4'} huruf</span></div>
    <ProgressBar value={index + (correct ? 1 : 0)} total={words.length}/>
    <div className="arrange-prompt"><div className="arrange-visual"><VocabularyArt item={current} topicId={topicId}/></div><div><span className="prompt-kicker">SUSUN KATA INI</span><strong>{current.label}</strong><small>Susun huruf dari kanan ke kiri.</small></div></div>
    <div className="answer-slots" dir="rtl">{Array.from({ length: answer.length }, (_, i) => <button type="button" key={i} className={`answer-slot ${selected[i] ? 'slot-filled' : ''}`} onClick={() => selected[i] && removeToken(selected[i].id)}>{selected[i]?.letter || ''}</button>)}</div>
    <div className="letter-bank" dir="rtl">{tokens.map((token) => <button type="button" key={token.id} disabled={selected.some((s) => s.id === token.id) || correct} className="letter-token" onClick={() => addToken(token)}>{token.letter}</button>)}</div>
    <p className="game-instruction">{feedback}</p>
    {!correct ? <div className="game-controls"><button className="secondary-button" onClick={() => setSelected([])}><RotateCcw size={17}/> Hapus susunan</button><button className="primary-button" disabled={selected.length !== answer.length} onClick={checkAnswer}>Periksa Jawaban <CheckCircle2 size={18}/></button></div> : <div className="success-panel"><div className="success-icon"><Trophy size={34}/></div><div><strong>Jawaban benar!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span>{current.label} dalam bahasa Arab.</span><div className="inline-audio"><AudioButton text={current.arabic} topicId={topicId} itemId={current.id} compact label="Putar ulang pengucapan"/></div></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Berikutnya'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function CatchGame({ words, topicId, onFinish }) {
  const [index, setIndex] = useState(0);
  const [caught, setCaught] = useState([]);
  const [solved, setSolved] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('اِسْمَعْ وَالْتَقِطْ الصُّوَرَ الْمُطَابِقَةَ');
  const current = words[index];
  const objects = useMemo(() => makeCatchObjects(current, words), [current.id, index]);
  const targetIds = objects.filter((o) => o.isTarget).map((o) => o.id);
  useEffect(() => {
    setCaught([]); setSolved(false); setFeedback('اِسْمَعْ وَالْتَقِطْ الصُّوَرَ الْمُطَابِقَةَ');
    const timer = window.setTimeout(() => playArabic(current.arabic, topicId, current.id), 650);
    return () => window.clearTimeout(timer);
  }, [index]);

  const catchObject = (obj) => {
    if (solved || caught.includes(obj.id)) return;
    if (!obj.isTarget) {
      setFeedback('حَاوِلْ مَرَّةً أُخْرَى!'); playFeedback('Coba lagi!'); return;
    }
    const nextCaught = [...caught, obj.id];
    setCaught(nextCaught);
    setFeedback(`أَحْسَنْتَ! ${nextCaught.length} / ٣`);
    if (nextCaught.length === targetIds.length) {
      const nextPoints = points + 10;
      setPoints(nextPoints); setSolved(true); setFeedback('أَحْسَنْتَ! لَقَدِ الْتَقَطْتَ الصُّوَرَ الثَّلَاثَ كُلَّهَا!');
      playFeedbackThenArabic('Hebat!', current.arabic, topicId, current.id);
    } else {
      playFeedback('Bagus!');
    }
  };
  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill"><Target size={16}/> Babak {index + 1} / {words.length}</span><span className="status-pill"><Star size={15} fill="currentColor"/> {points} poin</span><span className="status-pill">Tertangkap: {caught.length}/3</span></div>
    <ProgressBar value={index + (solved ? 1 : 0)} total={words.length}/>
    <div className="catch-prompt"><div><span className="prompt-kicker" dir="rtl">اِسْمَعْ وَالْتَقِطْ الصُّوَرَ الْمُطَابِقَةَ</span><strong className="arabic-word" dir="rtl">{current.arabic}</strong><small dir="rtl">{solved ? 'أَحْسَنْتَ!' : 'اِلْتَقِطْ ثَلَاثَ صُوَرٍ مُطَابِقَةٍ'}</small></div><AudioButton text={current.arabic} topicId={topicId} itemId={current.id} label="اِسْتَمِعْ إِلَى الْكَلِمَةِ" /></div>
    <div className="catch-field"><div className="catch-cloud cloud-one"/><div className="catch-cloud cloud-two"/>{objects.map((obj) => <button type="button" key={obj.id} disabled={caught.includes(obj.id) || solved} onClick={() => catchObject(obj)} className={`catch-object ${obj.isTarget ? 'catch-target' : ''} ${caught.includes(obj.id) ? 'caught-object' : ''}`} style={{ left: `${obj.left}%`, top: `${obj.top}%`, animationDuration: `${obj.duration}s`, animationDelay: `${obj.delay}s`, '--drift': obj.drift, zIndex: obj.z + 1 }} aria-label={obj.item.arabic}>{caught.includes(obj.id) ? <Sparkles size={30}/> : <VocabularyArt item={obj.item} topicId={topicId} compact className="catch-object-art"/>}</button>)}</div>
    <p className="game-instruction" dir="rtl">{feedback}</p>
    {solved && <div className="success-panel"><div className="success-icon"><Trophy size={34}/></div><div><strong dir="rtl">أَحْسَنْتَ! لَقَدِ الْتَقَطْتَ الصُّوَرَ الثَّلَاثَ كُلَّهَا!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span dir="rtl">اِسْتَمِعْ مَرَّةً أُخْرَى لِتَتَذَكَّرَ الْكَلِمَةَ.</span><div className="inline-audio"><AudioButton text={current.arabic} topicId={topicId} itemId={current.id} compact label="أَعِدِ الِاسْتِمَاعَ"/></div></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Lanjut'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function GameRunner({ game, words, level, topicId, onFinish }) {
  if (game === 'memory') return <MemoryGame words={words} topicId={topicId} onFinish={onFinish}/>;
  if (game === 'wordsearch') return <WordSearchGame words={words} level={level} topicId={topicId} onFinish={onFinish}/>;
  if (game === 'arrange') return <ArrangeGame words={words} level={level} topicId={topicId} onFinish={onFinish}/>;
  return <CatchGame words={words} topicId={topicId} onFinish={onFinish}/>;
}

function ResultPage({ result, topic, game, level, onReplay, onGames, onThemes }) {
  const percent = Math.round((result.points / (result.total * 10)) * 100) || 0;
  const stars = percent >= 90 ? 3 : percent >= 70 ? 2 : 1;
  const message = percent >= 90 ? 'Luar biasa! Kamu hebat sekali!' : percent >= 70 ? 'Bagus! Terus berlatih, ya!' : 'Semangat! Coba lagi, kamu pasti bisa!';
  return <div className="app-page result-page"><div className="result-card"><div className="confetti confetti-a">✦</div><div className="confetti confetti-b">✧</div><Mascots className="result-mascots"/><span className="result-kicker"><Trophy size={16}/> PETUALANGAN SELESAI</span><h1>{message}</h1><p className="result-subtitle">Kamu sudah menyelesaikan {game.title} tema {topic.title}!</p><div className="result-stars">{Array.from({length:3},(_,i)=><Star key={i} size={38} fill={i<stars?'#ffc83d':'#e8edf5'} color={i<stars?'#efa900':'#d9e0ea'}/>)}</div><div className="score-circle"><strong>{percent}</strong><span>SKOR</span></div><div className="result-stats"><div><strong>{result.correct}/{result.total}</strong><span>Kosakata selesai</span></div><div><strong>{result.points}</strong><span>Poin terkumpul</span></div><div><strong>{levelInfo[level].label}</strong><span>Level dimainkan</span></div></div><p className="result-encouragement">Masyaallah! Setiap latihan membuatmu semakin mengenal mufradat.</p><div className="result-actions"><button className="primary-button" onClick={onReplay}><RotateCcw size={18}/> Main Lagi</button><button className="secondary-button" onClick={onGames}>Pilih Game Lain</button><button className="text-button" onClick={onThemes}>Kembali ke Tema</button></div></div></div>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [level, setLevel] = useState('easy');
  const [gameId, setGameId] = useState('memory');
  const [topicId, setTopicId] = useState('fruits');
  const [sessionWords, setSessionWords] = useState([]);
  const [sessionKey, setSessionKey] = useState(0);
  const [result, setResult] = useState({ points: 0, total: 0, correct: 0 });
  const [musicOn, setMusicOn] = useState(false);
  const topic = topics.find((t) => t.id === topicId) || topics[0];
  const game = games.find((g) => g.id === gameId) || games[0];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);
  useEffect(() => () => { stopAllAudio(); stopHomeMusic(); }, []);

  const toggleHomeMusic = async () => {
    const next = !musicOn;
    playMusicToggleSound(next);
    if (next) {
      const started = await startHomeMusic();
      setMusicOn(started);
      if (!started) window.dispatchEvent(new CustomEvent('pm-audio-notice', { detail: 'Musik belum bisa diputar. Coba klik tombol musik sekali lagi.' }));
    } else {
      stopHomeMusic();
      setMusicOn(false);
    }
  };

  const chooseTopic = (value) => {
    // Musik latar berhenti tepat saat pengguna memilih tema dan masuk ke halaman kosakata.
    stopHomeMusic();
    setMusicOn(false);
    setTopicId(value);
    setPage('learn');
  };

  const startSession = () => {
    const words = getGameWords(topic, level);
    setSessionWords(words);
    setSessionKey((k) => k + 1);
    setPage('play');
  };
  const finishSession = (data) => { setResult(data); setPage('result'); };
  const replay = () => startSession();

  return <div className="site-shell">
    {page === 'home' && <HomePage onStart={() => setPage('level')} musicOn={musicOn} onToggleMusic={toggleHomeMusic}/>}
    {page === 'level' && <LevelPage onBack={() => setPage('home')} onChoose={(v) => { setLevel(v); setPage('game'); }}/>}
    {page === 'game' && <GamePage onBack={() => setPage('level')} onChoose={(v) => { setGameId(v); setPage('theme'); }}/>}
    {page === 'theme' && <TopicPage onBack={() => setPage('game')} onChoose={chooseTopic}/>}
    {page === 'learn' && <LearnPage topic={topic} level={level} onBack={() => setPage('theme')} onStart={() => startSession()}/>}
    {page === 'play' && <div className="app-page play-page"><Header title={game.title} subtitle={`${topic.title} • Level ${levelInfo[level].label}`} onBack={() => setPage('learn')} right={<span className="level-chip"><LevelStars level={level}/></span>}/><GameRunner key={sessionKey} game={gameId} words={sessionWords} level={level} topicId={topic.id} onFinish={finishSession}/></div>}
    {page === 'result' && <ResultPage result={result} topic={topic} game={game} level={level} onReplay={replay} onGames={() => setPage('game')} onThemes={() => setPage('theme')}/>}
    <footer className="site-footer"><span><Heart size={13} fill="currentColor"/> Petualangan Mufradat</span><span>Belajar • Bermain • Bertumbuh</span></footer><AudioNotice />
  </div>;
}
