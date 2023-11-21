"use client"

import React, { useState } from 'react'
import z, { type ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import useAlert from '@hooks/useAlert'
import { type ContactFormInputs } from '@components/Forms/ContactForm'
import { Input } from '@components/common/Input'
import { Textarea } from '@components/common/Textarea'

const schema: ZodType<ContactFormInputs> = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email(),
    message: z.string().max(250, { message: 'Message must be less than 250 characters' })
})

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ContactFormInputs>({
        resolver: zodResolver(schema)
    });

    const { setAlert } = useAlert();

    const messageField = watch('message', '');

    const submitData = async (data: ContactFormInputs) => {
        setIsLoading(true);
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
            reset();

        } else {

            setAlert(prev => ({ ...prev, show: true, message: 'Something went wrong', type: 'error' }))

        }

        setIsLoading(false);

        return () => {

            abort();

        }

    }

    return (
        <div className='flex flex-col items-center w-full py-8 px-4 md:px-32 mx-auto self-start'>
            <h1 className='text-3xl mb-2 text-center md:m-0 md:text-[3rem] leading-normal font-semibold text-gray-900'>Contact Me</h1>
            <p className='text-gray-700 text-center font-medium md:text-left'>
                I&apos;m currently available for freelance work. If you have a project that you want to get started, think you need my help with something, or just fancy saying hey, then get in touch.
            </p>

            <form className='flex flex-col p-4 w-72 md:w-[30rem]' onSubmit={handleSubmit(submitData)}>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="name" className='mb-2 font-medium'>Name</label>
                    <Input type="text" id="name" {...register('name', {
                        required: true,
                    })} />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="email" className='mb-2 font-medium'>Email</label>
                    <Input type="email" id="email" {...register('email', {
                        required: true,
                    })} />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col my-[0.75rem] mx-0'>
                    <label htmlFor="message" className='mb-2 font-medium'>Message</label>
                    <Textarea id="message" rows={5} className='rounded-md' {...register('message', {
                        required: true,
                    })} />
                    <small className='font-medium mt-2'>{messageField.length}/250</small>
                    {errors.message && <span className='text-red-500'>{errors.message.message}</span>}
                </div>
                
                <Button loading={isLoading}>Submit</Button>
            </form>
        </div>
    )
}