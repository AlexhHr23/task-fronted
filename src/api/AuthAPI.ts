import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordFormData, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

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

export const login = async(formData: UserLoginForm) => {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const forgotPassword = async(formData: ForgotPasswordForm) => {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const validateToken = async(formData: ConfirmToken) => {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export const updatePasswordWithToken = async({formData, token}: {formData: NewPasswordFormData, token: ConfirmToken['token']}) => {
    try {
        const url = `auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
         if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
