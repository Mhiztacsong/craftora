'use server';

import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function createUser(_: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'BUYER' | 'ARTISAN';

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists.',
      };
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error) {
    console.error('Error creating user:', error);

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}