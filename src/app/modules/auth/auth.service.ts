
import {auth} from "../../lib/auth";

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

export const authService = {
    registerPatient
}