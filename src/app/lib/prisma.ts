import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import {PrismaClient} from "../../generated/prisma/client";
import {nodeENV} from "better-auth";
import {envVars} from "../config/env";


const connectionString = envVars.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }