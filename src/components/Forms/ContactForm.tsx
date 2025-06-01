"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z, type ZodType } from 'zod'
import { cn } from '~/lib/utils'
import { Button } from '~components/ui/button'
import { Input } from '~components/ui/input'
import { Textarea } from '~components/ui/textarea'
import useAlert from '~hooks/useAlert'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription
} from '../ui/form'

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

interface ContactFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className }) => {
	const form = useForm<ContactFormInputs>({
		resolver: zodResolver(schema)
	});

	const { setAlert } = useAlert();

	const messageField = form.watch('message', '');

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

		if (res.ok) {

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
		<Form {...form}>
			<form className={cn('flex flex-col w-full gap-4', className)} onSubmit={form.handleSubmit(submitData)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel htmlFor="name">Name</FormLabel> */}
							<FormControl>
								<Input
									type='text'
									placeholder='Full Name'
									required
									className='bg-input'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel htmlFor="email">Email</FormLabel> */}
							<FormControl>
								<Input
									type='email'
									placeholder='Email Address'
									required
									className='bg-input'
									inputMode='email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel htmlFor="message">Message</FormLabel> */}
							<FormControl>
								<Textarea
									rows={10}
									placeholder='Message'
									className='bg-input'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{messageField.length}/250
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					size='lg'
					loading={form.formState.isLoading}
					disabled={!form.formState.isValid}
					className="self-center"
					variant={'accent'}
				>
					Submit
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm
