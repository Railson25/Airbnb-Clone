import {getServerSession} from 'next-auth/next'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from "@/app/libs/prismadb"

export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUser(){
    try {
        const session = await getSession()

        if(!session?.user?.email){
            return null
        }

        const curretUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        })

        if(!curretUser){
            return null
        }
        return {
            ...curretUser,
            createdAt: curretUser.createdAt.toISOString(),
            updatedAt: curretUser.updatedAt.toISOString(),
            emailVerified: curretUser.emailVerified?.toISOString() || null
        }
    } catch (error: any) {
        return null
    }
}