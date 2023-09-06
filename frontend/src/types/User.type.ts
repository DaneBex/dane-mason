import { Review } from "./Review.type"
import { Income } from "./enums/Income.enum"
import { Race } from "./enums/Race.enum"
import { Sex } from "./enums/Sex.enum"

export type User = {
    id: string

    username: string
    password: string
    email: string

    profileImg?: string

    age?: number
    sex?: Sex
    race?: Race
    income?: Income
    married?: boolean

    reviews?: Review[]
    achievments?: Achievment[]
    favoriteBusinesses?: [Business!]
    echoes: number

    createdAt: string
    updatedAt: string
}