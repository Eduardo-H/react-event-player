import { gql, useQuery } from '@apollo/client';
import { DefaultUi, Player, Youtube } from '@vime/react';
import { 
  CaretRight, 
  DiscordLogo, 
  FileArrowDown, 
  Image, 
  Lightning 
} from 'phosphor-react';

import '@vime/core/themes/default.css';

const GQL_GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      description
      videoId
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    description: string;
    videoId: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GQL_GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug
    }
  });

  if (!data) {
    return (
      <div className="flex-1">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img 
                className="h-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL} 
                alt={data.lesson.teacher.name}
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center justify-center gap-2 p-4 text-sm font-bold uppercase rounded bg-green-500 hover:bg-green-700 transition-colors">
              <DiscordLogo size={24} />
              Discord Community
            </a>
            <a href="#" className="flex items-center justify-center gap-2 p-4 text-sm font-bold uppercase rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24} />
              Access Challenge
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-20">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex flex-items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Complementar Material</strong>
              <p className="text-sm text-gray-200 mt-2">Access the complementar material to speed up your development.</p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex flex-items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers</strong>
              <p className="text-sm text-gray-200 mt-2">Download the exclusive wallpapers from Ignite Lab.</p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}