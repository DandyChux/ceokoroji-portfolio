"use client"
import React from 'react'
import { z, type ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import Button from '@components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import useAlert from '@hooks/useAlert'
import { Input } from '@components/common/Input'
import { Textarea } from '@components/common/Textarea'

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

type ContactFormProps = {
    onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, watch, formState: { errors, isLoading } } = useForm<ContactFormInputs>({
        resolver: zodResolver(schema)
    });

    const { setAlert } = useAlert();

    const messageField = watch('message', '');

    const submitData = async (data: ContactFormInputs) => {
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

            setAlert(prev => ({ ...prev, show: true, message: 'Message sent successfully', type: 'success' }));
            onSuccess ? onSuccess() : null;

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
                    <label htmlFor="name" className='mb-2 font-medium'>Name</label>
                    <Input type="text" id="name" className='bg-[#ffffff]' {...register('name', {
                        required: true,
                    })} />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="email" className='mb-2 font-medium'>Email</label>
                    <Input type="email" id="email" className='bg-[#ffffff]' {...register('email', {
                        required: true,
                    })} />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="message" className='mb-2 font-medium'>Message</label>
                    <Textarea id="message" rows={5} className='bg-[#ffffff]' {...register('message', {
                        required: true,
                    })} />
                    <small className='font-medium mt-2'>{messageField.length}/250</small>
                    {errors.message && <span className='text-red-500'>{errors.message.message}</span>}
                </div>
                
                <Button loading={isLoading}>Submit</Button>
            </form>
        </>
    )
}

export default ContactForm