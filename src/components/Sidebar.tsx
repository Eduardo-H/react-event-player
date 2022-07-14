import { LessonsArray } from '../@types/Lessons';

import { Lesson } from './Lesson';

export function Sidebar({ lessons }: LessonsArray) {
  return (
    <aside className="hidden xl:block w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Class schedule
      </span>

      <div className="flex flex-col gap-8">
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
        )}
      </div>
    </aside>
  )
}