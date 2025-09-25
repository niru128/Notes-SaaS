import mongoose from "mongoose";

const tenantSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    plan : {
        type : String,
        enum : ["Free","Pro"],
        default : "Free"
    }
});

const Tenant = mongoose.model("Tenant",tenantSchema)
export default Tenant