import type { NoteFormData } from '@/types/index'
import {useForm} from 'react-hook-form'
import { ErrorMessage } from '../ErrorMessage'

const initialValues :  NoteFormData = {
    content: ''
}

const {register, handleSubmit, formState:{errors} } = useForm({defaultValues: initialValues})


export const AddNoteForm = () => {
  return (
    <form
        onSubmit={() =>  {}}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Crear Nota</label>
            <input 
                id="content"
                type="content"
                placeholder="Contenido de la nota" 
                className="w-full p-3 border border-gray-300"
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
            <input type="submit" 
                value="Crear nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black curson-pointer"
            />
        </div>
    </form>
  )
}
