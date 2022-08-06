const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try
    {
        /*אנחנו נשלוף את ההדר של אוטוריזיישן
        ונבדוק האם הטוקן הקיים תקין*/ 
        const authHeader=req.headers.authorization;
        const token=authHeader.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch
    {
        return res.status(401).json({msg:"Not authrizet Req"});
    }
}