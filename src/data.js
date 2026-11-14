const item = (id, label, arabic, _legacyVisual, extra = {}) => ({ id, label, arabic, ...extra });

const fruits = [
  item('apple', 'Apel', 'تُفَّاحٌ', null),
  item('banana', 'Pisang', 'مَوْزٌ', null),
  item('orange', 'Jeruk', 'بُرْتُقَالٌ', null),
  item('grapes', 'Anggur', 'عِنَبٌ', null),
  item('watermelon', 'Semangka', 'بِطِّيخٌ', null),
  item('strawberry', 'Stroberi', 'فَرَاوِلَةٌ', null),
  item('pineapple', 'Nanas', 'أَنَانَاسٌ', null),
  item('mango', 'Mangga', 'مَانْجُو', null),
  item('melon', 'Melon', 'شَمَّامٌ', null),
  item('lemon', 'Lemon', 'لَيْمُونٌ', null),
  item('dates', 'Kurma', 'تَمْرٌ', null),
  item('pear', 'Pir', 'كُمَّثْرَى', null),
  item('papaya', 'Pepaya', 'بَابَايَا', null),
  item('rambutan', 'Rambutan', 'رَامْبُوتَانٌ', null),
  item('guava', 'Jambu biji', 'جَوَافَةٌ', null),
  item('starfruit', 'Belimbing', 'كَرَامْبُولَا', null),
  item('salak', 'Salak', 'سَالَاكٌ', null),
  item('coconut', 'Kelapa', 'جَوْزُ الْهِنْدِ', null),
  item('pomegranate', 'Delima', 'رُمَّانٌ', null),
  item('blueberry', 'Blueberry', 'تُوتٌ أَزْرَقُ', null),
];

const animals = [
  item('cat', 'Kucing', 'قِطَّةٌ', null),
  item('chicken', 'Ayam', 'دَجَاجَةٌ', null),
  item('cow', 'Sapi', 'بَقَرَةٌ', null),
  item('goat', 'Kambing', 'مَاعِزٌ', null),
  item('rabbit', 'Kelinci', 'أَرْنَبٌ', null),
  item('elephant', 'Gajah', 'فِيلٌ', null),
  item('lion', 'Singa', 'أَسَدٌ', null),
  item('horse', 'Kuda', 'حِصَانٌ', null),
  item('bird', 'Burung', 'طَائِرٌ', null),
  item('tiger', 'Harimau', 'نَمِرٌ', null),
  item('giraffe', 'Jerapah', 'زَرَافَةٌ', null),
  item('zebra', 'Zebra', 'حِمَارٌ وَحْشِيٌّ', null),
  item('crocodile', 'Buaya', 'تِمْسَاحٌ', null),
  item('snake', 'Ular', 'ثُعْبَانٌ', null),
  item('monkey', 'Monyet', 'قِرْدٌ', null),
  item('bear', 'Beruang', 'دُبٌّ', null),
  item('turtle', 'Kura-kura', 'سُلَحْفَاةٌ', null),
  item('ant', 'Semut', 'نَمْلَةٌ', null),
  item('butterfly', 'Kupu-kupu', 'فَرَاشَةٌ', null),
  item('bee', 'Lebah', 'نَحْلَةٌ', null),
];

const familyHome = [
  item('father', 'Ayah', 'أَبٌ', null),
  item('mother', 'Ibu', 'أُمٌّ', null),
  item('brother', 'Saudara laki-laki', 'أَخٌ', null),
  item('sister', 'Saudara perempuan', 'أُخْتٌ', null),
  item('house', 'Rumah', 'بَيْتٌ', null),
  item('grandfather', 'Kakek', 'جَدٌّ', null),
  item('grandmother', 'Nenek', 'جَدَّةٌ', null),
  item('door', 'Pintu', 'بَابٌ', null),
  item('window', 'Jendela', 'نَافِذَةٌ', null),
  item('room', 'Kamar', 'غُرْفَةٌ', null),
  item('table', 'Meja', 'طَاوِلَةٌ', null),
  item('chair', 'Kursi', 'كُرْسِيٌّ', null),
  item('bed', 'Tempat tidur', 'سَرِيرٌ', null),
  item('cupboard', 'Lemari', 'خِزَانَةٌ', null),
  item('lamp', 'Lampu', 'مِصْبَاحٌ', null),
  item('pillow', 'Bantal', 'وِسَادَةٌ', null),
  item('blanket', 'Selimut', 'بَطَّانِيَّةٌ', null),
  item('sofa', 'Sofa', 'أَرِيكَةٌ', null),
  item('mirror', 'Cermin', 'مِرْآةٌ', null),
  item('wallclock', 'Jam dinding', 'سَاعَةُ الْحَائِطِ', null),
];

const school = [
  item('school', 'Sekolah', 'مَدْرَسَةٌ', null),
  item('teacher', 'Guru', 'مُعَلِّمٌ', null),
  item('book', 'Buku', 'كِتَابٌ', null),
  item('pencil', 'Pensil', 'قَلَمُ رَصَاصٍ', null),
  item('bag', 'Tas', 'حَقِيبَةٌ', null),
  item('classroom', 'Kelas', 'فَصْلٌ', null),
  item('blackboard', 'Papan tulis', 'سَبُّورَةٌ', null),
  item('eraser', 'Penghapus', 'مِمْحَاةٌ', null),
  item('ruler', 'Penggaris', 'مِسْطَرَةٌ', null),
  item('notebook', 'Buku tulis', 'دَفْتَرٌ', null),
  item('pencilcase', 'Tempat pensil', 'مِقْلَمَةٌ', null),
  item('sharpener', 'Rautan', 'مِبْرَاةٌ', null),
  item('paper', 'Kertas', 'وَرَقَةٌ', null),
  item('scissors', 'Gunting', 'مِقَصٌّ', null),
  item('computer', 'Komputer', 'حَاسُوبٌ', null),
  item('map', 'Peta', 'خَرِيطَةٌ', null),
  item('student', 'Murid', 'طَالِبٌ', null),
  item('uniform', 'Seragam sekolah', 'زِيٌّ مَدْرَسِيٌّ', null),
  item('marker', 'Spidol', 'قَلَمُ تَخْطِيطٍ', null),
  item('bell', 'Bel sekolah', 'جَرَسٌ مَدْرَسِيٌّ', null),
];

const food = [
  item('rice', 'Nasi', 'أَرُزٌّ', null),
  item('bread', 'Roti', 'خُبْزٌ', null),
  item('water', 'Air', 'مَاءٌ', null),
  item('milk', 'Susu', 'حَلِيبٌ', null),
  item('egg', 'Telur', 'بَيْضَةٌ', null),
  item('cheese', 'Keju', 'جُبْنٌ', null),
  item('meat', 'Daging', 'لَحْمٌ', null),
  item('juice', 'Jus', 'عَصِيرٌ', null),
  item('tea', 'Teh', 'شَايٌ', null),
  item('soup', 'Sup', 'حَسَاءٌ', null),
  item('salt', 'Garam', 'مِلْحٌ', null),
  item('sugar', 'Gula', 'سُكَّرٌ', null),
  item('oil', 'Minyak', 'زَيْتٌ', null),
  item('butter', 'Mentega', 'زُبْدَةٌ', null),
  item('honey', 'Madu', 'عَسَلٌ', null),
  item('coffee', 'Kopi', 'قَهْوَةٌ', null),
  item('salad', 'Salad', 'سَلَطَةٌ', null),
  item('pasta', 'Pasta', 'مَعْكَرُونَةٌ', null),
  item('pie', 'Pai', 'فَطِيرَةٌ', null),
  item('candy', 'Permen', 'حَلْوَى', null),
];

const professions = [
  item('doctor', 'Dokter', 'طَبِيبٌ', null),
  item('nurse', 'Perawat', 'مُمَرِّضَةٌ', null),
  item('police', 'Polisi', 'شُرْطِيٌّ', null),
  item('farmer', 'Petani', 'فَلَّاحٌ', null),
  item('cook', 'Koki', 'طَبَّاخٌ', null),
  item('driver', 'Sopir', 'سَائِقٌ', null),
  item('merchant', 'Pedagang', 'تَاجِرٌ', null),
  item('tailor', 'Penjahit', 'خَيَّاطٌ', null),
  item('barber', 'Tukang cukur', 'حَلَّاقٌ', null),
  item('pilot', 'Pilot', 'طَيَّارٌ', null),
  item('firefighter', 'Pemadam kebakaran', 'رَجُلُ إِطْفَاءٍ', null),
  item('engineer', 'Insinyur', 'مُهَنْدِسٌ', null),
  item('architect', 'Arsitek', 'مُهَنْدِسٌ مِعْمَارِيٌّ', null),
  item('carpenter', 'Tukang kayu', 'نَجَّارٌ', null),
  item('mechanic', 'Montir', 'مِيكَانِيكِيٌّ', null),
  item('journalist', 'Wartawan', 'صَحَفِيٌّ', null),
  item('photographer', 'Fotografer', 'مُصَوِّرٌ', null),
  item('pharmacist', 'Apoteker', 'صَيْدَلِيٌّ', null),
  item('lawyer', 'Pengacara', 'مُحَامٍ', null),
  item('dentist', 'Dokter gigi', 'طَبِيبُ أَسْنَانٍ', null),
];

const places = [
  item('mosque', 'Masjid', 'مَسْجِدٌ', null),
  item('market', 'Pasar', 'سُوقٌ', null),
  item('hospital', 'Rumah sakit', 'مُسْتَشْفًى', null),
  item('park', 'Taman', 'حَدِيقَةٌ', null),
  item('library', 'Perpustakaan', 'مَكْتَبَةٌ', null),
  item('airport', 'Bandara', 'مَطَارٌ', null),
  item('station', 'Stasiun', 'مَحَطَّةٌ', null),
  item('restaurant', 'Restoran', 'مَطْعَمٌ', null),
  item('hotel', 'Hotel', 'فُنْدُقٌ', null),
  item('museum', 'Museum', 'مَتْحَفٌ', null),
  item('bus-terminal', 'Terminal bus', 'مَحَطَّةُ الْحَافِلَاتِ', null),
  item('post-office', 'Kantor pos', 'مَكْتَبُ الْبَرِيدِ', null),
  item('police-station', 'Kantor polisi', 'مَرْكَزُ الشُّرْطَةِ', null),
  item('bank', 'Bank', 'بَنْكٌ', null),
  item('zoo', 'Kebun binatang', 'حَدِيقَةُ الْحَيَوَانَاتِ', null),
  item('pool', 'Kolam renang', 'مَسْبَحٌ', null),
  item('stadium', 'Stadion', 'مَلْعَبٌ', null),
  item('pharmacy', 'Apotek', 'صَيْدَلِيَّةٌ', null),
  item('mall', 'Pusat perbelanjaan', 'مَرْكَزٌ تِجَارِيٌّ', null),
  item('cinema', 'Bioskop', 'سِينَمَا', null),
];

const ones = [
  'وَاحِدٌ','اِثْنَانِ','ثَلَاثَةٌ','أَرْبَعَةٌ','خَمْسَةٌ','سِتَّةٌ','سَبْعَةٌ','ثَمَانِيَةٌ','تِسْعَةٌ'
];
const teens = [
  'أَحَدَ عَشَرَ','اِثْنَا عَشَرَ','ثَلَاثَةَ عَشَرَ','أَرْبَعَةَ عَشَرَ','خَمْسَةَ عَشَرَ',
  'سِتَّةَ عَشَرَ','سَبْعَةَ عَشَرَ','ثَمَانِيَةَ عَشَرَ','تِسْعَةَ عَشَرَ'
];
const tens = {20:'عِشْرُونَ',30:'ثَلَاثُونَ',40:'أَرْبَعُونَ',50:'خَمْسُونَ'};
const numberArabic = (n) => {
  if (n <= 9) return ones[n - 1];
  if (n === 10) return 'عَشَرَةٌ';
  if (n <= 19) return teens[n - 11];
  const ten = Math.floor(n / 10) * 10;
  const unit = n % 10;
  if (!unit) return tens[ten];
  return `${ones[unit - 1]} وَ${tens[ten]}`;
};
const toArabicDigits = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
const numberOnesId = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
const numberTensId = { 20: 'Dua puluh', 30: 'Tiga puluh', 40: 'Empat puluh', 50: 'Lima puluh' };
const numberLabel = (n) => {
  if (n <= 19) {
    const teenNames = ['', '', '', '', '', '', '', '', '', '', 'Sepuluh', 'Sebelas', 'Dua belas', 'Tiga belas', 'Empat belas', 'Lima belas', 'Enam belas', 'Tujuh belas', 'Delapan belas', 'Sembilan belas'];
    return n <= 9 ? numberOnesId[n] : teenNames[n];
  }
  const ten = Math.floor(n / 10) * 10;
  const unit = n % 10;
  return unit ? `${numberTensId[ten]} ${numberOnesId[unit].toLowerCase()}` : numberTensId[ten];
};
const numberItems = Array.from({length:50}, (_,i) => {
  const n = i + 1;
  return item(`number-${n}`, numberLabel(n), numberArabic(n), toArabicDigits(n), { display: String(n), numeric: n });
});

const ordinalHours = {
  1:'الْوَاحِدَةُ',2:'الثَّانِيَةُ',3:'الثَّالِثَةُ',4:'الرَّابِعَةُ',5:'الْخَامِسَةُ',6:'السَّادِسَةُ',
  7:'السَّابِعَةُ',8:'الثَّامِنَةُ',9:'التَّاسِعَةُ',10:'الْعَاشِرَةُ',11:'الْحَادِيَةَ عَشْرَةَ',12:'الثَّانِيَةَ عَشْرَةَ'
};
const hourPhrase = (h) => {
  if (h === 0) return 'مُنْتَصَفُ اللَّيْلِ';
  if (h === 12) return 'السَّاعَةُ الثَّانِيَةَ عَشْرَةَ ظُهْرًا';
  const displayHour = h > 12 ? h - 12 : h;
  const ordinal = ordinalHours[displayHour];
  let suffix = 'صَبَاحًا';
  if (h >= 13 && h <= 14) suffix = 'بَعْدَ الظُّهْرِ';
  if (h >= 15 && h <= 17) suffix = 'عَصْرًا';
  if (h >= 18) suffix = 'مَسَاءً';
  if (h === 1) suffix = 'صَبَاحًا';
  if (h === 2) suffix = 'صَبَاحًا';
  return `السَّاعَةُ ${ordinal} ${suffix}`;
};
const hourItems = Array.from({length:24}, (_,h) => {
  const clock = `${String(h).padStart(2,'0')}.00`;
  const period = h === 0 ? 'tengah malam' : h < 12 ? 'pagi' : h < 15 ? 'siang' : h < 18 ? 'sore' : 'malam';
  const displayHour = h % 12 || 12;
  const label = h === 0 ? 'Pukul 00.00 (tengah malam)' : `Pukul ${clock} (${displayHour} ${period})`;
  return item(`hour-${h}`, label, hourPhrase(h), null, { display: clock, kind: 'clock' });
});
const dayItems = [
  item('day-sunday','Minggu','يَوْمُ الْأَحَدِ', null),
  item('day-monday','Senin','يَوْمُ الْإِثْنَيْنِ', null),
  item('day-tuesday','Selasa','يَوْمُ الثُّلَاثَاءِ', null),
  item('day-wednesday','Rabu','يَوْمُ الْأَرْبِعَاءِ', null),
  item('day-thursday','Kamis','يَوْمُ الْخَمِيسِ', null),
  item('day-friday','Jumat','يَوْمُ الْجُمُعَةِ', null),
  item('day-saturday','Sabtu','يَوْمُ السَّبْتِ', null),
];
const periodItems = [
  item('morning','Pagi','صَبَاحًا', null),
  item('noon','Siang','ظُهْرًا', null),
  item('afternoon','Sore','عَصْرًا', null),
  item('night','Malam','لَيْلًا', null),
];
const timeItems = [...hourItems, ...dayItems, ...periodItems];

export const topics = [
  { id:'fruits', title:'Buah-buahan', arabicTitle:'الْفَوَاكِهُ', icon:'fruits', color:'coral', mode:'cumulative', items:fruits },
  { id:'animals', title:'Hewan', arabicTitle:'الْحَيَوَانَاتُ', icon:'animals', color:'mint', mode:'cumulative', items:animals },
  { id:'family-home', title:'Keluarga & Rumah', arabicTitle:'الْأُسْرَةُ وَالْبَيْتُ', icon:'family-home', color:'peach', mode:'cumulative', items:familyHome },
  { id:'school', title:'Sekolah & Kelas', arabicTitle:'الْمَدْرَسَةُ وَالْفَصْلُ', icon:'school', color:'lavender', mode:'cumulative', items:school },
  { id:'food', title:'Makanan & Minuman', arabicTitle:'الطَّعَامُ وَالشَّرَابُ', icon:'food', color:'yellow', mode:'cumulative', items:food },
  { id:'time-days', title:'Waktu & Hari', arabicTitle:'الْوَقْتُ وَالْأَيَّامُ', icon:'time-days', color:'blue', mode:'segmented', items:timeItems, levels:{easy:hourItems.slice(1,6), medium:hourItems.slice(6,16), hard:[...hourItems.slice(16),hourItems[0],...dayItems,...periodItems]} },
  { id:'numbers', title:'Angka 1–50', arabicTitle:'الْأَرْقَامُ', icon:'numbers', color:'sky', mode:'random', items:numberItems },
  { id:'professions', title:'Profesi', arabicTitle:'الْمِهَنُ', icon:'professions', color:'orange', mode:'cumulative', items:professions },
  { id:'places', title:'Tempat Umum', arabicTitle:'الْأَمَاكِنُ الْعَامَّةُ', icon:'places', color:'purple', mode:'cumulative', items:places },
];

export const levelInfo = {
  easy: { label:'Mudah', count:5, icon:'⭐', description:'Mulai dari kosakata dasar' },
  medium: { label:'Sedang', count:10, icon:'⭐⭐', description:'Tambah tantangan dan ingatan' },
  hard: { label:'Sulit', count:20, icon:'⭐⭐⭐', description:'Tantangan lebih seru!' },
};

export const games = [
  { id:'memory', title:'Memory Game', description:'Buka kartu dan temukan pasangan gambar dengan kata Arab.', icon:'memory', accent:'pink' },
  { id:'wordsearch', title:'Word Search', description:'Temukan huruf Arab berdasarkan gambar dan kata Indonesia.', icon:'wordsearch', accent:'green' },
  { id:'arrange', title:'Arrange The Letter', description:'Susun huruf Arab acak menjadi kosakata yang benar.', icon:'arrange', accent:'purple' },
  { id:'catch', title:'Catch Character', description:'Tangkap semua gambar yang sesuai dengan petunjuk audio.', icon:'catch', accent:'orange' },
];

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
export const sample = (arr, count) => shuffle(arr).slice(0, Math.min(count, arr.length));

export function getGameWords(topic, level) {
  const count = levelInfo[level].count;
  if (topic.mode === 'random') return sample(topic.items, count);
  if (topic.mode === 'segmented') return shuffle(topic.levels[level]);
  return shuffle(topic.items.slice(0, count));
}

export function getLearnWords(topic, level) {
  if (topic.mode === 'random' || topic.mode === 'segmented') return topic.items;
  return topic.items.slice(0, levelInfo[level].count);
}

export function stripArabic(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[\sـ]/g, '')
    .normalize('NFC');
}
