import { storeApi } from "../apis"
import { StoreCar } from '../interfaces';


export const getVersionStoreInfo = async (pathUrl: string) => {
    console.log("path", pathUrl)
    try {
        const { data } = await storeApi.get<StoreCar[]>(`/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/${pathUrl}`)
        console.log(data)

        return data

    } catch (error) {
        console.log(error)
        return null;
    }
}