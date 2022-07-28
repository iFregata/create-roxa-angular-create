export interface AuthCredential {
  username: string;
  password: string;
}

export interface UserToken{
  token:string;
  refresh_token:string;
  expires_in: string,
  email: string,
  user_id: string,
  app_id: string
}
