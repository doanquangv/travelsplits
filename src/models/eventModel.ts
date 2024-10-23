export interface eventModel {
    authorId: string
    date: number
    descreption: string
    endAt: number
    imageUral: string
    location: Location
    startAt: number
    title: string
    users: string[]
  }
  
  export interface Location {
    address: string
    title: string
  }
  