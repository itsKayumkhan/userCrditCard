import Card from '../model/card.model.js';



// Create a new card
export const createCard = async (req, res) => {
  try {
    const {card,name,expire,cvc} =req.body;
    const newCard = new Card({card,name,expire,cvc});
    const savedCard = await newCard.save();
    res.status(201).json({card:savedCard});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single card by ID
export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a card by ID
// export const updateCard = async (req, res) => {
//   try {
//     const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
//     if (!updatedCard) {
//       return res.status(404).json({ error: 'Card not found' });
//     }
//     res.status(200).json(updatedCard);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Delete a card by ID
export const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(deletedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 