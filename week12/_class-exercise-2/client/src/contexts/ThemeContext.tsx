import { createContext, useState } from 'react';
import { Theme } from '../types';
export const ThemeContext = createContext<Theme>(
    {
        isLight:true,
        light: { text: '#555', ui: '#ddd'},
        dark: { text: '#ddd', ui: '#333'},
        red: {text: '#222', ui: '#555'},
        blue: {text: '#000000', ui: '#0000ff'}
    });


export default function ThemeContextProvider(props:{children:JSX.Element}) {
    const [theme, setTheme] = useState<Theme>({
        isLight:true,
        light: {
            text: '#555',
            ui: '#ddd',
        },
        dark: {
            text: '#ddd',
            ui: '#333',
        },
        red: {
            text: '#FFFFFF',
            ui: '#FF0000',
        },
        blue: {
            text: '#000000',
            ui: '#0000ff',
        }
    });
  return (
    <ThemeContext.Provider value={{...theme}}>
        <button onClick={() => setTheme({...theme, isLight: !theme.isLight})}>Toggle Theme</button>
        {props.children}
    </ThemeContext.Provider>
  )
}
