import Product from "../models/Product.model.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.model.js";
export const getProducts = async (req, resp) => {
	try {
		const products = await Product.find();

		const productWithStats = await Promise.all(
			products.map(async (product) => {
				const stat = await ProductStat.find({
					productId: product._id,
				});
				return {
					...product._doc,
					stat,
				};
			})
		);

		resp.status(200).json(productWithStats);
	} catch (error) {
		resp.status(404).json({ message: error.message });
	}
};

export const getCustomers = async (req, resp) => {
	try {
		const customers = await User.find({ role: "user" }).select({ password: 0 });
		resp.status(200).json(customers);
	} catch (error) {
		resp.status(404).json({ message: error.message });
	}
};
