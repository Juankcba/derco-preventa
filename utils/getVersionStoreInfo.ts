import { storeApi } from "../apis"
import { StoreCar } from '../interfaces';


export const getModelVersionStoreInfo = async (pathUrl: string) => {
    console.log("path", `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
    try {
        const { data } = await storeApi.get<StoreCar[]>(`/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
        console.log("data", data)

        return data

    } catch (error) {
        console.log(error)
        return null;
    }
}


export const getVersionStoreInfo = async (pathUrl: string) => {
    console.log("path", `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
    try {
        const { data } = await storeApi.get<StoreCar[]>(`/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
        console.log("data", data)

        return data

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getSubsStoreInfo = async (pathUrl: string) => {
    console.log("path", `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/${pathUrl}`)
    try {
        const { status, data } = await storeApi.get<StoreCar[]>(`/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/${pathUrl}`)
        console.log("data", data)

        return { status, data }

    } catch (error) {
        console.log(error)
        return null;
    }
}