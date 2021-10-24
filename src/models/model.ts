export interface Name {
    title: string
    first: string
    last: string
}

export interface Street {
    number: string
    name: string
}

export interface Coordinates {
    latitude: string
    longitude: string
}

export interface Timezone {
    offset: string
    description: string
}

export interface Location {
    timeZone: Timezone
    coordinates: Coordinates
    street: Street
    city: string
    state: string
    country: string
    postcode: string
}

export interface DobRegistered {
    date: string
    age: number
}

export interface Picture {
    large: string
    medium: string
    thumbnail: string
}

export interface UserDetail {
    gender: string
    name: Name
    location: Location
    email: string
    phone: string
    dob: DobRegistered
    picture: Picture
}

export class FlattenUserDetail {
    gender: string
    name: string
    email: string
    phone: string
    dob: string
    picture: string
    constructor(
        gender: string,
        name: string,
        email: string,
        phone: string,
        dob: string,
        picture: string
    ) {
        this.gender = gender;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.picture = picture;
    }
}

