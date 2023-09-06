import { User } from "./User.type"

export type Review = {
    id: string

    content: string
    rating: number   
    author: User         
    business: Business
    photos: string[]
    likes: number
    responses: Comment[]
    reports?: string[]

    createdAt: string   
    updatedAt: string
}