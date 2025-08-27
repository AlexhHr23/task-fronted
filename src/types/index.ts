import { z } from "zod";


/**Auth users */

const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()

})


type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordFormData = Pick<Auth, 'password' | 'password_confirmation'>
export type ChangeCurrentPassswordForm = Pick<Auth,'current_password'| 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>
/**Users */

export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>


/**NOtes */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/**Tasks */

export const taskStatusSchema = z.enum(["underReview", "pending", "onHold", "inProgress", "completed"])
export type TaskStaus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      user: z.union([z.string(), userSchema]).transform((val) =>
        typeof val === 'string'
          ? { _id: val, name: 'Usuario desconocido', email: '' }
          : val
      ),
      status: taskStatusSchema,
      _id: z.string(),
    })
  ),
  notes: z.array(
    z.union([
      z.string().transform((id) => ({
        _id: id,
        content: "",
        createdBy: { _id: "", name: "Desconocido", email: "" },
        task: "",
        createdAt: "",
        updatedAt: "",
      })),
      noteSchema.extend({
        createdBy: userSchema,
      }),
    ])
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema),
  manager: z.string(userSchema.pick({ _id: true }))
})

export const dashboardProjecSchema = z.array(
  projectSchema.pick({
    _id: true,
    clientName: true,
    projectName: true,
    description: true,
    manager: true
  })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

/**Team */
const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
})

export const TeamMembers = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>