export function getVoiceAleatoria(lang = 'es-CL') {
  const voces = window.speechSynthesis.getVoices();
  
  // filtra por idioma si querés mantener coherencia (ej: solo español)
  const vocesFiltradas = voces.filter(v => v.lang.startsWith('es'));
  const pool = vocesFiltradas.length > 0 ? vocesFiltradas : voces;
  
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function narrar(text:string) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voz = getVoiceAleatoria();
  
  if (voz) {
    utterance.voice = voz;
    utterance.lang = voz.lang;
  } else {
    utterance.lang = 'es-CL'; // fallback si aún no cargaron las voces
  }
  
  window.speechSynthesis.speak(utterance);
}