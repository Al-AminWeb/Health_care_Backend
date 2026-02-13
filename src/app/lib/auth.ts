import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {PrismaClient, ROLE, UserStatus} from "../../generated/prisma/client";
import {prisma} from "./prisma";
import ms, {StringValue} from "ms";
import {envVars} from "../config/env";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                default: "user",
                defaultValue: ROLE.PATIENT
            },
            status: {
                type: "string",
                required: true,
                defaultValue: UserStatus.ACTIVE,
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null,
            }


        },

        sessions: {
            expiresIn: 60* 60*60*24,
            updateAge:60* 60*60*24,
            cookieCache:{
                enabled:true,
                maxAge:60* 60*60*24,
            }
        }

        // trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
        //
        // advanced:{
        //     disableCSRFCheck: true
        // }


    }

});