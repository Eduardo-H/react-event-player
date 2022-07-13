import { Link, useParams } from 'react-router-dom';
import { format, isPast } from 'date-fns';
import { CheckCircle, Lock } from 'phosphor-react';
import classnames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({
  title,
  slug,
  availableAt,
  type
}: LessonProps) {
  const { slug: urlSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "eeee • LLLL do • p");

  const isLessonActive = urlSlug === slug;

  return (
    <Link 
      to={isLessonAvailable ? `/event/lesson/${slug}` : ''} 
      className={classnames('', {
        'group': isLessonAvailable,
        'disabled cursor-not-allowed': !isLessonAvailable
      })}
    >
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div 
        className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors', {
          'bg-green-500': isLessonActive
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classnames('flex items-center gap-2 text-sm  font-medium', {
              'text-white': isLessonActive,
              'text-blue-500': !isLessonActive
            })}>
              <CheckCircle size={20} />
              Released content
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Soon
            </span>
          )}

          <span className={classnames('text-xs rounded border font-bold py-[0.125rem] px-2', {
            'border-white': isLessonActive,
            'border-green-300': !isLessonActive
          })}>
            {type === 'live' ? 'LIVE' : 'CLASS'}
          </span>
        </header>

        <strong 
          className={classnames('mt-5 block', {
            'text-white': isLessonActive,
            'text-gray-200': !isLessonActive
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  )
}