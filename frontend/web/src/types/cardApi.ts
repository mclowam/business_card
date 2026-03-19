export interface Skill {
  name: string
  level: number
}

export interface Experience {
  text: string
  description: string
}

export interface UserOccupation {
  page: string
  description: string
}

export interface Project {
  text: string
  description: string
}

export interface CardCreate {
  name: string
  first_name: string
  last_name: string
  profession: string
  text: string
  about_user: string
  skills?: Skill[] | null
  experiences?: Experience[] | null
  user_occupations?: UserOccupation[] | null
  projects?: Project[] | null
}

export interface CardUpdate {
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  profession?: string | null
  text?: string | null
  about_user?: string | null
  skills?: Skill[] | null
  experiences?: Experience[] | null
  user_occupations?: UserOccupation[] | null
  projects?: Project[] | null
}

export interface CardRead {
  id: number
  user_id: number
  name: string
  first_name: string
  last_name: string
  profession: string
  text: string
  about_user: string
  avatar_url?: string | null
  skills: Skill[]
  experiences: Experience[]
  user_occupations: UserOccupation[]
  projects: Project[]
}

