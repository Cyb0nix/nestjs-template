import { UserRole } from '../../shared/api-enums';

export interface JwtUser {
  userId: string;
  role: UserRole;
}
