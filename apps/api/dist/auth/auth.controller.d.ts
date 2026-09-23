import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerPassenger(body: any): Promise<any>;
    login(body: any): Promise<any>;
}
