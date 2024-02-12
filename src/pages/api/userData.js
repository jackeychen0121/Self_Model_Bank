import withAuth from "../../server/utils/withAuth";
import User from "../../server/model/user";
const handler=async (req, res)=> {
    if (req.method === 'GET') {
        const user=await User.findById(req.query.userID);
        
        return res.status(200).json({
            balance:user.balance,
            bankNumber:user.bankNumber,
            currency:user.currency,
            username:user.username
        });
    } else if(req.method === 'POST') {
        console.log(req.query.userID, req.body);
        const user=await User.findByIdAndUpdate(req.query.userID, req.body);
        
        return res.status(200).json({
          success:true
        });
    }
}
export default withAuth(handler);