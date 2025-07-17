import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'


type FormValues = {
    username:string
    email:string
    message:string
}

export const ContactForm = () => {

    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log("Form Submitted", data)
    }

  return (
    <div>
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className = "form-control">
            <label htmlFor="username">User-name:</label>
            <input 
                type="text" 
                id="username" 
                placeholder='Enter username'
                
                {...register("username", {

                    required: {
                        value: true,
                        message: 'Username is required.',
                    },

                     minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters long.',
                    },
                    maxLength: {
                        value: 20,
                        message: 'Username cannot exceed 20 characters.',
                    }

                })} />

            <p className = "error">{errors.username?.message}</p>
            </div>
            
            <div className = "form-control">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                placeholder='Enter email' 

                {...register("email", {

                    required: {
                        value: true,
                        message: 'Email is required.',
                    },
                
                    pattern:{
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                        message: "Invalid email format.",
                    },

                    validate: {
                        notAdmin : (fieldValue) =>{
                            return (
                                fieldValue !== "admin@example.com" || 
                                "Enter a different email address."
                            );
            
                        },

                        notBlackListed : (fieldValue) => {
                            return (
                                !fieldValue.endsWith("baddomain.com") || 
                                "This domain is not supported."
                            );
                        },
            }, 
        })} />
            
            <p className = "error">{errors.email?.message}</p>

            </div>

            <div className = "form-control">
            <label htmlFor="message">Message</label>
            <textarea
                id='message' 
                placeholder='Enter message'
                {...register("message", {

                    required: {
                        value: true,
                        message: 'Your Message is required.',
                    },

                    maxLength: {
                            value: 200,
                            message: "Message cannot exceed 200 characters.",
                    },

                    minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters long.",
                    },
            }
            )}/>
            
            <p className = "error">{errors.message?.message}</p>

            </div>

            <button>Submit</button>
        </form>
        <DevTool control = {control}/>
    </div>
  );
};
