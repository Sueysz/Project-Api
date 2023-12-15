import { errorHandling } from "../errorHandling.js"

export const verifyAuthorization = (expectedRole)=>{
    return (req, res, next)=>{
        if(!req.user){
            return errorHandling(res)
        }
        if(req.user.role !== expectedRole){
            return errorHandling(res,{errorCode:403})
        }
        next();
    }
}