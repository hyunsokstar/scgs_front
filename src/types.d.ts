export interface EstimateRequireForm {
    estimatePk: string;
    title: string;
    product: string;
    manager: string;
    email: string;
    phone_number: string;
    content: string;
    estimate_require_completion: string;
    memo: string;
}

export interface EstimateRequire {
    title: string;
    product: string;
    manager: string;
    email: string;
    phone_number: string;
    content: string;
    estimate_require_completion: string;
    memo: string;
}

export interface IRoomPhotoPhoto {
    pk: string;
    file: string;
    description: string;
}

export interface IRoomList {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
    name: string;
    avatar: string;
    username: string;
}

// 1122
export interface IAmenity {
    pk: number;
    name: string;
    description: string;
}

// 1122
export interface ICategory {
    pk: number;
    name: string;
    kind: string;
}

// 1122
export interface IRoomDetail extends IRoomList {
    id: number;
    created_at: string;
    updated_at: string;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: true;
    kind: string;
    is_owner: boolean;
    is_liked: boolean;
    // category: {
    //     name: string;
    //     kind: string;
    // };
    category: ICategory;
    owner: IRoomOwner;
    amenities: IAmenity[];
}

export interface IReview {
    payload: string;
    rating: number;
    user: IRoomOwner;
}

export interface IUser {
    last_login: string;
    username: string;
    email: string;
    date_joined: string;
    avatar: string;
    name: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
}

interface IUsersForUserList {
    username: string;
    avatar: string;
    is_host: string;
    gender: string;
    language: string;
}

interface ISignupForm {
    name: string;
    username: string;
    email: string;
    password: string;
}