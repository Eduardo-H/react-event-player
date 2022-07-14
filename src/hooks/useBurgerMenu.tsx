import { createContext, ReactNode, useContext, useState } from 'react';

type BurgerMenuContextType = {
  isMenuOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

type BurgerMenuProviderProps = {
  children: ReactNode;
}

const BurgerMenuContext = createContext({} as BurgerMenuContextType);

export function BurgerMenuProvider({ children }: BurgerMenuProviderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openBurgerMenu() {
    setIsMenuOpen(true);
  }

  function closeBurgerMenu() {
    setIsMenuOpen(false);
  }

  return (
    <BurgerMenuContext.Provider 
      value={{ 
        isMenuOpen,
        openBurgerMenu,
        closeBurgerMenu
      }}
    >
      {children}
    </BurgerMenuContext.Provider>
  );
}

export function useBurgerMenu() {
  const context = useContext(BurgerMenuContext);

  return context;
}