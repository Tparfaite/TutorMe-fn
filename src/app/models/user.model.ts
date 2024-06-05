export interface CreateUserDto {
    firstName:string;
    lastName: string;
    email:string;
    phoneNumber:string;
    province: string;
    district:string;
    sector:string;
    role:string;
    gender:string;
    password:string; 
}

export interface UserLogin {
    email : string;
    password : string
}

export interface UpdateProfileDto {
    level: string;
    subject: string[];
    imageUrl: string;
    otherInterest: string;
    description: string;
}

export interface CreateMessageDto{
    names:string;
    email:string;
    message:string
}