import Card from "../schema/Card.js";

export const getCard = async (req, res, next) => {
  const id = req.body.id;
  try {
    const card = await Card.find({ createdBy: id });
    res.status(200).json(card);
  } catch (error) {
    return next(error);
  }
};
export const addItemCard = async (req, res, next) => {
  const id = req.body.id;
  try {
    const newItem = await Card.findOneAndUpdate(
      { createdBy: id },
      {
        $push: { items: req.body.newProduct },
      }
    );
    res.send("asd");
  } catch (error) {
    return next(error);
  }
};
export const addAmountCard = async (req, res, next) => {
  const { title, amount, createdBy } = req.body;
  try {
    const resp = await Card.updateOne(
      { createdBy: createdBy, "items.title": title },
      {
        $set: {
          "items.$.amount": amount,
        },
      }
    );
    res.status(200).json(resp);
  } catch (error) {
    return next(error);
  }
};
export const deleteItemCard = async (req, res, next) => {
  const { title, createdBy } = req.body;
  try {
    const resp = await Card.updateOne(
      {
        createdBy: createdBy,
      },
      {
        $pull: {
          items: { title },
        },
      }
    );
    res.status(200).json(resp);
  } catch (error) {
    return next(error);
  }
};
