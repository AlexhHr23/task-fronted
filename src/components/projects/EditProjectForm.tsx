import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify"
import ProjectForm from './ProjectForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Project, ProjectFormData } from '@/types/index'
import { updateProject } from '@/api/ProjectAPI'

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {

    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: [''],
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
            // console.log(error.message)m;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId],})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }



    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar proyecto</p>

                <nav className="my-5">
                    <Link
                        to='/'
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
                        Volver a proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value='Editar proyecto'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>


        </>
    )
}