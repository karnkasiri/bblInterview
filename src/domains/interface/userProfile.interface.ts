
export interface IUserProfile {
    profile: IProfile
    idToken: string
    
}

export interface IProfile {
    id: string
    displayName: string
    username: string
    email: IEmail[]
}

export interface IEmail {
    value: string
}