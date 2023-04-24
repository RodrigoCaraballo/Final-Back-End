import { RolesEnum } from '../model';

export interface UpdateUserDto {
  uid?: string;
  email?: string;
  name?: string;
  activate?: boolean;
  role?: RolesEnum;
}
