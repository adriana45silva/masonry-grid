import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default Header;