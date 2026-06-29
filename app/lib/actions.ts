'use server';

import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from "@/auth";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";


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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // ❌ DO NOT fetch user again
    // Role is already inside session (NextAuth handles it)

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred.",
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
    const image = formData.get("image") as File;

    if (!image || image.size === 0) {
      return {
        success: false,
        message: "Please select an image.",
      };
    }

    const fileName = `${crypto.randomUUID()}-${image.name}`;

    const blob = await put(fileName, image, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl: blob.url,
        userId: user.id,
      },
    });

    return { success: true, message: "Product created successfully 🎉" };

  } catch (error) {
    console.error("Create Product Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}


export async function updateProduct(
  prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const image = formData.get("image") as File;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    if (existingProduct.userId !== user.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    let imageUrl = existingProduct.imageUrl;

    if (image && image.size > 0) {
      const fileName = `${crypto.randomUUID()}-${image.name}`;

      const blob = await put(fileName, image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      imageUrl = blob.url;
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price,
        imageUrl,
      },
    });

    if (
      image &&
      image.size > 0 &&
      existingProduct.imageUrl &&
      existingProduct.imageUrl !== imageUrl
    ) {
      await del(existingProduct.imageUrl, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    return {
      success: true,
      message: "Product updated successfully! 🎉",
    };
  } catch (error) {
    console.error("Update Product Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}


export async function deleteProduct(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return;
    }

    const id = formData.get("id") as string;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return;
    }

    if (existingProduct.userId !== user.id) {
      return;
    }

    if (existingProduct.imageUrl) {
      await del(existingProduct.imageUrl, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/products");
    
  } catch (error) {
    console.error("Delete Product Error:", error);
  }
}