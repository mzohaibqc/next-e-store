'use client';
import { ThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export function Provider(props: ThemeProviderProps) {
  return (
    <ThemeProvider {...props} attribute="class">
      {props.children}
    </ThemeProvider>
  );
}
