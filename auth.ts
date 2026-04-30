import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/prisma';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validate input
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // 2. Find user in database (PRISMA)
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        // 3. Compare password (bcrypt)
        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordsMatch) return null;

        // 4. Return user if everything is correct
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});