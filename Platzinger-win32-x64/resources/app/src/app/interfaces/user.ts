export interface User{
    nick: string;
    subnick?: string;//?indica que es un campo opcional
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
    status?: string;
    avatar?: string;
    friends?: any;
}