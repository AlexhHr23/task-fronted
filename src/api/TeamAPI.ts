import api from "@/lib/axios";
import {isAxiosError} from 'axios'


import type { Project, TeamMemberForm } from "../types";

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