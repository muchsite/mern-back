import ItemSchema from "../schema/ItemSchema.js";

export const addItem = async (req, res, next) => {
  const newItem = new ItemSchema(req.body);
  try {
    const saveItem = await newItem.save();
    res.status(200).json(newItem);
  } catch (error) {
    return next(error);
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    const allItems = await ItemSchema.find();
    res.status(200).json({ data: allItems });
  } catch (error) {
    return next(error);
  }
};
export const getItem = async (req, res, next) => {
  try {
    const item = await ItemSchema.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    return next(error);
  }
};
export const getItemByName = async (req, res, next) => {
  try {
    const item = await ItemSchema.find({ title: req.params.name });
    res.status(200).json(item);
  } catch (error) {
    return next(error);
  }
};
export const getItemByCategory = async (req, res, next) => {
  try {
    const item = await ItemSchema.find({ category: req.query.category });
    res.status(200).send(item);
  } catch (error) {
    return next(error);
  }
};
export const editItem = async (req, res, next) => {
  try {
    const updateItem = await ItemSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { image: req.body.image },
      },
      { new: true }
    );
    res.status(200).json(updateItem);
  } catch (error) {
    return next(error);
  }
};
export const deleteItem = async (req, res, next) => {
  try {
    const updateItem = await ItemSchema.findByIdAndDelete(req.params.id);
    res.status(200).send("Item is deleted");
  } catch (error) {
    return next(error);
  }
};
export const getByPrice = async (req, res, next) => {
  // const { from, to } = req.body;
  try {
    const { from, to } = req.query;
    let items = [];
    if (from && to) {
      items = await ItemSchema.find({
        price: { $gt: from, $lt: to },
      }).exec();
    }
    if (from && !to) {
      items = await ItemSchema.find({
        price: { $gt: from },
      }).exec();
    }
    if (!from && to) {
      items = await ItemSchema.find({
        price: {
          $lt: to,
        },
      }).exec();
    }

    res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
};
