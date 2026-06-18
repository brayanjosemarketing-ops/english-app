import type { Level } from '@/types'

export const LEVELS: Level[] = [
  {
    id: 'A1', name: 'Explorador', emoji: '🌱', color: '#16a34a', xpReq: 0,
    tag: 'Tu primer paso al inglés',
    lessons: [
      { id: 'a1-01', title: 'Saludos y presentaciones', icon: '👋', grammar: 'Verb TO BE', tenseNumber: undefined },
      { id: 'a1-02', title: 'Mi vida diaria', icon: '🌅', grammar: 'Present Simple', tenseNumber: 1 },
      { id: 'a1-03', title: 'El mundo que me rodea', icon: '📍', grammar: 'There is/are + Prepositions' },
      { id: 'a1-04', title: 'Mi familia y yo', icon: '👨‍👩‍👧', grammar: 'Possessives' },
      { id: 'a1-05', title: 'Comida y restaurante', icon: '🍽️', grammar: 'Would like + Food vocab' },
      { id: 'a1-06', title: 'Mi cuerpo y mi salud', icon: '🏥', grammar: 'Have got + Body parts' },
      { id: 'a1-07', title: 'Ropa y compras', icon: '🛍️', grammar: 'How much + Shopping vocab' },
      { id: 'a1-08', title: '¿Qué estás haciendo?', icon: '🎬', grammar: 'Present Continuous', tenseNumber: 2 },
    ],
  },
  {
    id: 'A2', name: 'Aventurero', emoji: '🗺️', color: '#2563eb', xpReq: 200,
    tag: 'Cuenta tu historia',
    lessons: [
      { id: 'a2-01', title: 'Mi historia personal', icon: '📅', grammar: 'Past Simple', tenseNumber: 3 },
      { id: 'a2-02', title: 'Planes y predicciones', icon: '🚀', grammar: 'Will vs Going to', tenseNumber: 5 },
      { id: 'a2-03', title: 'Comparando el mundo', icon: '⚖️', grammar: 'Comparatives & Superlatives' },
      { id: 'a2-04', title: 'Mientras tanto...', icon: '⏮️', grammar: 'Past Continuous', tenseNumber: 4 },
      { id: 'a2-05', title: 'Viajes y turismo', icon: '✈️', grammar: 'Travel vocabulary' },
      { id: 'a2-06', title: 'Salud y bienestar', icon: '💪', grammar: 'Sports verbs (play/go/do)' },
      { id: 'a2-07', title: 'En la oficina', icon: '💼', grammar: 'Work vocabulary' },
    ],
  },
  {
    id: 'B1', name: 'Constructor', emoji: '🏗️', color: '#7c3aed', xpReq: 500,
    tag: 'Construye ideas complejas',
    lessons: [
      { id: 'b1-01', title: 'Tu historial de vida', icon: '🌍', grammar: 'Present Perfect', tenseNumber: 7 },
      { id: 'b1-02', title: 'Desde hace tiempo...', icon: '🕰️', grammar: 'Present Perfect Continuous', tenseNumber: 8 },
      { id: 'b1-03', title: 'Si esto pasa...', icon: '💭', grammar: 'Conditionals Type 1 & 2' },
      { id: 'b1-04', title: 'Medio ambiente', icon: '🌿', grammar: 'Present Perfect + Conditionals in context' },
      { id: 'b1-05', title: 'Hábitos del pasado', icon: '🔁', grammar: 'Used to / Would' },
      { id: 'b1-06', title: 'Email profesional', icon: '📧', grammar: 'Formal register + Modals' },
      { id: 'b1-07', title: 'Entretenimiento', icon: '🎬', grammar: 'PP + opinions' },
      { id: 'b1-08', title: 'Carrera profesional', icon: '🎯', grammar: 'PP + Conditionals: work context' },
    ],
  },
  {
    id: 'B2', name: 'Negociador', emoji: '🤝', color: '#b45309', xpReq: 1000,
    tag: 'Negocia y persuade',
    lessons: [
      { id: 'b2-01', title: 'Discurso reportado', icon: '💬', grammar: 'Reported Speech' },
      { id: 'b2-02', title: 'Verbos frasales', icon: '⚡', grammar: 'Phrasal Verbs (40 esenciales)' },
      { id: 'b2-03', title: 'Voz pasiva', icon: '🔄', grammar: 'Passive Voice — all tenses' },
      { id: 'b2-04', title: 'Antes de que ocurriera', icon: '⏪', grammar: 'Past Perfect', tenseNumber: 9 },
      { id: 'b2-05', title: 'La duración del pasado', icon: '⌛', grammar: 'Past Perfect Continuous', tenseNumber: 10 },
      { id: 'b2-06', title: 'Si hubiera...', icon: '😔', grammar: 'Conditional Type 3 + Mixed' },
      { id: 'b2-07', title: 'Finanzas y negocios', icon: '💹', grammar: 'B2 tenses in business context' },
      { id: 'b2-08', title: 'Tecnología e innovación', icon: '💻', grammar: 'B2 tenses + tech vocabulary' },
    ],
  },
  {
    id: 'C1', name: 'Ejecutivo', emoji: '💼', color: '#dc2626', xpReq: 1800,
    tag: 'Domina el inglés de alto nivel',
    lessons: [
      { id: 'c1-01', title: 'Resúmenes ejecutivos', icon: '📑', grammar: 'Nominalization + BLUF' },
      { id: 'c1-02', title: 'Gramática ejecutiva', icon: '🔬', grammar: 'Subjunctive + Inversion + Discourse' },
      { id: 'c1-03', title: 'Los últimos tiempos', icon: '🎓', grammar: 'Future Continuous + Future Perfect', tenseNumber: 11 },
      { id: 'c1-04', title: 'Negociación internacional', icon: '🌐', grammar: 'BATNA/ZOPA + Advanced C1' },
      { id: 'c1-05', title: 'Comunicación cross-cultural', icon: '🌏', grammar: 'High/Low context + Hofstede' },
      { id: 'c1-06', title: 'Pitching de alto impacto', icon: '🎤', grammar: 'Rhetorical devices + Pitch structure' },
    ],
  },
]

export const XP_GATES: Record<string, number> = {
  A1: 0, A2: 200, B1: 500, B2: 1000, C1: 1800,
}
