export interface IPasswordHashPayload {
    saltRounds: number;
    password: string
}

export interface IpasswordComparePayload {
    candidatePassword: string;
    hash: string
}