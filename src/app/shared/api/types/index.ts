export interface IAvatar {
  avatar: string
  description: {
    en: string
  }
  name: string
  shortDescription: {
    en: string
  }
  visible: boolean
  id: number
  position: number
  gender: string
  isPremium: boolean
  tags: string[]
  voice: string
  style: string
}