import { createTheme } from "@nextui-org/react"

export const ligthTheme = createTheme({
    type: 'ligth',
    theme: {
        fonts: {
            Lato: "'Lato', sans-serif"
        },
        colors: {}, // override dark theme colors
    }
});