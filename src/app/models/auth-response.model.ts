import { User } from './User';

export interface AuthResponse {
  user: User;
  token: string;
}
