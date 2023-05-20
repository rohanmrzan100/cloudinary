import axios from "axios"
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const uploadImage = async (imageData)=>{
    try {
        const Data = axios.post('http://localhost:3001/api/upload/video',
        {
            data:imageData.image,
            description:imageData.description
        })
        return Data.data
        
    } catch (error) {
        console.log(error);
        return error
    }
}