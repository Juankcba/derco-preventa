export const format = (value: number) => {
    return new Intl.NumberFormat("es-CL").format(
        value
    )


}