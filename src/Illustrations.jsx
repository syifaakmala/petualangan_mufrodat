import React, { useId } from 'react';

const topicSamples = {
  fruits: { id: 'apple', label: 'Apel' },
  animals: { id: 'lion', label: 'Singa' },
  'family-home': { id: 'house', label: 'Rumah' },
  school: { id: 'book', label: 'Buku' },
  food: { id: 'bread', label: 'Roti' },
  'time-days': { id: 'hour-5', label: 'Pukul 05.00' },
  numbers: { id: 'number-25', label: 'Dua puluh lima', numeric: 25 },
  professions: { id: 'doctor', label: 'Dokter' },
  places: { id: 'mosque', label: 'Masjid' },
};

const fruitPalette = {
  apple: ['#ff456e', '#b80f43'], banana: ['#ffe66c', '#f2a91c'], orange: ['#ffc04d', '#f07819'],
  grapes: ['#bd80ff', '#7132bd'], watermelon: ['#ff6685', '#d51c52'], strawberry: ['#ff6b80', '#c91546'],
  pineapple: ['#ffe36a', '#d98a1d'], mango: ['#ffbd49', '#ef5732'], melon: ['#c8f17c', '#4ea85e'],
  lemon: ['#fff07a', '#e7b51d'], dates: ['#a96a48', '#60331e'], pear: ['#c8ee72', '#73a832'],
  papaya: ['#ffb65b', '#f0782b'], rambutan: ['#ff6d61', '#b92b38'], guava: ['#ffc4d8', '#e96d9a'],
  starfruit: ['#ffe66c', '#d89c20'], salak: ['#b8794e', '#603c2c'], coconut: ['#d5a47b', '#795039'],
  pomegranate: ['#ff5a70', '#a60f36'], blueberry: ['#8bb8ff', '#3654b3'],
};
const animalPalette = {
  cat: ['#e7a96c', '#99582f'], chicken: ['#fff0ca', '#e9a33c'], cow: ['#f7f2e9', '#514d57'], goat: ['#dfc39c', '#89694a'],
  rabbit: ['#f6e5e9', '#b9899c'], elephant: ['#aab9d6', '#64799e'], lion: ['#ffc76b', '#a95b27'], horse: ['#bd8154', '#754329'],
  bird: ['#76d9f4', '#2876ba'], tiger: ['#ffb24e', '#c34d1e'], giraffe: ['#ffd06c', '#b76d24'], zebra: ['#f4f5fa', '#30384d'],
  crocodile: ['#83d79b', '#317d55'], snake: ['#7cdb9c', '#26704c'], monkey: ['#c48b64', '#70412e'], bear: ['#b9876b', '#633c32'],
  turtle: ['#8fe0a2', '#347c59'], ant: ['#ba604c', '#6c2c2b'], butterfly: ['#c69cff', '#7245bf'], bee: ['#ffda58', '#bd7620'],
};
const generalPalette = ['#55d9ff', '#2359c7'];
const shapeCategory = {
  fruits: 'fruit', animals: 'animal', 'family-home': 'home', school: 'school', food: 'food',
  professions: 'profession', places: 'place', numbers: 'number', 'time-days': 'time',
};

function ClockIllustration({ item, compact = false }) {
  const id = useId().replace(/:/g, '');
  const hour = Number(item?.id?.replace('hour-', '') ?? 5) || 0;
  const hour12 = hour % 12;
  const period = hour >= 5 && hour < 11 ? 'morning' : hour >= 11 && hour < 15 ? 'noon' : hour >= 15 && hour < 18 ? 'afternoon' : 'night';
  const hourAngle = hour12 * 30;
  const periodLabel = period === 'morning' ? 'PAGI' : period === 'noon' ? 'SIANG' : period === 'afternoon' ? 'SORE' : 'MALAM';
  return (
    <div className={`clock-art clock-${period} ${compact ? 'clock-art-compact' : ''}`} role="img" aria-label={`${item?.display || '05.00'} ${periodLabel.toLowerCase()}`}>
      <svg viewBox="0 0 190 190" className="clock-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#aaf8ff"/><stop offset=".42" stopColor="#318fff"/><stop offset="1" stopColor="#4b2db1"/></linearGradient>
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#ffffff"/><stop offset=".55" stopColor="#e8f8ff"/><stop offset="1" stopColor="#b8dcff"/></linearGradient>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff6a6"/><stop offset=".45" stopColor="#ffc83e"/><stop offset="1" stopColor="#e88719"/></linearGradient>
          <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <ellipse cx="95" cy="174" rx="57" ry="8" fill="#020b28" opacity=".35" filter={`url(#${id}-shadow)`}/>
        <circle cx="95" cy="94" r="82" fill="#030c2d" opacity=".55"/>
        <circle cx="95" cy="88" r="81" fill={`url(#${id}-rim)`} stroke="#a7f6ff" strokeWidth="2.5"/>
        <circle cx="95" cy="88" r="72" fill={`url(#${id}-face)`} stroke="#d8f7ff" strokeWidth="3"/>
        <circle cx="95" cy="88" r="65" fill="none" stroke="#7bb7ec" strokeOpacity=".35" strokeWidth="1.5"/>
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i * 6 - 90) * Math.PI / 180;
          const major = i % 5 === 0;
          const r1 = major ? 58 : 61;
          const r2 = 65;
          return <line key={i} x1={95 + Math.cos(a) * r1} y1={88 + Math.sin(a) * r1} x2={95 + Math.cos(a) * r2} y2={88 + Math.sin(a) * r2} stroke={major ? '#23518d' : '#82a9ce'} strokeWidth={major ? 2.3 : 1} strokeLinecap="round"/>;
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const a = (n * 30 - 90) * Math.PI / 180;
          const x = 95 + Math.cos(a) * 49;
          const y = 88 + Math.sin(a) * 49 + 4;
          return <text key={n} x={x} y={y} textAnchor="middle" fontSize="12" fontWeight="900" fill="#153d76" fontFamily="Arial, sans-serif">{n}</text>;
        })}
        <g className="clock-hour-hand" style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: '95px 88px' }}>
          <path d="M95 94 L89 89 L91 51 Q95 44 99 51 L101 89 Z" fill="#1855a1" stroke="#0b3976" strokeWidth="1.4"/>
          <path d="M95 88 L95 54" stroke="#8ceaff" strokeWidth="2.4" strokeLinecap="round" opacity=".85"/>
        </g>
        <g className="clock-minute-hand" style={{ transform: 'rotate(0deg)', transformOrigin: '95px 88px' }}>
          <path d="M95 96 L91 89 L93 29 Q95 23 97 29 L99 89 Z" fill="#ef9d20" stroke="#a85b0d" strokeWidth="1.1"/>
          <path d="M95 87 L95 31" stroke="#fff3a2" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <circle cx="95" cy="88" r="7" fill={`url(#${id}-gold)`} stroke="#a55e0a" strokeWidth="1.2"/>
        <circle cx="95" cy="88" r="2.5" fill="#fff7cb"/>
        {period === 'morning' && <g className="clock-sun"><circle cx="151" cy="35" r="15" fill={`url(#${id}-gold)`}/><path d="M151 12v-5 M151 63v-5 M128 35h-5 M179 35h-5 M135 19l-4-4 M171 55l-4-4 M167 19l4-4 M131 55l4-4" stroke="#ffdf62" strokeWidth="3" strokeLinecap="round"/></g>}
        {period === 'noon' && <g className="clock-sun"><circle cx="151" cy="35" r="16" fill={`url(#${id}-gold)`}/><path d="M151 10v-5 M151 65v-5 M126 35h-5 M181 35h-5 M133 17l-4-4 M173 57l-4-4 M169 17l4-4 M129 57l4-4" stroke="#ffe77c" strokeWidth="3" strokeLinecap="round"/></g>}
        {period === 'afternoon' && <g className="clock-sunset"><circle cx="151" cy="35" r="15" fill="#ff9c48"/><path d="M130 37h42 M136 43h30" stroke="#ffcf6a" strokeWidth="3" strokeLinecap="round"/><path d="M151 14v-5 M128 35h-5 M179 35h-5" stroke="#ffcb63" strokeWidth="3" strokeLinecap="round"/></g>}
        {period === 'night' && <g className="clock-moon"><path d="M158 20a17 17 0 1 0 13 27 18 18 0 0 1-13-27Z" fill="#f5f0b0" stroke="#d4d7ff" strokeWidth="1.4"/><path d="M137 54l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff4a5"/><circle cx="177" cy="58" r="2.5" fill="#fff"/></g>}
      </svg>
      <span className="clock-digital-label">{item?.display || '05.00'}</span>
      <span className="clock-period-label">{periodLabel}</span>
    </div>
  );
}

function NumberArt({ item }) {
  const value = item?.numeric ?? Number(item?.id?.replace('number-', '') || 1);
  const arabicNumber = new Intl.NumberFormat('ar-EG', { useGrouping: false }).format(value);
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 160 160" className="illustration-svg number-illustration" role="img" aria-label={`Angka ${value}`}>
    <defs><linearGradient id={`${id}-n`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff47a"/><stop offset=".48" stopColor="#ffae37"/><stop offset="1" stopColor="#ed5d4b"/></linearGradient><radialGradient id={`${id}-bg`}><stop stopColor="#4ee7ff" stopOpacity=".42"/><stop offset="1" stopColor="#322b99" stopOpacity="0"/></radialGradient></defs>
    <circle cx="80" cy="80" r="72" fill={`url(#${id}-bg)`}/><path d="M80 13l8 17 18 3-13 13 3 18-16-9-16 9 3-18-13-13 18-3Z" fill="#fff0a4" opacity=".85"/>
    <rect x="27" y="35" width="106" height="91" rx="25" fill="#08285e" opacity=".65" transform="translate(0 5)"/><rect x="27" y="30" width="106" height="91" rx="25" fill={`url(#${id}-n)`} stroke="#fff1a4" strokeWidth="3"/>
    <text x="80" y="97" textAnchor="middle" fontSize={value > 9 ? 46 : 62} fontWeight="900" fill="#fff" stroke="#b64a22" strokeWidth="1.5" paintOrder="stroke" fontFamily="Arial, sans-serif">{arabicNumber}</text>
    <circle cx="45" cy="48" r="5" fill="#fff" opacity=".75"/><circle cx="116" cy="106" r="4" fill="#fff" opacity=".55"/>
  </svg>;
}

function CalendarArt({ item }) {
  const day = (item?.label || 'Hari').slice(0, 3).toUpperCase();
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 160 160" className="illustration-svg" role="img" aria-label={item?.label || 'Hari'}>
    <defs><linearGradient id={`${id}-cal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff7cae"/><stop offset="1" stopColor="#a83d9e"/></linearGradient><linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#d9efff"/></linearGradient></defs>
    <ellipse cx="80" cy="137" rx="48" ry="8" fill="#030b2b" opacity=".3"/><rect x="27" y="27" width="106" height="112" rx="19" fill="#08245b" opacity=".65" transform="translate(0 5)"/><rect x="27" y="22" width="106" height="112" rx="19" fill={`url(#${id}-paper)`} stroke="#a8eaff" strokeWidth="3"/><path d="M27 41a19 19 0 0 1 19-19h68a19 19 0 0 1 19 19v16H27Z" fill={`url(#${id}-cal)`}/><path d="M53 15v18 M107 15v18" stroke="#fff" strokeWidth="7" strokeLinecap="round"/><text x="80" y="48" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" fontFamily="Arial">{day}</text><text x="80" y="104" textAnchor="middle" fontSize="39" fontWeight="900" fill="#1d4b8c" fontFamily="Arial">٧</text><circle cx="48" cy="77" r="4" fill="#53c9ff"/><circle cx="112" cy="77" r="4" fill="#ff9d59"/><circle cx="48" cy="119" r="4" fill="#a879ff"/><circle cx="112" cy="119" r="4" fill="#63d9b0"/>
  </svg>;
}

function PeriodArt({ item }) {
  const id = item?.id || 'morning';
  const isNight = id === 'night';
  const isSunset = id === 'afternoon';
  const isNoon = id === 'noon';
  const grad = isNight ? ['#9c8cff','#313e9f'] : isSunset ? ['#ffbd69','#f36b83'] : isNoon ? ['#fff078','#ff9b38'] : ['#ffe68a','#56c9ff'];
  const gid = useId().replace(/:/g, '');
  return <svg viewBox="0 0 160 160" className="illustration-svg" role="img" aria-label={item?.label || 'Waktu'}>
    <defs><linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={grad[0]}/><stop offset="1" stopColor={grad[1]}/></linearGradient></defs>
    <rect x="16" y="22" width="128" height="112" rx="30" fill={`url(#${gid}-sky)`} stroke="#b7f5ff" strokeWidth="3"/>
    {isNight ? <><path d="M91 39a30 30 0 1 0 25 48 32 32 0 0 1-25-48Z" fill="#fff3b0"/><path d="M42 48l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z M116 93l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff"/></> : <><circle cx="80" cy={isSunset ? 82 : 68} r="29" fill="#fff1a0" stroke="#ffcc51" strokeWidth="4"/><path d="M20 110Q43 80 65 106T110 102T144 106V134H16Z" fill="#4ca8d8" opacity=".7"/>{isSunset && <path d="M16 118H144" stroke="#ffe8a6" strokeWidth="4" opacity=".8"/>}</>}
    <path d="M25 96q12-15 25 0q13-14 27 0q12-12 24 0q12-13 26 0v22H25Z" fill="#fff" opacity=".72"/>
    <circle cx="125" cy="39" r="3" fill="#fff"/><circle cx="35" cy="49" r="2.5" fill="#fff"/>
  </svg>;
}

function FruitShape({ item, grad }) {
  const id = item.id;
  const leaf = <><path d="M80 40Q92 14 116 22Q109 44 82 47Z" fill="#49c879" stroke="#218c57" strokeWidth="2"/><path d="M83 43Q99 31 111 26" stroke="#d7ffd7" strokeWidth="2" fill="none"/></>;
  if (id === 'banana') return <><path d="M31 56Q40 111 97 125Q130 132 139 96Q120 110 103 103Q65 89 52 42Z" fill={`url(#${grad})`} stroke="#d58b18" strokeWidth="3"/><path d="M36 52Q68 102 132 95" fill="none" stroke="#fff3a1" strokeWidth="7" strokeLinecap="round" opacity=".75"/><path d="M31 51l7-5 8 8-7 7Z M132 91l10 2-4 12-9-4Z" fill="#754b2b"/></>;
  if (id === 'watermelon') return <><path d="M25 58Q80 15 135 58L80 130Z" fill="#4acb78" stroke="#18854e" strokeWidth="4"/><path d="M35 61Q80 28 125 61L80 119Z" fill="#ff4e78"/><path d="M42 65Q80 40 118 65" fill="none" stroke="#ffd6e0" strokeWidth="4"/><g fill="#6d1835"><ellipse cx="68" cy="76" rx="3" ry="6"/><ellipse cx="90" cy="68" rx="3" ry="6"/><ellipse cx="85" cy="93" rx="3" ry="6"/><ellipse cx="61" cy="97" rx="3" ry="6"/></g></>;
  if (id === 'grapes' || id === 'blueberry' || id === 'dates') {
    const c = id === 'grapes' ? '#a96cff' : id === 'blueberry' ? '#537fe5' : '#875039';
    return <><path d="M80 39Q94 18 118 24Q109 44 83 47Z" fill="#53ce80"/><path d="M80 40Q80 22 93 17" stroke="#6a4728" strokeWidth="5" strokeLinecap="round"/><g fill={c} stroke={id === 'dates' ? '#59301e' : '#5436a2'} strokeWidth="2">{[[63,57],[91,56],[48,80],[76,82],[104,81],[62,108],[90,108],[76,132]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={id==='dates'?15:17}/>)}</g><g fill="#fff" opacity=".4">{[[57,52],[85,51],[42,75],[70,77],[98,76]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5"/>)}</g></>;
  }
  if (id === 'pineapple') return <><path d="M80 53Q44 19 42 10Q69 13 80 42Q88 8 111 7Q105 33 84 53Q115 22 130 29Q112 54 84 61Z" fill="#49c979" stroke="#228c58" strokeWidth="2"/><ellipse cx="80" cy="91" rx="37" ry="48" fill={`url(#${grad})`} stroke="#bd7a1b" strokeWidth="3"/><path d="M53 66l53 54 M48 89l45 43 M108 66L55 120 M112 88l-40 43" stroke="#fff1a0" strokeWidth="3" opacity=".65"/></>;
  if (id === 'strawberry') return <><path d="M80 132Q27 88 49 53Q61 31 80 48Q100 31 114 54Q136 90 80 132Z" fill={`url(#${grad})`} stroke="#b91e4d" strokeWidth="3"/><path d="M80 52Q66 28 51 35Q59 54 79 58Q93 31 111 36Q104 56 82 60Z" fill="#45c777"/><g fill="#ffe89c">{[[63,66],[91,68],[75,86],[103,89],[59,96],[84,111]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="2.5" ry="4" transform={`rotate(25 ${x} ${y})`}/>)}</g></>;
  if (id === 'starfruit') return <><path d="M80 26L94 61L132 62L102 86L112 124L80 102L48 124L58 86L28 62L66 61Z" fill={`url(#${grad})`} stroke="#b17b16" strokeWidth="3"/><path d="M80 35L80 96" stroke="#fff7b0" strokeWidth="4" opacity=".65"/></>;
  if (id === 'coconut') return <><circle cx="72" cy="84" r="49" fill={`url(#${grad})`} stroke="#65422c" strokeWidth="4"/><ellipse cx="100" cy="103" rx="37" ry="32" fill="#fff4d9" stroke="#b6d6dc" strokeWidth="3"/><ellipse cx="101" cy="104" rx="26" ry="22" fill="#f4e2b7"/><circle cx="58" cy="65" r="7" fill="#483126"/><circle cx="82" cy="59" r="6" fill="#483126"/><circle cx="68" cy="84" r="5" fill="#483126"/></>;
  if (id === 'pomegranate') return <><path d="M61 39l-7-17 17 7 9-14 10 15 17-8-6 20" fill="#49c979" stroke="#218c57" strokeWidth="3"/><circle cx="80" cy="87" r="48" fill={`url(#${grad})`} stroke="#a81f45" strokeWidth="3"/><path d="M55 72Q75 45 105 63" fill="none" stroke="#fff" strokeWidth="7" opacity=".35" strokeLinecap="round"/></>;
  if (id === 'pear') return <><path d="M77 42Q67 62 52 77Q28 112 58 133Q80 148 105 132Q136 111 107 77Q91 61 88 42Z" fill={`url(#${grad})`} stroke="#65952e" strokeWidth="3"/><path d="M80 43Q78 29 88 20" stroke="#79502c" strokeWidth="6" strokeLinecap="round"/><path d="M84 42Q102 24 118 34Q108 50 85 48Z" fill="#51c878"/><ellipse cx="64" cy="78" rx="12" ry="22" fill="#fff" opacity=".25"/></>;
  if (id === 'lemon') return <><path d="M30 84Q47 37 80 48Q113 35 130 84Q111 130 80 120Q48 134 30 84Z" fill={`url(#${grad})`} stroke="#c18b18" strokeWidth="3"/><path d="M43 79Q60 56 88 60" fill="none" stroke="#fff9ba" strokeWidth="7" strokeLinecap="round" opacity=".75"/><path d="M79 49Q84 32 99 29" stroke="#6b4a2c" strokeWidth="5" strokeLinecap="round"/></>;
  if (id === 'melon' || id === 'guava' || id === 'orange' || id === 'rambutan' || id === 'salak' || id === 'papaya') {
    if (id === 'papaya') return <><ellipse cx="80" cy="84" rx="37" ry="57" fill={`url(#${grad})`} stroke="#b75c21" strokeWidth="3" transform="rotate(25 80 84)"/><path d="M62 47Q92 35 111 69Q120 100 91 129Q59 119 50 87Q45 64 62 47Z" fill="#ffdb9a"/><g fill="#55332c">{[[75,69],[89,76],[76,87],[94,95],[81,105]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5"/>)}</g></>;
    if (id === 'guava') return <><circle cx="80" cy="84" r="50" fill="#76d78b" stroke="#318c55" strokeWidth="3"/><circle cx="80" cy="84" r="37" fill="#fff0d5"/><circle cx="80" cy="84" r="23" fill="#ffb6c8"/><g fill="#d88a6a">{Array.from({length:9},(_,i)=><circle key={i} cx={80+Math.cos(i*0.7)*14} cy={84+Math.sin(i*0.7)*14} r="2"/>)}</g></>;
    if (id === 'rambutan') return <><circle cx="80" cy="85" r="43" fill={`url(#${grad})`} stroke="#b62c39" strokeWidth="3"/>{Array.from({length:28},(_,i)=>{const a=i*Math.PI*2/28;return <path key={i} d={`M${80+Math.cos(a)*38} ${85+Math.sin(a)*38} L${80+Math.cos(a)*59} ${85+Math.sin(a)*59}`} stroke="#ed5c55" strokeWidth="4" strokeLinecap="round"/>})}<circle cx="65" cy="70" r="10" fill="#fff" opacity=".28"/></>;
    if (id === 'salak') return <><path d="M80 37Q115 32 128 74Q135 116 80 135Q25 116 32 74Q45 32 80 37Z" fill={`url(#${grad})`} stroke="#68412d" strokeWidth="3"/>{Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=><path key={`${r}-${c}`} d={`M${46+c*15+(r%2)*7} ${58+r*14}q7-9 14 0`} fill="none" stroke="#e2ad7b" strokeWidth="2" opacity=".65"/>))}</>;
    if (id === 'melon') return <><circle cx="80" cy="84" r="51" fill={`url(#${grad})`} stroke="#3b8d57" strokeWidth="3"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${80+Math.cos(i*Math.PI/9)*49} ${84+Math.sin(i*Math.PI/9)*49} Q${80+Math.cos(i*Math.PI/9)*15} ${84+Math.sin(i*Math.PI/9)*15} ${80-Math.cos(i*Math.PI/9)*49} ${84-Math.sin(i*Math.PI/9)*49}`} fill="none" stroke="#e7ffc2" strokeWidth="2" opacity=".5"/>)}</>;
    return <><circle cx="80" cy="84" r="49" fill={`url(#${grad})`} stroke="#c86c16" strokeWidth="3"/><circle cx="63" cy="66" r="12" fill="#fff" opacity=".28"/><path d="M80 35Q88 20 103 25Q98 39 81 42Z" fill="#4dc978"/></>;
  }
  return <><path d="M80 38Q59 23 43 42Q25 63 42 108Q56 139 80 129Q104 139 118 108Q135 63 117 42Q101 23 80 38Z" fill={`url(#${grad})`} stroke="#a43a50" strokeWidth="3"/><path d="M80 41Q74 20 88 14" stroke="#6a482b" strokeWidth="5"/><path d="M84 37Q100 18 117 25Q109 43 85 43Z" fill="#49c979"/></>;
}

function AnimalShape({ item, grad }) {
  const id = item.id;
  if (id === 'butterfly') return <><path d="M76 78Q24 16 24 67Q18 120 77 96Q32 145 67 134Q83 123 82 93Z" fill={`url(#${grad})`} stroke="#6a49bb" strokeWidth="3"/><path d="M84 78Q136 16 136 67Q142 120 83 96Q128 145 93 134Q77 123 78 93Z" fill="#ff75c6" stroke="#6a49bb" strokeWidth="3"/><path d="M80 62v62" stroke="#503b83" strokeWidth="8" strokeLinecap="round"/><path d="M78 64Q60 37 55 31 M82 64Q100 37 105 31" stroke="#503b83" strokeWidth="3" fill="none"/><circle cx="50" cy="73" r="9" fill="#fff" opacity=".6"/><circle cx="110" cy="73" r="9" fill="#fff" opacity=".6"/></>;
  if (id === 'bee') return <><ellipse cx="80" cy="88" rx="42" ry="34" fill={`url(#${grad})`} stroke="#9d5a1c" strokeWidth="3"/><path d="M62 57Q49 29 32 49Q27 67 60 76Z M99 57Q116 29 133 49Q138 67 101 76Z" fill="#e7f7ff" stroke="#8dbbdc" strokeWidth="3" opacity=".9"/><path d="M62 57Q55 85 62 118 M91 56Q84 86 92 119" stroke="#74451b" strokeWidth="10"/><circle cx="68" cy="83" r="4" fill="#2a2739"/><circle cx="91" cy="83" r="4" fill="#2a2739"/><path d="M72 101q8 7 16 0" stroke="#7e3325" strokeWidth="3" fill="none" strokeLinecap="round"/></>;
  if (id === 'ant') return <><ellipse cx="50" cy="86" rx="19" ry="24" fill={`url(#${grad})`}/><ellipse cx="84" cy="87" rx="18" ry="20" fill="#a84d3f"/><ellipse cx="119" cy="88" rx="25" ry="30" fill="#80352f"/><path d="M57 71L35 48 M57 99L33 123 M82 71L72 45 M85 102L71 130 M100 69L117 48 M100 104L119 129 M42 65Q30 35 46 28 M53 65Q68 34 60 26" stroke="#5f2a2a" strokeWidth="5" fill="none" strokeLinecap="round"/></>;
  if (id === 'turtle') return <><ellipse cx="78" cy="91" rx="48" ry="35" fill={`url(#${grad})`} stroke="#286d51" strokeWidth="3"/><path d="M46 88Q80 44 111 88Q80 129 46 88Z" fill="#49a96d" stroke="#236a50" strokeWidth="3"/><path d="M80 49v77 M48 87h64 M58 64l44 48 M101 64L58 112" stroke="#a6e39b" strokeWidth="2" opacity=".7"/><circle cx="128" cy="85" r="19" fill="#81dba1" stroke="#347b58" strokeWidth="3"/><circle cx="134" cy="80" r="3.5" fill="#163f37"/></>;
  if (id === 'snake') return <><path d="M30 113Q32 45 78 48Q123 50 123 91Q122 124 85 121Q58 117 63 91Q68 72 89 79" fill="none" stroke="#267b55" strokeWidth="28" strokeLinecap="round"/><path d="M30 113Q32 45 78 48Q123 50 123 91Q122 124 85 121Q58 117 63 91Q68 72 89 79" fill="none" stroke={`url(#${grad})`} strokeWidth="22" strokeLinecap="round"/><circle cx="98" cy="78" r="5" fill="#fff"/><circle cx="100" cy="78" r="2.5" fill="#26364b"/><path d="M115 92l12 4-12 4" fill="#ed5a70"/></>;
  const base = id === 'elephant' ? '#aab9d6' : id === 'lion' ? '#eeb25e' : id === 'tiger' ? '#f3a344' : id === 'zebra' ? '#f4f5f8' : id === 'giraffe' ? '#f4c45f' : null;
  const ear = id === 'rabbit' ? 23 : id === 'elephant' ? 31 : id === 'lion' ? 18 : id === 'bear' ? 19 : 16;
  const isBird = id === 'bird' || id === 'chicken';
  const isCroc = id === 'crocodile';
  const face = base || '#c98d63';
  return <>
    <ellipse cx="80" cy="91" rx="52" ry="50" fill={face} stroke="#6b4d4a" strokeWidth="3"/>
    <ellipse cx="42" cy="55" rx={ear} ry={ear + 5} fill={face} stroke="#6b4d4a" strokeWidth="3"/><ellipse cx="118" cy="55" rx={ear} ry={ear + 5} fill={face} stroke="#6b4d4a" strokeWidth="3"/>
    {id === 'rabbit' && <><path d="M58 48Q43 3 59 7Q74 10 74 49Z M88 49Q88 7 104 8Q119 13 102 53Z" fill="#f4dce7" stroke="#a77e95" strokeWidth="3"/></>}
    {id === 'cow' && <><path d="M48 45Q33 13 52 19L70 43 M90 43L109 19Q128 13 112 47" fill="#fff" stroke="#777" strokeWidth="3"/><path d="M45 65l18 11-10 19-16-12Z M103 59l18 12-13 18-14-12Z" fill="#37323d"/></>}
    {id === 'goat' && <><path d="M55 43Q37 6 53 13Q70 21 69 47 M91 47Q90 21 108 13Q124 6 105 43" fill="#fff0d2" stroke="#8d684b" strokeWidth="3"/><path d="M75 121l5 12 5-12" fill="#9b7351"/></>}
    {id === 'lion' && <><circle cx="80" cy="85" r="61" fill="#d88935" stroke="#8d4d22" strokeWidth="4"/><circle cx="80" cy="88" r="43" fill="#ffc96f"/><path d="M80 31l8 13 15-10 1 17 18-1-9 16 14 10-16 8 8 17-18-2-4 18-14-11-13 12-4-18-18 3 8-17-15-9 14-10-9-15 18 1 2-17Z" fill="#b96b2d" opacity=".7"/></>}
    {isBird && <><path d="M110 81L139 91L110 103Z" fill="#ffad37" stroke="#bd651a" strokeWidth="2"/><path d="M56 121Q82 140 106 115" fill="none" stroke="#bd651a" strokeWidth="6"/></>}
    {id === 'elephant' && <path d="M92 98Q120 103 111 131Q105 148 90 135Q85 128 91 116" fill="none" stroke="#758aa9" strokeWidth="19" strokeLinecap="round"/>}
    {id === 'horse' && <path d="M52 49Q48 30 67 26Q81 23 91 35" fill="none" stroke="#53352b" strokeWidth="9" strokeLinecap="round"/>}
    {id === 'tiger' && <path d="M47 58l13 13-10 10 M113 58L100 71l10 10 M45 95l16-5 M115 95l-16-5" stroke="#733a20" strokeWidth="6" fill="none" strokeLinecap="round"/>}
    {id === 'zebra' && <path d="M47 58l16 19-15 17 M113 58L97 77l15 17 M43 102l19-8 M117 102l-19-8" stroke="#454c59" strokeWidth="5" fill="none"/>}
    {id === 'giraffe' && <><path d="M58 42L55 22 M102 42L105 22" stroke="#96602a" strokeWidth="5" strokeLinecap="round"/><circle cx="55" cy="19" r="5" fill="#96602a"/><circle cx="105" cy="19" r="5" fill="#96602a"/><g fill="#a76a2c"><circle cx="55" cy="70" r="6"/><circle cx="105" cy="72" r="6"/><circle cx="79" cy="115" r="7"/></g></>}
    {isCroc && <><path d="M30 91Q80 53 137 92Q80 130 30 91Z" fill="#6cbe78" stroke="#347a4b" strokeWidth="3"/><path d="M40 93l9 10 9-10 9 10 9-10 9 10 9-10 9 10 9-10" stroke="#fff" strokeWidth="3" fill="none"/></>}
    {id === 'monkey' && <ellipse cx="80" cy="103" rx="31" ry="25" fill="#eac19a"/>}
    {id === 'chicken' && <path d="M69 35Q64 15 77 22Q84 8 92 24Q105 14 105 35" fill="#e65b54" stroke="#a82e38" strokeWidth="2"/>}
    {id === 'cat' && <path d="M40 54L37 21L67 43 M120 54L123 21L93 43" fill={face} stroke="#6b4d4a" strokeWidth="3"/>}
    <ellipse cx="62" cy="84" rx="7" ry="10" fill="#fff"/><ellipse cx="98" cy="84" rx="7" ry="10" fill="#fff"/><circle cx="64" cy="85" r="4" fill="#263348"/><circle cx="100" cy="85" r="4" fill="#263348"/>
    <ellipse cx="80" cy="104" rx={isCroc ? 22 : 17} ry="13" fill={isBird ? '#ffe1b3' : '#f5d4b7'} stroke="#986b58" strokeWidth="2"/>
    {isBird ? <path d="M80 95l-7 10 14 0Z" fill="#ff9d31"/> : <path d="M75 101l5 4 5-4" fill="#8d4b53"/>}
    <path d="M70 116q10 9 20 0" stroke="#8d4b53" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </>;
}

function ObjectShape({ item, category, grad }) {
  const id = item.id;
  if (category === 'fruit') return <FruitShape item={item} grad={grad}/>;
  if (category === 'animal') return <AnimalShape item={item} grad={grad}/>;
  if (category === 'profession') return <><circle cx="80" cy="54" r="28" fill="#f1bd8e" stroke="#8a583e" strokeWidth="3"/><path d="M48 48Q52 16 81 21Q111 17 113 48Q92 36 48 48Z" fill="#4e372e"/><path d="M42 133Q43 85 80 85Q117 85 118 133Z" fill={`url(#${grad})`} stroke="#204c91" strokeWidth="3"/><path d="M65 91l15 20 15-20" fill="#fff"/><circle cx="70" cy="57" r="3" fill="#3d2d29"/><circle cx="91" cy="57" r="3" fill="#3d2d29"/><path d="M73 70q7 7 14 0" stroke="#9b4e50" strokeWidth="3" fill="none" strokeLinecap="round"/>{id === 'doctor' || id === 'nurse' || id === 'dentist' ? <><path d="M63 94Q62 121 80 122Q98 121 97 94" fill="none" stroke="#35d5e8" strokeWidth="5"/><circle cx="80" cy="123" r="7" fill="#b5f7ff" stroke="#168bb6" strokeWidth="2"/></> : id === 'cook' ? <><path d="M53 32Q51 11 67 19Q76 2 89 18Q111 12 107 35Z" fill="#fff" stroke="#c4d8e9" strokeWidth="3"/></> : id === 'police' ? <><path d="M50 36Q80 4 110 36L108 47H52Z" fill="#164c91" stroke="#f3d36d" strokeWidth="3"/><path d="M43 47h74" stroke="#f3d36d" strokeWidth="5"/></> : id === 'farmer' ? <><path d="M43 39Q80 3 117 39L129 47H31Z" fill="#d7a94d" stroke="#8d5c2d" strokeWidth="3"/></> : <><path d="M54 34Q80 5 106 34L104 46H56Z" fill="#4c78c9" stroke="#d7edff" strokeWidth="3"/></>}</>;
  if (category === 'place') {
    const mosque = id === 'mosque';
    return <><rect x="30" y="72" width="100" height="66" rx="7" fill={`url(#${grad})`} stroke="#285eaa" strokeWidth="3"/><path d="M24 73L80 42L136 73Z" fill="#f4c45d" stroke="#a86b25" strokeWidth="3"/>{mosque && <><path d="M56 43Q80 3 104 43Z" fill="#5ed8d0" stroke="#268d9a" strokeWidth="3"/><rect x="117" y="25" width="13" height="113" rx="5" fill="#e4f3ff" stroke="#477cb7" strokeWidth="3"/><path d="M112 25L123 9L135 25Z" fill="#f8d15c"/></>}{Array.from({length:3},(_,i)=><rect key={i} x={42+i*27} y="86" width="17" height="27" rx="8" fill="#123b78" stroke="#d8f7ff" strokeWidth="2"/>)}<rect x="72" y="107" width="17" height="31" rx="8" fill="#173d76"/></>;
  }
  if (category === 'school') {
    if (id.includes('pencil') || id === 'marker' || id === 'ruler') return <><path d="M54 119L43 107L102 27Q110 19 119 27Q127 35 119 43Z" fill={`url(#${grad})`} stroke="#7c4e28" strokeWidth="3"/><path d="M43 107L37 129L59 119Z" fill="#eac79a" stroke="#8c5d36" strokeWidth="2"/><path d="M60 97L111 32" stroke="#fff" strokeWidth="5" opacity=".6"/></>;
    if (id === 'book' || id === 'notebook') return <><path d="M29 40Q58 29 80 45Q102 29 131 40V125Q101 115 80 132Q57 115 29 125Z" fill={`url(#${grad})`} stroke="#173f85" strokeWidth="3"/><path d="M80 46V129" stroke="#e5f7ff" strokeWidth="4"/><path d="M42 58h26 M42 70h26 M94 58h24 M94 70h24" stroke="#fff" strokeWidth="3" opacity=".75"/></>;
    if (id === 'computer') return <><rect x="28" y="30" width="104" height="75" rx="10" fill="#233d6f" stroke="#7de8ff" strokeWidth="4"/><rect x="37" y="39" width="86" height="55" rx="5" fill="#56c9f5"/><path d="M80 106v15 M57 123h46" stroke="#d8f5ff" strokeWidth="7" strokeLinecap="round"/><path d="M48 82l20-19 13 12 20-22" fill="none" stroke="#fff" strokeWidth="4"/></>;
    if (id === 'scissors') return <><circle cx="52" cy="106" r="17" fill="none" stroke="#ff9a68" strokeWidth="9"/><circle cx="108" cy="106" r="17" fill="none" stroke="#ff9a68" strokeWidth="9"/><path d="M64 94L117 29 M96 94L43 29" stroke="#c9efff" strokeWidth="8" strokeLinecap="round"/></>;
    if (id === 'bag' || id === 'pencilcase') return <><rect x="39" y="47" width="82" height="83" rx="21" fill={`url(#${grad})`} stroke="#244c91" strokeWidth="3"/><path d="M58 49Q58 21 80 21Q102 21 102 49" fill="none" stroke="#b9f0ff" strokeWidth="8"/><rect x="54" y="78" width="52" height="34" rx="10" fill="#fff" opacity=".28"/><path d="M80 81v26" stroke="#fff" strokeWidth="3" opacity=".5"/></>;
    if (id === 'school' || id === 'classroom') return <><path d="M23 67L80 25L137 67V132H23Z" fill={`url(#${grad})`} stroke="#1c5a9a" strokeWidth="3"/><rect x="65" y="88" width="30" height="44" rx="14" fill="#123d76"/><rect x="37" y="78" width="19" height="21" rx="3" fill="#d9f8ff"/><rect x="104" y="78" width="19" height="21" rx="3" fill="#d9f8ff"/><path d="M71 52h18" stroke="#fff" strokeWidth="5"/></>;
    return <><rect x="37" y="35" width="86" height="93" rx="13" fill={`url(#${grad})`} stroke="#24508e" strokeWidth="3"/><path d="M52 56h56 M52 71h56 M52 86h40" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7"/><circle cx="109" cy="108" r="5" fill="#ffe16a"/></>;
  }
  if (category === 'food') {
    if (id === 'egg') return <><path d="M80 24Q42 24 42 89Q42 130 80 135Q118 130 118 89Q118 24 80 24Z" fill="#fff6dc" stroke="#d8c8a5" strokeWidth="3"/><ellipse cx="80" cy="92" rx="24" ry="24" fill="#ffc64e" stroke="#e29a26" strokeWidth="3"/></>;
    if (id === 'bread' || id === 'pie') return <><path d="M28 95Q24 51 58 52Q80 22 105 51Q140 50 132 97Q126 132 80 132Q34 132 28 95Z" fill={`url(#${grad})`} stroke="#a76a31" strokeWidth="3"/><path d="M49 66Q79 43 111 67" stroke="#fff1c1" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".65"/></>;
    if (id === 'milk' || id === 'juice' || id === 'water' || id === 'tea' || id === 'coffee') return <><path d="M51 34H109L101 131H59Z" fill={`url(#${grad})`} stroke="#a4d8e9" strokeWidth="3"/><path d="M57 70H104L100 121H62Z" fill={id === 'coffee' ? '#7a492c' : id === 'tea' ? '#b77835' : id === 'milk' ? '#fff9eb' : '#5bc9ed'} opacity=".8"/><path d="M61 38h38" stroke="#fff" strokeWidth="5" strokeLinecap="round"/><path d="M95 35l12-18" stroke="#fff" strokeWidth="6" strokeLinecap="round"/></>;
    if (id === 'cheese') return <><path d="M27 109L83 36L135 109Z" fill={`url(#${grad})`} stroke="#c18a25" strokeWidth="3"/><circle cx="82" cy="89" r="7" fill="#fff0a6"/><circle cx="108" cy="105" r="5" fill="#fff0a6"/><circle cx="62" cy="108" r="4" fill="#fff0a6"/></>;
    if (id === 'honey') return <><path d="M55 43h50v17q14 12 14 29v39H41V89q0-17 14-29Z" fill={`url(#${grad})`} stroke="#b77519" strokeWidth="3"/><rect x="56" y="29" width="48" height="17" rx="5" fill="#a86a2d"/><path d="M57 80h46" stroke="#fff0a2" strokeWidth="6" opacity=".65"/></>;
    return <><ellipse cx="80" cy="104" rx="56" ry="25" fill="#d6f3ff" stroke="#5ca6cf" strokeWidth="3"/><path d="M31 83Q80 121 129 83L119 113Q80 145 41 113Z" fill={`url(#${grad})`} stroke="#a66a3c" strokeWidth="3"/><circle cx="66" cy="76" r="17" fill="#fff2d6" opacity=".8"/><circle cx="99" cy="75" r="14" fill="#e8f4a0" opacity=".8"/></>;
  }
  // Household objects: clean, glossy silhouettes with distinct silhouettes by object.
  if (category === 'home') {
    if (['father','mother','brother','sister','grandfather','grandmother'].includes(id)) return <><circle cx="80" cy="53" r="27" fill="#e9b68e" stroke="#9a6447" strokeWidth="3"/><path d="M51 51Q52 18 81 20Q110 18 109 51Q92 35 51 51Z" fill={id.includes('mother') || id === 'sister' || id === 'grandmother' ? '#382d49' : '#52372d'}/><path d="M36 137Q40 84 80 84Q120 84 124 137Z" fill={`url(#${grad})`} stroke="#27518d" strokeWidth="3"/><circle cx="70" cy="57" r="3" fill="#352a2b"/><circle cx="91" cy="57" r="3" fill="#352a2b"/><path d="M72 69q8 8 16 0" fill="none" stroke="#9c4e50" strokeWidth="3" strokeLinecap="round"/></>;
    if (id === 'house') return <><path d="M22 76L80 27L138 76V137H22Z" fill={`url(#${grad})`} stroke="#255b9e" strokeWidth="4"/><path d="M16 77L80 19L144 77" stroke="#ffcf61" strokeWidth="12" strokeLinecap="round" fill="none"/><rect x="65" y="91" width="31" height="46" rx="14" fill="#123e7b"/><rect x="36" y="82" width="19" height="22" rx="4" fill="#c7f5ff"/><rect x="106" y="82" width="19" height="22" rx="4" fill="#c7f5ff"/></>;
    if (id === 'wallclock') return <><circle cx="80" cy="82" r="56" fill="#f6fbff" stroke="#e7b84a" strokeWidth="12"/><circle cx="80" cy="82" r="48" fill="#e3f7ff" stroke="#367cc4" strokeWidth="3"/>{Array.from({length:12},(_,i)=>{const a=(i+1)*Math.PI/6-Math.PI/2;return <text key={i} x={80+Math.cos(a)*37} y={86+Math.sin(a)*37} textAnchor="middle" fontSize="10" fontWeight="900" fill="#174a87">{i+1}</text>})}<path d="M80 82V48 M80 82L104 91" stroke="#174a87" strokeWidth="5" strokeLinecap="round"/><circle cx="80" cy="82" r="5" fill="#ffbd39"/></>;
    if (id === 'door') return <><rect x="44" y="23" width="72" height="119" rx="8" fill={`url(#${grad})`} stroke="#7e4b2e" strokeWidth="4"/><rect x="56" y="37" width="48" height="91" rx="4" fill="#18447c" opacity=".35"/><circle cx="101" cy="85" r="5" fill="#ffe27a"/></>;
    if (id === 'window') return <><rect x="24" y="30" width="112" height="100" rx="10" fill="#9de7ff" stroke="#d8a45a" strokeWidth="10"/><path d="M80 31V129 M25 80H135" stroke="#fff" strokeWidth="8"/><path d="M31 39L72 39L31 72Z M89 88H128L128 120Z" fill="#fff" opacity=".4"/></>;
    if (id === 'lamp') return <><path d="M80 28L49 86H111Z" fill={`url(#${grad})`} stroke="#b67a2e" strokeWidth="3"/><path d="M80 86V126 M57 129H103" stroke="#e9c76c" strokeWidth="8" strokeLinecap="round"/><circle cx="80" cy="91" r="19" fill="#ffe78b" opacity=".45"/></>;
    return <><rect x="38" y="54" width="84" height="73" rx="16" fill={`url(#${grad})`} stroke="#29588d" strokeWidth="3"/><path d="M48 54Q48 24 80 24Q112 24 112 54" fill="none" stroke="#a8efff" strokeWidth="8"/><rect x="51" y="70" width="58" height="42" rx="9" fill="#fff" opacity=".2"/><circle cx="80" cy="91" r="8" fill="#ffda7a" opacity=".8"/></>;
  }
  return <><rect x="30" y="31" width="100" height="99" rx="24" fill={`url(#${grad})`} stroke="#a4eaff" strokeWidth="3"/><path d="M49 54h62 M49 71h62 M49 88h43" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".72"/><circle cx="106" cy="108" r="8" fill="#ffe47c"/></>;
}

export function VocabularyArt({ item, topicId, className = '', compact = false }) {
  if (item?.kind === 'clock' || item?.id?.startsWith('hour-')) return <ClockIllustration item={item} compact={compact}/>;
  if (item?.id?.startsWith('day-')) return <div className={`visual-art ${className}`}><CalendarArt item={item}/></div>;
  if (['morning','noon','afternoon','night'].includes(item?.id)) return <div className={`visual-art ${className}`}><PeriodArt item={item}/></div>;
  if (item?.numeric || item?.id?.startsWith('number-')) return <div className={`visual-art ${className}`}><NumberArt item={item}/></div>;
  const category = shapeCategory[topicId] || 'school';
  const id = useId().replace(/:/g, '');
  const palette = category === 'fruit' ? fruitPalette[item?.id] : category === 'animal' ? animalPalette[item?.id] : generalPalette;
  const colors = palette || generalPalette;
  return <div className={`visual-art ${className}`} role="img" aria-label={item?.label || 'Ilustrasi kosakata'}>
    <svg viewBox="0 0 160 160" className="illustration-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-object`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={colors[0]}/><stop offset=".55" stopColor={colors[0]}/><stop offset="1" stopColor={colors[1]}/></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#59eaff" stopOpacity=".4"/><stop offset="1" stopColor="#4d54d8" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="80" cy="80" r="75" fill={`url(#${id}-halo)`}/>
      <ellipse cx="80" cy="143" rx="43" ry="7" fill="#020a26" opacity=".38"/>
      <g className="illustration-object"><ObjectShape item={item} category={category} grad={`${id}-object`}/></g>
      <path d="M42 39Q56 21 77 24" stroke="#fff" strokeWidth="5" opacity=".23" fill="none" strokeLinecap="round"/>
      <circle cx="126" cy="43" r="4" fill="#fff" opacity=".75"/><circle cx="34" cy="105" r="3" fill="#a6f4ff" opacity=".9"/>
    </svg>
  </div>;
}

export function TopicArt({ topicId, className = '' }) {
  const sample = topicSamples[topicId] || topicSamples.fruits;
  const topicForArt = topicId === 'time-days' ? 'time-days' : topicId;
  return <VocabularyArt item={{ ...sample, ...(topicId === 'numbers' ? { numeric: 25 } : {}) }} topicId={topicForArt} className={className}/>;
}

export function GameArt({ gameId, className = '' }) {
  const id = useId().replace(/:/g, '');
  return <div className={`game-art game-art-${gameId} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 180 150" className="game-art-svg">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8cf4ff"/><stop offset=".5" stopColor="#398fff"/><stop offset="1" stopColor="#7544d9"/></linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff17b"/><stop offset="1" stopColor="#ff8e39"/></linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff9ed1"/><stop offset="1" stopColor="#8d56e8"/></linearGradient>
      </defs>
      {gameId === 'memory' && <><rect x="25" y="25" width="54" height="75" rx="11" fill={`url(#${id}-a)`} stroke="#c4faff" strokeWidth="3" transform="rotate(-12 52 62)"/><rect x="93" y="21" width="54" height="75" rx="11" fill={`url(#${id}-b)`} stroke="#fff2b1" strokeWidth="3" transform="rotate(12 120 58)"/><path d="M52 48l7 10 12 2-9 9 2 12-12-6-11 6 2-12-9-9 12-2Z" fill="#fff" opacity=".9"/><text x="120" y="73" textAnchor="middle" fontSize="28" fontWeight="900" fill="#fff">؟</text><path d="M80 106l9 12 15 2-11 10 3 14-16-8-14 8 3-14-11-10 15-2Z" fill="#ffe46a"/></>}
      {gameId === 'wordsearch' && <><rect x="23" y="22" width="111" height="103" rx="13" fill={`url(#${id}-a)`} stroke="#9ff4ff" strokeWidth="3"/>{Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=><rect key={`${r}-${c}`} x={34+c*23} y={34+r*20} width="18" height="16" rx="4" fill={(r===1&&c===2)||(r===2&&c===2)||(r===3&&c===2)?'#ffe36b':'#f5fcff'} opacity=".95"/>))}<circle cx="135" cy="108" r="26" fill="none" stroke={`url(#${id}-b)`} strokeWidth="10"/><path d="M153 127l18 17" stroke="#ffca56" strokeWidth="12" strokeLinecap="round"/></>}
      {gameId === 'arrange' && <><g transform="rotate(-10 50 60)"><rect x="20" y="34" width="48" height="53" rx="10" fill={`url(#${id}-c)`} stroke="#f5d5ff" strokeWidth="2"/><text x="44" y="70" textAnchor="middle" fontSize="31" fontWeight="900" fill="#fff">ب</text></g><g transform="rotate(9 96 51)"><rect x="76" y="24" width="48" height="53" rx="10" fill={`url(#${id}-b)`} stroke="#fff3b3" strokeWidth="2"/><text x="100" y="60" textAnchor="middle" fontSize="31" fontWeight="900" fill="#fff">ت</text></g><g transform="rotate(-5 125 104)"><rect x="101" y="80" width="48" height="53" rx="10" fill={`url(#${id}-a)`} stroke="#c5faff" strokeWidth="2"/><text x="125" y="116" textAnchor="middle" fontSize="31" fontWeight="900" fill="#fff">م</text></g><path d="M35 115Q72 137 101 111" fill="none" stroke="#6ff3d3" strokeWidth="6" strokeLinecap="round"/></>}
      {gameId === 'catch' && <><path d="M35 66Q90 46 145 66L133 127Q90 146 47 127Z" fill={`url(#${id}-b)`} stroke="#ffeaa2" strokeWidth="3"/><path d="M34 65Q90 40 146 65" fill="none" stroke="#fff0ae" strokeWidth="10" strokeLinecap="round"/><path d="M52 66Q52 18 90 18Q128 18 128 66" fill="none" stroke={`url(#${id}-a)`} strokeWidth="8"/><circle cx="70" cy="88" r="14" fill="#ff5e7d" stroke="#fff" strokeWidth="2"/><path d="M108 76Q125 92 108 111Q91 92 108 76Z" fill="#57d991" stroke="#eafff2" strokeWidth="2"/><circle cx="105" cy="91" r="4" fill="#e7ffd4"/></>}
    </svg>
  </div>;
}

export function LevelArt({ level, className = '' }) {
  const id = useId().replace(/:/g, '');
  return <div className={`level-art level-art-${level} ${className}`} aria-hidden="true"><svg viewBox="0 0 150 140" className="level-art-svg">
    <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={level==='easy'?'#9affd2':level==='medium'?'#75e9ff':'#e2a2ff'}/><stop offset="1" stopColor={level==='easy'?'#26b981':level==='medium'?'#2879dc':'#7745c4'}/></linearGradient></defs>
    {level === 'easy' && <><path d="M75 112Q43 94 49 61Q75 29 101 61Q107 94 75 112Z" fill={`url(#${id}-g)`} stroke="#baffdc" strokeWidth="3"/><path d="M75 105Q75 56 43 48Q46 79 75 105Q76 62 109 43Q106 81 75 105Z" fill="#65e99f" stroke="#d5ffdf" strokeWidth="2"/></>}
    {level === 'medium' && <><path d="M75 18L112 107L75 92L38 107Z" fill={`url(#${id}-g)`} stroke="#b5f5ff" strokeWidth="3"/><path d="M75 18L75 92L38 107Z" fill="#f6fbff" opacity=".5"/><path d="M55 99L34 128L69 112 M95 99L116 128L81 112" fill="#ffb35d" stroke="#ffe7a4" strokeWidth="3"/></>}
    {level === 'hard' && <><path d="M75 17L89 49L124 54L98 78L105 113L75 96L45 113L52 78L26 54L61 49Z" fill={`url(#${id}-g)`} stroke="#ffe8a6" strokeWidth="3"/><path d="M59 119h32 M65 127h20" stroke="#ffe9a4" strokeWidth="5" strokeLinecap="round"/></>}
  </svg></div>;
}
