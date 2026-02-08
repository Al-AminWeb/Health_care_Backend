import dotenv from 'dotenv';

dotenv.config();

interface envConfig {
    NODE_ENV: string
    PORT: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_SECRET: string
    DATABASE_URL: string
}

const loadEnvVariables = (): envConfig => {


    const requiredEnvVariable = ['NODE_ENV', 'PORT', 'BETTER_AUTH_URL', 'BETTER_AUTH_SECRET', 'DATABASE_URL'];

    requiredEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Environment variable ${variable} is required but it is not set in the .env file`);
        }
    })
    return {
        NODE_ENV: process.env.NODE_ENV as string,
        PORT: process.env.PORT as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        DATABASE_URL: process.env.DATABASE_URL as string
    }
}

export const envVars = loadEnvVariables();