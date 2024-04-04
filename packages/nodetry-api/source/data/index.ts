import {
    TokenInfo,
} from 'google-auth-library';



export type TokensUser = TokenInfo;


export interface DatabaseUser {
    id: string;
    createdAt: string;
    email: string;
    name: string;
    picture: string;
    payments: string;
}
