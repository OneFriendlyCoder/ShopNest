//interacting directly with the DB in order to get the current users

import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from '../libs/prismadb'

export async function getSession() {
    return await getServerSession(authOptions);             //getServerSession is called with the authOptions to retrive session information from the server-side storage
}

export async function getCurrentUser(){                     // this function would enable us to get the user from anywhere in our application
    try {
        const session = await getSession();
        if(!session?.user?.email){return null;}
        const currentUser = await prisma.user.findUnique({
            where: {email: session?.user?.email,},
            include: {orders: true},
        })
        if(!currentUser){return null;}
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified
        }
    } catch (error: any) {
        return null;
    }
}

