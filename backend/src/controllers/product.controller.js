import { productModel } from "../db/models/product.model.js";

export const productController = {
  async getAll(req, res) {
    try {
        const products = await productModel.find();       
        res.status(200).json(products);
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] An error has occured while trying to retrieve products. \n
            Error details:` + error
      );
      return res
        .status(500)
        .json({ message: "Server error has occured while trying to retrieve products!" });
    }
  },
  async getOne(req, res){
    try {
      const body = req.body;
      const productID = body.id;  
      const product = await productModel.findOne({_id: productID});
      if(!product){
        console.log(
          `[${new Date().toISOString()}] An error has occured while trying to retrieve product. \n
              Error details: Requested product doesn't exist in database\n`
        );
        return res.status(404).json({message: "Requested product doesn't exist in database"});
      }
       res.status(200).json(product);
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] An error has occured while trying to retrieve product. \n
            Error details:` + error
      );
      return res
        .status(500)
        .json({ message: "Server error has occured while trying to retrieve product!" });
    }
  },
  async addNew(req, res){
    try {

        const body = req.body;

        let title = body.title;
        let image = body.image;
        let categories = body.categories;
        let gender = body.gender;
        let collection = body.collection;
        let price = body.price;

        if(!title || !price){
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to create new product. \n
                    Error details: Incomplete data about new product\n`
              );
              return res.status(400).json({message: "Incomplete data about new product."})
        }
        await productModel.create({
            title: title,
            image: image,
            categories: categories,
            gender: gender,
            collection: collection,
            price: price
        });
        console.log(
            `[${new Date().toISOString()}] New product ${title} has been created successfully!\n`
          );
          return res.status(200).json({message: `New product ${title} has been created successfully!`});

    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to create new product. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to create new product!" });
    }
  },
  async update(req, res){
    try {
        const body = req.body;
    const productID = body.id;

    const existingProduct = await productModel.findById(productID);
    if(!existingProduct){
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing product. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing product!" });
    }
    delete body.id;
    await productModel.updateOne({_id: productID}, {$set: body});
    console.log(
        `[${new Date().toISOString()}] Product ${body.title} has been updated successfully!\n`
      );
      return res.status(200).json({message: `Product has been updated successfully!`});
    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing product. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing product!" });
    }
  },
  async delete(req, res){
    try {
        const body = req.body;
        const productID = body.id;
        const product = await productModel.findById(productID);
        if(!product){
            console.log(`[${new Date().toISOString()}] An error has occured while trying to remove product. \n
                Error details: Product hasn't been found in database.`);
        return res
          .status(400)
          .json({ message: error });
        }

        await productModel.deleteOne({_id: productID}).then(() => {
            console.log(`[${new Date().toISOString()}] Product ${product.title} has been removed from server successfully.`);
            res.status(200).send();
        });

    } catch (error) {
        console.log(`[${new Date().toISOString()}] An error has occured while trying to remove product. \n
                Error details: ${error}`);
        return res
          .status(500)
          .json({ message: error });
    }
  }
};
