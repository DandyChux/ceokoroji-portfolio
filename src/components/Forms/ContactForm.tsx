import React from 'react'
import { z, type ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import Button from '@components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import useAlert from '@utils/hooks/useAlert'

export type ContactFormInputs = {
    name: string;
    email: string;
    message: string; 
}

const schema: ZodType<ContactFormInputs> = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email(),
    message: z.string().max(250, { message: 'Message must be less than 250 characters' })
})

const ContactForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ContactFormInputs>({
        resolver: zodResolver(schema)
    });

    const { setAlert } = useAlert();

    const messageField = watch('message', '');

    const submitData = async (data: ContactFormInputs) => {
        setAlert({ show: true, message: 'Sending message...', type: 'info' })
        const { signal, abort } = new AbortController();

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal
        })

        if(res.ok) {

            setAlert(prev => ({ ...prev, show: true, message: 'Message sent successfully', type: 'success' }))

        } else {

            setAlert(prev => ({ ...prev, show: true, message: 'Something went wrong', type: 'error' }))

        }

        return () => {

            abort();
            
        };
    }

    return (
        <>
            <form className='flex flex-col' onSubmit={handleSubmit(submitData)}>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="name" className='capitalize'>Name</label>
                    <input type="text" id="name" {...register('name', {
                        required: true,
                    })} />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email', {
                        required: true,
                    })} />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" {...register('message', {
                        required: true,
                    })} />
                    <small>{messageField.length}/250</small>
                    {errors.message && <span className='text-red-500'>{errors.message.message}</span>}
                </div>
                
                <Button>Submit</Button>
            </form>
            {/* { alert.show && <Alert /> } */}
        </>
    )
}

export default ContactForm