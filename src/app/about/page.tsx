import type { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~components/ui/button";

export const metadata: Metadata = {
  title: "About",
};

const About: NextPage = () => {
  const skills = [
    {
      label: "Languages",
      value: "languages",
      list: ["JavaScript", "TypeScript", "Python", "Rust", "C#", "Go", "SQL"],
    },
    {
      label: "Frontend",
      value: "frontend",
      list: [
        "HTML",
        "CSS/SCSS",
        "Angular",
        "Solid.js",
        "React",
        "Next.js",
        "Yew",
        "Svelte",
        "Astro",
      ],
    },
    {
      label: "Backend",
      value: "backend",
      list: [
        "Node.js",
        "Express",
        "Nest.js",
        "ASP.NET Core",
        "Django",
        "Axum",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      label: "Tools",
      value: "tools",
      list: [
        "Docker",
        "VS Code",
        "Git",
        "Postman",
        "Figma",
        "Wordpress",
        "Notion",
        "Curve",
      ],
    },
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-2 self-start text-2xl font-medium xl:text-3xl">
        About Me
      </h1>
      <h3 className="mb-8 self-start text-xl font-normal capitalize xl:text-2xl">
        Your friendly neighborhood developer
      </h3>

      <div className="mb-4 flex flex-wrap items-center">
        <Image
          src={"/ceokoroji_headshot.png"}
          alt="My headshot"
          priority
          width={350}
          height={250}
          className="flex-1 rounded-sm border lg:order-2"
          placeholder="blur"
          blurDataURL="/Logo.png"
        />

        <article className="h-full flex-1 py-4 text-center lg:order-1 2xl:px-20">
          <p className="font-base my-4 text-base lg:text-lg 2xl:text-xl">
            I recently graduated from the University of South Florida with a
            B.S. in Information Science. I am currently working as a Financial
            Systems Developer at Jabil, where I support the financial systems
            used by the company&apos;s global finance team. I am also a
            freelance web developer, where I work with clients to build websites
            and web applications. I am passionate about using technology to
            solve problems and make a positive impact on the lives of others.
          </p>

          <p className="font-base my-4 text-base lg:text-lg 2xl:text-xl">
            Inspiration for my career path came from my natural curiosity and
            desire to learn. I was always interested in how technology worked
            and how I could use it to solve problems. I fell in love with the
            idea of being able to create something from nothing.
          </p>

          <p className="font-base my-4 text-base lg:text-lg 2xl:text-xl">
            Blending a vibrant personality and an unwavering work ethic, I craft
            efficient digital solutions. As a full-stack developer, I strive
            each day to deliver cutting-edge, user-friendly applications that
            enhance the experiences of users and empower businesses to achieve
            their goals. I&apos;m driven to work on projects that aim to make a
            real impact on the lives of their users.
          </p>
        </article>
      </div>

      <div className="flex w-full pt-10">
        <Button size="lg" variant="link" className="underline" asChild>
          <Link href="/Chukwuma_Okoroji.pdf" rel="noopener" target="_blank">
            View My Resume
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center pt-10">
        <h2 className="mb-5 text-xl font-bold">My Skills</h2>
        {/* <Tabs tabData={tabs} /> */}
        <Tabs
          defaultValue={skills[0]?.value}
          className="w-full lg:px-12 2xl:px-32"
        >
          <TabsList className="inline-flex w-full">
            {skills.map((skill, index) => (
              <TabsTrigger key={index} value={skill.value} className="flex-1">
                {skill.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={skills[0].value}>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {skills[0]?.list.map((skill, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="justify-center py-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value={skills[1].value}>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {skills[1]?.list.map((skill, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="justify-center py-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value={skills[2].value}>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {skills[2]?.list.map((skill, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="justify-center py-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value={skills[3].value}>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {skills[3]?.list.map((skill, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="justify-center py-2"
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
