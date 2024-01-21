import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export default class IsAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1] as string;
        if (token) {
            try {
                const decoded: {id: string} = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
                request.userId = decoded.id
                return true;
            } catch (error) {
                throw new UnauthorizedException('Invalid token');
            }
        }

        return false;
    }
}
