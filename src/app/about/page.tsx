import type { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { ResumeButton } from '~/components/resume-button';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export const metadata: Metadata = {
	title: 'About',
};

const About: NextPage = () => {
	const skills = [
		{
			label: 'Languages',
			value: 'languages',
			list: ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'C#', 'SQL'],
		},
		{
			label: 'Frontend',
			value: 'frontend',
			list: [
				'HTML',
				'CSS/SCSS',
				'React',
				'Next.js',
				'Solid.js',
				'Angular',
				'Astro',
				'Yew',
			],
		},
		{
			label: 'Backend',
			value: 'backend',
			list: [
				'Node.js',
				'Django',
				'Flask',
				'Sanic',
				'Axum',
				'Actix',
				'Fiber',
				'.NET',
				'PostgreSQL',
				'Redis',
				'SQLite',
				'MySQL',
				'MongoDB',
			],
		},
		{
			label: 'Tools',
			value: 'tools',
			list: [
				'Docker',
				'AWS',
				'Azure',
				'Linux',
				'Git',
				'Jira',
				'Figma',
				'Wireshark',
				'Wordpress',
			],
		},
	] as const;

	return (
		<div className='flex h-full flex-col'>
			<h1 className='mb-2 self-start text-2xl font-medium xl:text-3xl'>
				About Me
			</h1>
			<h3 className='mb-8 self-start text-xl font-normal capitalize xl:text-2xl'>
				Your friendly neighborhood developer
			</h3>

			<div className='mb-4 flex flex-col items-center xl:flex-row xl:flex-wrap'>
				<div className='relative aspect-square mb-4 lg:order-2 xl:flex-[1_1_30%] rounded-sm border border-border'>
					<Image
						src={'/ceokoroji_headshot.png'}
						alt='My headshot'
						priority
						fill
						className='absolute object-cover w-full h-full'
						// placeholder='blur'
						// blurDataURL=''
					/>
				</div>

				<article className='py-4 indent-12 xl:h-auto xl:flex-[1_1_70%] 2xl:order-1 2xl:px-20'>
					<p className='font-base my-4 text-base lg:text-lg 2xl:text-xl'>
						I recently graduated from the University of South Florida with a
						B.S. in Information Science. I am currently working as a Financial
						Systems Developer at Jabil, where I support the financial systems
						used by the company&apos;s global finance team. I am also a
						freelance web developer, where I work with clients to build websites
						and web applications. I am passionate about using technology to
						solve problems and make a positive impact on the lives of others.
					</p>

					<p className='font-base my-4 text-base lg:text-lg 2xl:text-xl'>
						Inspiration for my career path came from my natural curiosity and
						desire to learn. I was always interested in how technology worked
						and how I could use it to solve problems. I fell in love with the
						idea of being able to create something from nothing.
					</p>

					<p className='font-base my-4 text-base lg:text-lg 2xl:text-xl'>
						Blending a vibrant personality and an unwavering work ethic, I craft
						efficient digital solutions. As a full-stack developer, I strive
						each day to deliver cutting-edge, user-friendly applications that
						enhance the experiences of users and empower businesses to achieve
						their goals. I&apos;m driven to work on projects that aim to make a
						real impact on the lives of their users.
					</p>
				</article>
			</div>

			<div className='flex w-full pt-10'>
				<ResumeButton />
			</div>

			<div className='flex flex-col items-center pt-10'>
				<h2 className='mb-5 text-xl font-bold'>My Skills</h2>
				{/* <Tabs tabData={tabs} /> */}
				<Tabs
					defaultValue={skills[0]?.value}
					className='w-full lg:px-12 2xl:px-32'
				>
					<TabsList className='inline-flex w-full'>
						{skills.map((skill, index) => (
							<TabsTrigger key={index} value={skill.value} className='flex-1'>
								{skill.label}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value={skills[0].value}>
						<div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
							{skills[0]?.list.map((skill, index) => (
								<Badge
									key={index}
									variant={'secondary'}
									className='justify-center py-2'
								>
									{skill}
								</Badge>
							))}
						</div>
					</TabsContent>
					<TabsContent value={skills[1].value}>
						<div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
							{skills[1]?.list.map((skill, index) => (
								<Badge
									key={index}
									variant={'secondary'}
									className='justify-center py-2'
								>
									{skill}
								</Badge>
							))}
						</div>
					</TabsContent>
					<TabsContent value={skills[2].value}>
						<div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
							{skills[2]?.list.map((skill, index) => (
								<Badge
									key={index}
									variant={'secondary'}
									className='justify-center py-2'
								>
									{skill}
								</Badge>
							))}
						</div>
					</TabsContent>
					<TabsContent value={skills[3].value}>
						<div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
							{skills[3]?.list.map((skill, index) => (
								<Badge
									key={index}
									variant={'secondary'}
									className='justify-center py-2'
								>
									{skill}
								</Badge>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default About;
