import { List, X } from 'phosphor-react';

import { LessonsArray } from '../@types/Lessons';

import { Lesson } from './Lesson';
import { useBurgerMenu } from '../hooks/useBurgerMenu';

export function BurgerMenu({ lessons }: LessonsArray) {
  const { isMenuOpen, openBurgerMenu, closeBurgerMenu } = useBurgerMenu();

  return (
    <nav className="xl:hidden flex items-center gap-3">
      <span>Aulas</span>
      { isMenuOpen 
        ? (
          <button onClick={closeBurgerMenu}>
            <X size={30} className="text-blue-500" />
          </button>
        ) : ( 
          <button onClick={openBurgerMenu}>
            <List size={32} className="text-blue-500" />
          </button>
        )
      }

      { isMenuOpen && (
        <div className="absolute top-[4.5rem] left-0 w-full min-h-screen p-5 bg-gray-700 z-[999] transition-all duration-500 ease-in">
          <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
            Class schedule
          </span>

          <ul className="flex flex-col gap-6 w-full">
            { lessons && (
              lessons.map(lesson => (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  availableAt={new Date(lesson.availableAt)}
                  type={lesson.lessonType}
                />
              ))
            ) }
          </ul>
        </div>
      )}
    </nav>
  );
}