
import withAuth from "../../server/utils/withAuth";
import Transaction from "../../server/model/transaction";
import User from "../../server/model/user";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {

      const transaction = await Transaction.create({ ...req.body, amount: Number(req.body.amount) });
      const adding=Number(req.body.amount);
      const subtracting=Number(req.body.amount)*(-1);

      await User.findOneAndUpdate({ bankNumber: req.body.sender }, { $push: { transaction: transaction._id }, $inc:{balance:subtracting} });
      await User.findOneAndUpdate({ bankNumber: req.body.receiver }, { $push: { transaction: transaction._id }, $inc:{balance:adding} });

      return res.status(200).json({
        success: true
      });
    } catch (e) {
      return res.status(200).json({
        success: false,
        message: e.message
      });
    }

  } else {
    // Handle any other HTTP method
  }
}
export default withAuth(handler);