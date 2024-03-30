/*
    setting up global prisma client for db access.

*/

import { PrismaClient } from "@prisma/client";

declare global{                 //global namespace in ts, this allows prisma to be accessed anywhere in the codebase
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient(); 

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;       // if environment is not in production mode the Prisma client instance is stored globally and can be accessed globally, incase of production env the prisma client will only be accessed locally, this reduces memory usage and avoid global state -related issues
export default client;