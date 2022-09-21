import { storeApi } from "../apis"
import { StoreCar } from '../interfaces';


export const getVersionStoreInfo = async (pathUrl: string) => {
    console.log("path", `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
    try {
        const { data } = await storeApi.get<StoreCar[]>(`/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/version/${pathUrl}`)
        console.log("data", data)

        return data

    } catch (error) {
        console.log(error)
        return null;
    }
}