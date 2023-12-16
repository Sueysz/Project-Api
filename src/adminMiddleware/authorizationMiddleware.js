import { errorHandling } from "../utils/errorHandling.js"

export const verifyAuthorization = (expectedRoles)=>{
    return (req, res, next)=>{
        if(!req.user){
            return errorHandling(res)
        }
        if(!expectedRoles.includes(req.user.role)){
            return errorHandling(res,{errorCode:403})
        }
        next();
    }
}