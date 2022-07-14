import { useParams } from 'react-router-dom';

import { useGetLessonsQuery } from '../graphql/generated';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Video } from '../components/Video';
import { BurgerMenuProvider } from '../hooks/useBurgerMenu';

export function Event() {
  const { slug } = useParams<{slug: string}>();
  const { data } = useGetLessonsQuery();

  return (
    <BurgerMenuProvider>
      <div className="flex flex-col min-h-screen">
        <Header lessons={data?.lessons} />

        <main className="flex flex-1">
          { slug 
            ? <Video lessonSlug={slug} /> 
            : <div className="flex-1"></div>
          }
          <Sidebar lessons={data?.lessons} />
        </main>
      </div>
    </BurgerMenuProvider>
  )
}