import { cmsApi } from "../components/apis"
import { Model, Version } from '../interfaces';


export const getVersionInfo = async (pathUrl: string) => {
    console.log("path", pathUrl)
    try {
        const { data } = await cmsApi.get<Model>(`${pathUrl}`)

        console.log("dato de get", data)
        return {
            ...data
        }
    } catch (error) {
        return null;
    }
}