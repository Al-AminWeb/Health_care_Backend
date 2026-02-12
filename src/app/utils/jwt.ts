import {JwtPayload, SignOptions} from "jsonwebtoken";
import {jwt} from "zod";


const createToken = (payload: JwtPayload, secret: string, {expiresIn}: SignOptions) => {
    // @ts-ignore
    const token = jwt.sign(payload, secret, {expiresIn});
    return token;

}

const verifyToken = (token: string, secret: string) => {
    try {
        // @ts-ignore
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return {
            success: true,
            data: decoded
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            error
        }
    }
}


const decodeToken = (token: string) => {

    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
}

export const jwtUtils = {
    createToken,
    verifyToken,
    decodeToken
}