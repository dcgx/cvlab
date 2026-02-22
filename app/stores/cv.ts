/**
 * Store del builder de CV: formulario, secciones y progreso.
 * Datos mock en cliente; sin persistencia en API.
 */
export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface SkillItem {
  id: string
  name: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  period: string
}

// Mocks iniciales
const MOCK_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Gerente de Proyectos',
    company: 'Empresa Ejemplo S.A.',
    period: '2020 - Actualidad',
    description: 'Liderazgo de equipos multidisciplinarios. Logros: reducción de tiempos de entrega en 20%.',
  },
]

const MOCK_SKILLS: SkillItem[] = [
  { id: 'sk-1', name: 'Gestión de proyectos' },
  { id: 'sk-2', name: 'Scrum' },
]

const MOCK_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Universidad Nacional',
    degree: 'Ingeniería',
    period: '2015 - 2019',
  },
]

function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`
}

export const useCvStore = defineStore('cv', () => {
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const position = ref('')
  const showExtraFields = ref(false)
  const profileSummary = ref('')
  const photoFile = ref<File | null>(null)

  const experiences = ref<ExperienceItem[]>([...MOCK_EXPERIENCES])
  const skills = ref<SkillItem[]>([...MOCK_SKILLS])
  const educations = ref<EducationItem[]>([...MOCK_EDUCATION])

  const progressPercentage = computed(() => {
    let p = 0
    if (firstName.value.trim()) p += 5
    if (lastName.value.trim()) p += 5
    if (email.value.trim()) p += 5
    if (position.value.trim()) p += 5
    if (photoFile.value) p += 5
    if (profileSummary.value.trim()) p += 10
    if (experiences.value.length > 0) p += 15
    if (skills.value.length > 0) p += 10
    if (educations.value.length > 0) p += 15
    return Math.min(p, 100)
  })

  function setFirstName(v: string) {
    firstName.value = v
  }

  function setLastName(v: string) {
    lastName.value = v
  }

  function setEmail(v: string) {
    email.value = v
  }

  function setPosition(v: string) {
    position.value = v
  }

  function setProfileSummary(v: string) {
    profileSummary.value = v
  }

  function setPhotoFile(file: File | null) {
    photoFile.value = file
  }

  function toggleExtraFields() {
    showExtraFields.value = !showExtraFields.value
  }

  function addExperience() {
    experiences.value.push({
      id: generateId('exp'),
      title: 'Nuevo puesto',
      company: 'Empresa',
      period: 'Año - Año',
      description: 'Descripción y logros.',
    })
  }

  function updateExperience(id: string, payload: Partial<ExperienceItem>) {
    const idx = experiences.value.findIndex((e) => e.id === id)
    if (idx === -1) return
    experiences.value[idx] = { ...experiences.value[idx], ...payload }
  }

  function removeExperience(id: string) {
    experiences.value = experiences.value.filter((e) => e.id !== id)
  }

  function addSkill() {
    skills.value.push({ id: generateId('sk'), name: 'Nueva habilidad' })
  }

  function addEducation() {
    educations.value.push({
      id: generateId('edu'),
      institution: 'Institución',
      degree: 'Título',
      period: 'Año - Año',
    })
  }

  return {
    firstName,
    lastName,
    email,
    position,
    showExtraFields,
    profileSummary,
    photoFile,
    experiences,
    skills,
    educations,
    progressPercentage,
    setFirstName,
    setLastName,
    setEmail,
    setPosition,
    setProfileSummary,
    setPhotoFile,
    toggleExtraFields,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    addEducation,
  }
})
