import storage from "../storage";

const offerController = function (req, res) {
  const { name, value_props, ideal_use_cases } = req.body;
  if (!name || !value_props || !ideal_use_cases) {
    return res.status(401).json({ message: "All fields are required" });
  }
  storage.offers = { name, value_props, ideal_use_cases };
  res.status(200).json({message: "Offer saved successfully", offer: storage.offers});
};

export default offerController;
