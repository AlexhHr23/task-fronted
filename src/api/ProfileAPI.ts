import api from "@/lib/axios"
import { isAxiosError } from "axios"
import type { ChangeCurrentPassswordForm, UserProfileForm } from "../types"


export const updateProfile = async(formData : UserProfileForm ) =>  {
    try {
         
         const {data} = await api.put<string>('/auth/profile', formData)
         return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export const changeCurrentPassword = async(formData :  ChangeCurrentPassswordForm) =>  {
    try {
         const {data} = await api.post<string>('auth/change-password', formData)
         return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

