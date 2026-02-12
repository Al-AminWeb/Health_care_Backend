import dotenv from 'dotenv';

dotenv.config();

interface envConfig {
    NODE_ENV: string
    PORT: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_SECRET: string
    DATABASE_URL: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    ACCESS_TOKEN_EXPIRATION: string
    REFRESH_TOKEN_EXPIRATION: string

}

const loadEnvVariables = (): envConfig => {


    const requiredEnvVariable = ['NODE_ENV', 'PORT', 'BETTER_AUTH_URL', 'BETTER_AUTH_SECRET', 'DATABASE_URL', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET', 'ACCESS_TOKEN_EXPIRATION', 'REFRESH_TOKEN_EXPIRATION'];

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
        DATABASE_URL: process.env.DATABASE_URL as string,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
        ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION as string,
        REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION as string,
    }
}

export const envVars = loadEnvVariables();