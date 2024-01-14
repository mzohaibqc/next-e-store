import React from 'react';
import { useTheme } from 'next-themes';
import Button from '@/components/Button';
import { Moon, Sun } from '@/components/Icons';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      size="large"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="sr-only">Sun</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="sr-only">Moon</span>
        </>
      )}
    </Button>
  );
}
