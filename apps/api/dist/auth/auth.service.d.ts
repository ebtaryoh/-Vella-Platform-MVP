import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerPassenger(data: any): Promise<{
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
    login(data: any): Promise<{
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
    private generateToken;
}
