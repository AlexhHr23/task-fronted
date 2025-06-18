import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ConfirmToken, RequestConfirmationCodeForm, UserRegistrationForm } from "../types";

export const createAccount = async(formData: UserRegistrationForm) =>  {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export const confirmAccount = async(tokenData: ConfirmToken) => {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, tokenData)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const requestConfirmation = async(formData: RequestConfirmationCodeForm) => {
    try {
        const url = '/auth/request-code'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}