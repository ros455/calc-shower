import MirrorsStandart from "../models/MirrorsStandart.js";

export const create = async (req, res) => {
    try{
        const { type, option, processingСutout} = req.body;

        console.log('type',type);
        console.log('option',option);

        const data = await MirrorsStandart.create({
            type,
            option,
            processingСutout
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
}


export const getAll = async (req, res) => {
    try {
        const allData = await MirrorsStandart.find();

        res.json(allData)
    } catch(e) {
        console.log(e);
    }
}

export const updateGoods = async (req, res) => {
    const {typeIndex, goodsIndex, name, price} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('goodsIndex',goodsIndex);
        console.log('name',name);
        console.log('price',price);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.type[typeIndex].goods[goodsIndex] = {
            name: name,
            price: price,
            };
    
        // зберігаємо зміни у базі даних
        const updatedMirror = await mirror.save();
        console.log(updatedMirror);
      } catch (error) {
        console.error(error);
      }
}

// export const addNewGoods = async (req, res) => {
//     const { showerId, name, price } = req.body;
  
//     if (!showerId || !name || !price) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }
  
//     try {
//       const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
//         showerId,
//         {
//           $push: {
//             "option.color": {
//               name,
//               price
//             }
//           }
//         },
//         { new: true }
//       );
  
//       res.json(updatedMirrorsStandart);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Failed to add new frame" });
//     }
//   };

export const addNewGoods = async (req, res) =>  {
    try {
        const { typeName, name, price } = req.body;
        console.log('typeName', typeName);
        console.log('name', name);
        console.log('price', price);
        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });
        if (!mirror) {
          throw new Error(`Mirror with type name '${showerId}' not found.`);
        }
        mirror.type.forEach((type) => {
          if (type.name === typeName) {
            type.goods.push({
              name: name,
              price: price,
            });
          }
        });
        await mirror.save();
        console.log(`New good '${name}' added to type '${showerId}' successfully.`);
      } catch (err) {
        console.error(`Error adding new good to type: ${err.message}`);
      }
  }

export const removeGoods = async (req, res) => {
    try {
        const { typeName, name } = req.body;

        const mirror = await MirrorsStandart.findOne({ 'type.name': typeName });

        const typeIndex = mirror.type.findIndex((type) => type.name === typeName);

        const goodsIndex = mirror.type[typeIndex].goods.findIndex((good) => good.name === name);

        mirror.type[typeIndex].goods.splice(goodsIndex, 1);
        await mirror.save();
      } catch (err) {
        console.error(`Error deleting good from type: ${err.message}`);
      }
  };

export const updateType = async (req, res) => {
    const {typeIndex, name, goods} = req.body;
    try {
        console.log('typeIndex',typeIndex);
        console.log('name',name);
        const mirror = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
    
        // оновлюємо об'єкт goods відповідного типу
        mirror.type[typeIndex] = {
            name: name,
            goods: goods,
            };
    
        // зберігаємо зміни у базі даних
        const updatedMirror = await mirror.save();
        console.log(updatedMirror);
      } catch (error) {
        console.error(error);
      }
}

export const removeFrame = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.frame": { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

export const addNewFrame = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.frame": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateFrame = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.frame.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.frame[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const removeBackLight = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.backLight": { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

export const addNewBackLight = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.backLight": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateBackLight = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.backLight.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.backLight[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const removeSwitch = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.switch": { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

export const addNewSwitch = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.switch": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateSwitch = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.switch.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.switch[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const removeColor = async (req, res) => {
    try {
      const { showerId, currentId } = req.body;
      console.log('showerId',showerId);
      console.log('currentId',currentId);
  
      const shower = await MirrorsStandart.findOneAndUpdate(
        { _id: showerId },
        { $pull: { "option.color": { _id: currentId } } },
        { new: true }
      );
  
      if (!shower) {
        return res.status(404).json({ message: 'Shower cabin not found' });
      }
  
      return res.json(shower);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Failed to remove shower furniture' });
    }
  };

export const addNewColor = async (req, res) => {
    const { showerId, name, price } = req.body;
  
    if (!showerId || !name || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        {
          $push: {
            "option.color": {
              name,
              price
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new frame" });
    }
  };

  export const updateColor = async (req,res) => {
    try {
        const {name, price, typeId} = req.body;
  
        const shower = await MirrorsStandart.findOne(); // знаходимо один екземпляр моделі
      
        // знаходимо індекс елемента в масиві type
        const index = shower.option.color.findIndex(item => item._id.toString() === typeId);
        
        // оновлюємо об'єкт goods відповідного типу
        shower.option.color[index] = {
            name: name,
            price: price,
        };
  
        // зберігаємо зміни у базі даних
        const updatedType = await shower.save();
  
        res.json(updatedType)
  
    } catch (e) {
        console.log(e);
    }
}

export const updateCordPrice = async (req, res) => {
    const { showerId, price } = req.body;
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.cord.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };

  export const updateWarmedUp = async (req, res) => {
    const { showerId, price } = req.body;
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.warmedUp.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };

  export const updatePainting = async (req, res) => {
    const { showerId, price } = req.body;

    console.log('Work!!!');
  
    if (!showerId || !price) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      const updatedMirrorsStandart = await MirrorsStandart.findByIdAndUpdate(
        showerId,
        { "option.painting.price": price },
        { new: true }
      );
  
      res.json(updatedMirrorsStandart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update cord price" });
    }
  };