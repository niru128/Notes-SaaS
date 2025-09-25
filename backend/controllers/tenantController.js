import Tenant from "../models/Tenant.js";

export const tenantUpgrade = async (req,res)=>{

    try{

        const tenant = await Tenant.findOne({ name: req.user.tenant });
        if(!tenant){
            return res.status(404).json({ msg: "Tenant not found" });
        }

        tenant.plan = "Pro";
        await tenant.save();
        res.json({ msg: `${tenant.name} upgraded to Pro plan` });

    }catch(err){
        res.status(500).json({ msg: "Server error" });
        console.log(err);
    }
} 