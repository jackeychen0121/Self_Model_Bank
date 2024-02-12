
import withAuth from "../../server/utils/withAuth";
import Transaction from "../../server/model/transaction";
import User from "../../server/model/user";

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const user = await User.findById(req.query.userID);
      let result=[];
      for (const each of user.transaction){
        const eachTrans=await Transaction.findById(each);
        result.push ({
          sender:eachTrans.sender,
          receiver:eachTrans.receiver,
          amount:eachTrans.amount,
          currency:eachTrans.currency
        });
      }
      return res.status(200).json({
        success: true,
        data:result
      });
    } catch (e) {
      return res.status(404).json({
        success: false,
        message: e.message
      });
    }

  } else {
    // Handle any other HTTP method
  }
}
export default withAuth(handler);