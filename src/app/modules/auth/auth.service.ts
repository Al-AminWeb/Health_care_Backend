
import {auth} from "../../lib/auth";
import {UserStatus} from "../../../generated/prisma/enums";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}



const registerPatient = async (payload: IRegisterPatientPayload) => {
    const {name, email, password} = payload;


    const data = await auth.api.signUpEmail({
        // @ts-ignore
        body: {
            name,
            email,
            password,
        }
    })
    if (!data.user) {
        throw new Error("Failed to register user")
    }
//TODO : create patient profile in transaction after sign up of patient in user model
    return data
}

interface ILoginUserPayload {
    email: string;
    password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted");
    }

    return data;

}

export const authService = {
    registerPatient
    ,loginUser
}