import { UserGroupRoleDto } from './user-group-role.dto';

export interface UserRegisterResponseDto {
    internalId: number;
    email: string;
    roles: string[];
    permissions: string[];
    userGroupRoleDTOS: UserGroupRoleDto[];
  }