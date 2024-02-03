'use server'

import { db } from '@/db'
import type { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const postSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string().min(10).max(4000),
})

interface PostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}

export async function createPost(
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function updatePost(
    id: string,
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        post = await db.post.update({
            where: { id },
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function deletePost(
    id: string,
): Promise<PostFormState> {
    let post: Post
    try {
        post = await db.post.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}