import { createTheme } from "@nextui-org/react"

export const ligthTheme = createTheme({
    type: 'ligth',
    theme: {
        fonts: {
            Lato: "'Lato', sans-serif"
        },
        colors: {
            primary: '#E0102C',
            secondary: '#F6F5F5',

            primaryDisabled: '#EBEBEB',
            //colordisable-button

        }, // override dark theme colors
    }
});