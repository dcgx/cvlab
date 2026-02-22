/**
 * Store del CV Maestro: perfil, secciones, autosave y persistencia.
 */
export type SkillCategory = 'technical' | 'soft' | 'tools'

export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  startDate?: string
  endDate?: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface SkillItem {
  id: string
  name: string
  category: SkillCategory
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  year?: string
  period: string
}

export interface CertificationItem {
  id: string
  name: string
  issuer?: string
  year?: string
}

export interface LanguageItem {
  id: string
  name: string
  level: string
}

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function ensureExperienceShape(exp: Partial<ExperienceItem> & { id: string }): ExperienceItem {
  return {
    id: exp.id,
    title: exp.title ?? '',
    company: exp.company ?? '',
    period: exp.period ?? '',
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description ?? '',
    achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
    technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
  }
}

function ensureSkillShape(sk: Partial<SkillItem> & { id: string }): SkillItem {
  return {
    id: sk.id,
    name: sk.name ?? '',
    category: sk.category ?? 'technical',
  }
}

const MOCK_EXPERIENCES: ExperienceItem[] = [
  ensureExperienceShape({
    id: 'exp-1',
    title: 'Gerente de Proyectos',
    company: 'Empresa Ejemplo S.A.',
    period: '2020 - Actualidad',
    description: 'Liderazgo de equipos multidisciplinarios. Reducción de tiempos de entrega en 20%.',
    achievements: ['Reducción de tiempos de entrega en 20%'],
    technologies: [],
  }),
]

const MOCK_SKILLS: SkillItem[] = [
  { id: 'sk-1', name: 'Gestión de proyectos', category: 'soft' },
  { id: 'sk-2', name: 'Scrum', category: 'soft' },
]

const MOCK_EDUCATION: EducationItem[] = [
  { id: 'edu-1', institution: 'Universidad Nacional', degree: 'Ingeniería', period: '2015 - 2019' },
]

function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`
}

const LOCAL_STORAGE_KEY = 'cvlab-cv-draft'

export const useCvStore = defineStore('cv', () => {
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const position = ref('')
  const professionalTitle = ref('')
  const location = ref('')
  const linkedIn = ref('')
  const github = ref('')
  const portfolio = ref('')
  const showExtraFields = ref(false)
  const profileSummary = ref('')
  const photoFile = ref<File | null>(null)

  const experiences = ref<ExperienceItem[]>([...MOCK_EXPERIENCES])
  const skills = ref<SkillItem[]>([...MOCK_SKILLS])
  const educations = ref<EducationItem[]>([...MOCK_EDUCATION])
  const certifications = ref<CertificationItem[]>([])
  const languages = ref<LanguageItem[]>([])

  const isDirty = ref(false)
  const autosaveStatus = ref<AutosaveStatus>('idle')
  const cvId = ref<string | null>(null)
  const sectionsCompleted = ref<Record<string, boolean>>({})

  const progressPercentage = computed(() => {
    let p = 0
    if (firstName.value.trim()) p += 5
    if (lastName.value.trim()) p += 5
    if (email.value.trim()) p += 5
    if (position.value.trim() || professionalTitle.value.trim()) p += 5
    if (photoFile.value) p += 5
    if (profileSummary.value.trim()) p += 10
    if (experiences.value.length > 0) p += 15
    if (skills.value.length > 0) p += 10
    if (educations.value.length > 0) p += 15
    return Math.min(p, 100)
  })

  function markDirty() {
    isDirty.value = true
  }

  function setFirstName(v: string) {
    firstName.value = v
    markDirty()
  }

  function setLastName(v: string) {
    lastName.value = v
    markDirty()
  }

  function setEmail(v: string) {
    email.value = v
    markDirty()
  }

  function setPosition(v: string) {
    position.value = v
    markDirty()
  }

  function setProfessionalTitle(v: string) {
    professionalTitle.value = v
    markDirty()
  }

  function setLocation(v: string) {
    location.value = v
    markDirty()
  }

  function setLinkedIn(v: string) {
    linkedIn.value = v
    markDirty()
  }

  function setGithub(v: string) {
    github.value = v
    markDirty()
  }

  function setPortfolio(v: string) {
    portfolio.value = v
    markDirty()
  }

  function setProfileSummary(v: string) {
    profileSummary.value = v
    markDirty()
  }

  function setPhotoFile(file: File | null) {
    photoFile.value = file
    markDirty()
  }

  function toggleExtraFields() {
    showExtraFields.value = !showExtraFields.value
  }

  function addExperience() {
    experiences.value.push(ensureExperienceShape({
      id: generateId('exp'),
      title: 'Nuevo puesto',
      company: 'Empresa',
      period: 'Año - Año',
      description: '',
      achievements: [],
      technologies: [],
    }))
    markDirty()
  }

  function updateExperience(id: string, payload: Partial<ExperienceItem>) {
    const idx = experiences.value.findIndex((e) => e.id === id)
    if (idx === -1) return
    experiences.value[idx] = ensureExperienceShape({ ...experiences.value[idx], ...payload })
    markDirty()
  }

  function removeExperience(id: string) {
    experiences.value = experiences.value.filter((e) => e.id !== id)
    markDirty()
  }

  function addSkill(category: SkillCategory = 'technical') {
    skills.value.push({ id: generateId('sk'), name: 'Nueva habilidad', category })
    markDirty()
  }

  function updateSkill(id: string, payload: Partial<SkillItem>) {
    const idx = skills.value.findIndex((s) => s.id === id)
    if (idx === -1) return
    skills.value[idx] = ensureSkillShape({ ...skills.value[idx], ...payload })
    markDirty()
  }

  function removeSkill(id: string) {
    skills.value = skills.value.filter((s) => s.id !== id)
    markDirty()
  }

  function setSkillsForCategory(category: SkillCategory, names: string[]) {
    const others = skills.value.filter((s) => s.category !== category)
    const newSkills: SkillItem[] = names.map((name) => ({
      id: generateId('sk'),
      name,
      category,
    }))
    skills.value = [...others, ...newSkills]
    markDirty()
  }

  function addEducation() {
    educations.value.push({
      id: generateId('edu'),
      institution: 'Institución',
      degree: 'Título',
      period: 'Año - Año',
    })
    markDirty()
  }

  function updateEducation(id: string, payload: Partial<EducationItem>) {
    const idx = educations.value.findIndex((e) => e.id === id)
    if (idx === -1) return
    educations.value[idx] = { ...educations.value[idx], ...payload }
    markDirty()
  }

  function removeEducation(id: string) {
    educations.value = educations.value.filter((e) => e.id !== id)
    markDirty()
  }

  function addCertification() {
    certifications.value.push({
      id: generateId('cert'),
      name: '',
      issuer: '',
      year: '',
    })
    markDirty()
  }

  function updateCertification(id: string, payload: Partial<CertificationItem>) {
    const idx = certifications.value.findIndex((c) => c.id === id)
    if (idx === -1) return
    certifications.value[idx] = { ...certifications.value[idx], ...payload }
    markDirty()
  }

  function removeCertification(id: string) {
    certifications.value = certifications.value.filter((c) => c.id !== id)
    markDirty()
  }

  function addLanguage() {
    languages.value.push({
      id: generateId('lang'),
      name: '',
      level: '',
    })
    markDirty()
  }

  function updateLanguage(id: string, payload: Partial<LanguageItem>) {
    const idx = languages.value.findIndex((l) => l.id === id)
    if (idx === -1) return
    languages.value[idx] = { ...languages.value[idx], ...payload }
    markDirty()
  }

  function removeLanguage(id: string) {
    languages.value = languages.value.filter((l) => l.id !== id)
    markDirty()
  }

  function getPayload() {
    return {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      position: position.value,
      professionalTitle: professionalTitle.value,
      location: location.value,
      linkedIn: linkedIn.value,
      github: github.value,
      portfolio: portfolio.value,
      profileSummary: profileSummary.value,
      experiences: experiences.value,
      skills: skills.value,
      educations: educations.value,
      certifications: certifications.value,
      languages: languages.value,
    }
  }

  function hydrate(payload: ReturnType<typeof getPayload>) {
    firstName.value = payload.firstName ?? ''
    lastName.value = payload.lastName ?? ''
    email.value = payload.email ?? ''
    position.value = payload.position ?? ''
    professionalTitle.value = payload.professionalTitle ?? ''
    location.value = payload.location ?? ''
    linkedIn.value = payload.linkedIn ?? ''
    github.value = payload.github ?? ''
    portfolio.value = payload.portfolio ?? ''
    profileSummary.value = payload.profileSummary ?? ''
    experiences.value = (payload.experiences ?? []).map(ensureExperienceShape)
    skills.value = (payload.skills ?? []).map(ensureSkillShape)
    educations.value = payload.educations ?? []
    certifications.value = payload.certifications ?? []
    languages.value = payload.languages ?? []
    isDirty.value = false
  }

  async function autosave() {
    if (!isDirty.value) return
    autosaveStatus.value = 'saving'
    try {
      const body = getPayload()
      // Persistencia temporal en localStorage (sin backend)
      if (import.meta.client) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(body))
        cvId.value = cvId.value ?? 'local'
      }
      isDirty.value = false
      autosaveStatus.value = 'saved'
    } catch (_e) {
      autosaveStatus.value = 'error'
    }
  }

  function loadFromLocalStorage() {
    if (import.meta.client) {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (raw) {
        try {
          const data = JSON.parse(raw) as ReturnType<typeof getPayload>
          cvId.value = 'local'
          hydrate(data)
        } catch (_e) {
          // JSON inválido: ignorar
        }
      }
    }
  }

  async function loadCv(id: string) {
    // Si es el draft local, cargar desde localStorage
    if (id === 'local') {
      loadFromLocalStorage()
      return
    }
    try {
      const data = await $fetch<ReturnType<typeof getPayload> & { id?: string }>(`/api/cvs/${id}`)
      if (data?.id) cvId.value = data.id
      hydrate(data)
    } catch (_e) {
      // Sin backend: intentar cargar draft local
      loadFromLocalStorage()
    }
  }

  return {
    firstName,
    lastName,
    email,
    position,
    professionalTitle,
    location,
    linkedIn,
    github,
    portfolio,
    showExtraFields,
    profileSummary,
    photoFile,
    experiences,
    skills,
    educations,
    certifications,
    languages,
    progressPercentage,
    isDirty,
    autosaveStatus,
    cvId,
    sectionsCompleted,
    markDirty,
    setFirstName,
    setLastName,
    setEmail,
    setPosition,
    setProfessionalTitle,
    setLocation,
    setLinkedIn,
    setGithub,
    setPortfolio,
    setProfileSummary,
    setPhotoFile,
    toggleExtraFields,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    updateSkill,
    removeSkill,
    setSkillsForCategory,
    addEducation,
    updateEducation,
    removeEducation,
    addCertification,
    updateCertification,
    removeCertification,
    addLanguage,
    updateLanguage,
    removeLanguage,
    getPayload,
    hydrate,
    autosave,
    loadFromLocalStorage,
    loadCv,
  }
})
