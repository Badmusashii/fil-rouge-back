import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/member/entities/member.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Member => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; // NE PAS RENOMMER
    // c'est toujours la propriété user de req que l'on retourne
  },
);
