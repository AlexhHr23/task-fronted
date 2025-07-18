import api from "@/lib/axios";
import {isAxiosError} from 'axios'


import { TeamMembers, type Project, type TeamMember, type TeamMemberForm } from "../types";

export const findUserById = async({projectId, formData}: {projectId: Project['_id'], formData: TeamMemberForm}) =>  {
    try {
        const url = `/projects/${projectId}/team/find`
        const {data} = await api.post(url, formData)
        console.log(data);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export const addUserToProject = async({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) =>  {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}



export const getProjectTeam = async(projectId: Project['_id']) =>  {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api(url)
        const response = TeamMembers.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export const removeUserFromProject = async({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) =>  {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

