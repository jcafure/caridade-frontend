// user-register-session.service.ts
import { Injectable } from '@angular/core';
import { UserRegisterResponseDto } from '../../models/user-register-response.dto';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterSessionService {
  private userData!: UserRegisterResponseDto;

  setUserData(data: UserRegisterResponseDto) {
    this.userData = data;
  }

  getUserData(): UserRegisterResponseDto {
    return this.userData;
  }

  getUserEmail(): string {
    return this.userData.email;
  }

  getExternalId(): number {
    return this.userData.internalId;
  }

  clear() {
    this.userData = undefined!;
  }

  hasPermission(permission: string) {
    return this.userData?.permissions?.includes(permission);
  }
  
  hasRole(role: string): boolean {
    return this.userData?.roles?.includes(role);
  }
}
