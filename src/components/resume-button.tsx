'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export const ResumeButton = () => {
	const plausible = usePlausible();
	const pathname = usePathname();

	// const btnText = 'View My Resume';
	const btnText = pathname === '/' ? 'Download CV' : 'View My Resume';

	const handleClick = () => {
		plausible('Resume Downloaded', {
			props: {
				btnLocation: pathname,
				btnText: btnText,
			},
		});
	};

	return (
		<Button
			size='lg'
			variant='accent'
			className='underline'
			onClick={handleClick}
			asChild
		>
			<Link
				href='/Chukwuma_Okoroji.pdf'
				rel='noopener'
				target='_blank'
				download
			>
				{btnText}
				<ArrowDownTrayIcon className='w-4 h-4 ml-2' />
			</Link>
		</Button>
	);
};
