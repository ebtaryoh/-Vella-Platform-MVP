import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerPassenger(body: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            phone: any;
            role: any;
        };
    }>;
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            phone: any;
            role: any;
        };
    }>;
}
