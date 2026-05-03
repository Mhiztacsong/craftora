'use server';

import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from "@/auth";
import { redirect } from "next/navigation";


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

export async function authenticate(_: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // ✅ IMPORTANT: disable NextAuth redirect
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid email or password',
          };
        default:
          return {
            success: false,
            message: 'Something went wrong.',
          };
      }
    }

    return {
      success: false,
      message: 'Unexpected error occurred.',
    };
  }
}

export async function createProduct(prevState: any, formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const imageUrl = formData.get("imageUrl") as string;

    await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        userId: user.id,
      },
    });

    return { success: true, message: "Product created successfully 🎉" };

  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}