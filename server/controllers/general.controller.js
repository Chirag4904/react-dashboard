import User from "../models/User.model.js";

export const getUser = async (req, resp) => {
	try {
		const id = req.params;
		const user = await User.findById(id);
		resp.status(200).json(user);
	} catch (error) {
		resp.status(404).json({ message: error.message });
	}
};
