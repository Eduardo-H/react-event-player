import { LessonsArray } from '../@types/Lessons';

import { BurgerMenu } from './BurgerMenu';
import { Logo } from './Logo';

export function Header({ lessons }: LessonsArray) {
  return (
    <header className="w-full p-5 flex items-center justify-between xl:justify-center bg-gray-700 border-b border-gray-600">
      <Logo width={150} />

      <BurgerMenu lessons={lessons} />
    </header>
  );
}