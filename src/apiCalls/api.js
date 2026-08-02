import axios from "axios"
import { BaseUrl } from "../data"

export const PostReq = async (route, data, msg = '', doSomething = () => { }) => {
    let result = await axios.post(BaseUrl + route, data)
        .then(res => {
            // console.warn('Post requ wardn..',res)
            result = res
            if (msg){
                alert(msg)
            }

            if (res.data.length > 0)
                doSomething(res.data)
            // alert(msg)
            return res
        })
        .catch(e => {
            console.warn(e)
        })

    return result
}
export const GetReq = async (route) => {
    try {
        let list = await axios.get(BaseUrl + route)
        // console.log(list)
        return list;
    }
    catch (e) {
        console.warn(e)
    }
}
export const PutReq = async (route, data, msg = '', doSomething = () => { }) => {
    let result
    axios.put(BaseUrl + route, data)
        .then(res => {
            // console.warn('Post requ wardn..',res)
            result = res
            if (msg != '')
                alert(msg)
            if (res.data.length > 0)
                doSomething(res.data)
        })
        .catch(e => {
            console.warn(e)
        })
    return result
}