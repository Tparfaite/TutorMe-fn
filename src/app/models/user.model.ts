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
    userProfile:[
        {
            level:string;
            imageUrl:string;
            domain:string;
            description:string;
            otherInterest:string
        }
    ]
}

export interface UserLogin {
    email : string;
    password : string
}

export interface UpdateProfileDto {
    level: string;
    domain: string[];
    imageUrl: string[];
    description: string;
    otherInterest: string;
    
}

export interface CreateMessageDto{
    names:string;
    email:string;
    message:string
}