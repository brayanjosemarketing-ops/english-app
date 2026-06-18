import type { NeuralTipsMap, Achievement } from '@/types'

export const NEURAL_TIPS: NeuralTipsMap = {
  A1: [
    '🧠 El hipocampo consolida vocabulario emocional primero. Asocia cada palabra con una imagen vívida.',
    '💤 Repasa estas palabras 30 min antes de dormir — consolidas la memoria durante el sueño REM.',
    '🎵 Di las palabras en voz alta. Tu cerebelo aprende por repetición motora oral.',
    '👁️ Dual coding: imagen + palabra. El córtex visual y el área de Broca se activan juntos.',
    '🔄 SRS óptimo: repasa en 1 día, 3 días, 7 días, 14 días y 30 días.',
  ],
  A2: [
    '🧠 El hipocampo derecho procesa narrativas. Cuenta historias REALES tuyas en Past Simple.',
    '⏰ Repaso SRS óptimo: mañana, en 3 días, en 1 semana. El espaciado es la clave.',
    '🗣️ Di cada oración 3 veces en voz alta — el área de Broca necesita práctica motora repetida.',
    '🎭 Imagina el escenario completo con detalles sensoriales — episodic future thinking activa más redes.',
    '💪 Los ganglios basales automatizan patrones con repetición — la práctica distribuida es superior a la masiva.',
  ],
  B1: [
    '🧠 El Present Perfect activa redes prefrontales nuevas — conecta cada uso con experiencia emocional tuya.',
    '✍️ Escribe 3 oraciones propias con cada estructura — el output fuerza la consolidación neuronal.',
    '🎯 Noticing (Schmidt 1990): identifica el patrón conscientemente ANTES de practicarlo.',
    '🔀 Los condicionales activan el cortex prefrontal de simulación — el mismo que usas para planear el futuro.',
    '📚 El output (producción) es tan importante como el input (Swain 1985). Habla, no solo escuches.',
  ],
  B2: [
    '🧠 Phrasal verbs se memorizan mejor como chunks léxicos completos — no palabra por palabra.',
    '🔄 Error recurrente = práctica espaciada en al menos 3 contextos diferentes. El hipocampo necesita variación.',
    '💼 Piensa en inglés durante el día — activa tu voz interna en L2. Negocia mentalmente.',
    '🎭 El Past Perfect activa "doble embebimiento temporal" — una capacidad cognitiva de alto orden.',
    '🤝 El Condicional 3 activa circuitos de arrepentimiento — emoción + gramática = retención máxima.',
  ],
  C1: [
    '🧠 A este nivel, Broca y Wernicke trabajan simultáneamente — marca del hablante avanzado.',
    '📑 Escribe un Executive Summary de tu día en inglés — 3 oraciones, BLUF primero.',
    '🌏 Code-switching consciente: adapta tu tono según el contexto cultural (alto/bajo contexto).',
    '💡 La nominalización activa el córtex prefrontal lateral — registro ejecutivo automatizado.',
    '🎓 Ya no traduces: tu cerebro procesa en L2 directamente. Eso es adquisición genuina.',
  ],
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_lesson', emoji: '🎯', title: 'Primera Lección', desc: 'Completaste tu primera lección' },
  { id: 'first_perfect', emoji: '⭐', title: 'Perfección', desc: 'Completaste una lección sin errores' },
  { id: 'streak_3', emoji: '🔥', title: 'Constante', desc: '3 días seguidos estudiando' },
  { id: 'streak_7', emoji: '💥', title: 'Semana de Fuego', desc: '7 días consecutivos' },
  { id: 'streak_30', emoji: '🌋', title: 'Imparable', desc: '30 días sin parar' },
  { id: 'level_a2', emoji: '🗺️', title: 'Aventurero', desc: 'Desbloqueaste nivel A2' },
  { id: 'level_b1', emoji: '🏗️', title: 'Constructor', desc: 'Desbloqueaste nivel B1' },
  { id: 'level_b2', emoji: '🤝', title: 'Negociador', desc: 'Desbloqueaste nivel B2' },
  { id: 'level_c1', emoji: '💼', title: 'Ejecutivo', desc: 'Desbloqueaste nivel C1' },
  { id: 'ten_lessons', emoji: '🌟', title: 'Dedicación', desc: '10 lecciones completadas' },
  { id: 'grammar_king', emoji: '👑', title: 'Grammar King', desc: '90%+ accuracy en 5 quizzes' },
  { id: 'all_a1', emoji: '🏅', title: 'A1 Completo', desc: 'Terminaste todas las lecciones A1' },
  { id: 'all_a2', emoji: '🏅', title: 'A2 Completo', desc: 'Terminaste todas las lecciones A2' },
  { id: 'all_b1', emoji: '🏅', title: 'B1 Completo', desc: 'Terminaste todas las lecciones B1' },
  { id: 'all_b2', emoji: '🏅', title: 'B2 Completo', desc: 'Terminaste todas las lecciones B2' },
  { id: 'champion', emoji: '🎖️', title: 'Campeón C1', desc: 'Terminaste todas las lecciones C1' },
  { id: 'neural_master', emoji: '🧠', title: 'Neural Master', desc: 'Racha de 30 días + nivel B2' },
]
