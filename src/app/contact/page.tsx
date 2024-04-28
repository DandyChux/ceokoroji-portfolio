import { Metadata } from "next";
import ContactForm from "~/components/Forms/ContactForm";

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export const metadata: Metadata = {
    title: 'Contact',
}

export default function ContactPage() {

    return (
        <div 
            className='flex flex-col items-center w-full h-full py-8 px-4 md:px-32 mx-auto self-start ch'
            style={{
                backgroundImage: 'url("/contact_background.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <h1 className='text-3xl mb-2 text-center md:m-0 md:text-[3rem] leading-normal font-semibold'>Contact Me</h1>
            <p className='text-center font-medium md:text-left'>
                I&apos;m currently available for freelance work. If you have a project that you want to get started, think you need my help with something, or just fancy saying hey, then get in touch.
            </p>

            <ContactForm className='2xl:w-1/2 pt-8' />
        </div>
    )
}