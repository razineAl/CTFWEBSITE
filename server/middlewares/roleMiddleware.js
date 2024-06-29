const validateRole = (role)=>{
    return (req,res,next)=>{
        if(role.includes(req.user.role)) next();
        else {
            return res.status(403).json({error:"you don't have the permissions :/"});
        }
    }
}

module.exports = {validateRole}