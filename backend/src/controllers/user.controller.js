import { userModel } from "../db/models/user.model.js";
import { hash } from "../utils/encrypt.js";
import {createAccessToken} from "../utils/jwt.js";

export const userController = {
  async login(req, res) {
    try {
      const body = req.body;
      let username = body.username;
      let password = body.password;
      if (!username || !password) {
        console.log(`[${new Date().toISOString()}] A client-side error has occured while trying to login. \n
                Error details: Login data is missing.
                Username: ${
                  username === null || username.trim().length === 0
                    ? "missing"
                    : username
                }\n`);
        return res.status(400).json({ message: "Login data is missing." });
      }

      const user = await userModel.findOne({ username });

      if (!user) {
        console.log(`[${new Date().toISOString()}] An error has occured while trying to login. \n
                Error details: Requested user was not found in database.
                Username: ${username}\n`);
        return res
          .status(404)
          .json({ message: "Requested user was not found in database." });
      }

      const hashedPassword = hash(password);

      if (user.password != hashedPassword) {
        console.log(`[${new Date().toISOString()}] Failed login attempt \n
                Error details: Invalid password!\n
                Username: ${username}\n`);
        return res.status(400).json({ message: "Invalid password!" });
      }

      console.log(
        `[${new Date().toISOString()}] User ${username} has logged onto system.\n`
      );

      const token = createAccessToken({
        username: username,
        id: user.id,
      });

      res.cookie("token", token);

      res.status(200).json({ token });
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] An error has occured while trying to login. \n
            Username: ${req.body.username}\n
            Error details:\n` + error
      );
      return res
        .status(500)
        .json({ message: "Server error has occured while trying to login!" });
    }
  },
  async register(req, res) {
    try {
      const body = req.body;
      let username = body.username;
      let password = body.password;
      let firstName = body.firstName;
      let lastName = body.lastName;
      let email = body.email;
      let bio = body.bio;
      let shippingData = body.shippingData;

      if (!username || !password || !firstName || !lastName || !email) {
        console.log(`[${new Date().toISOString()}] A client-side error has occured while trying to register. \n
                Error details: Register data is missing.`);
        return res.status(400).json({ message: "Register data is missing." });
      }

      const existing = await userModel.findOne({ username });
      if (existing) {
        console.log(`[${new Date().toISOString()}] An error has occured while trying to register. \n
                Error details: User already exists.`);
        return res.status(400).json({ message: "User already exists." });
      }

      password = hash(password);
      const user = await userModel.create({
        username,
        password,
        firstName,
        lastName,
        email,
        bio,
        shippingData,
      });
      console.log(
        `[${new Date().toISOString()}] User ${username} has register onto system. \n`
      );
      const token = createAccessToken({
        username: user.username,
        id: user.id,
        firstName,
        lastName,
      });
      res.cookie("token", token);
      return res.status(200).json(token);
    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to register. \n
                Username: ${req.body.username}\n
                Error details:\n` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to register!" });
    }
  },
  async getUserData(req, res){
    try{
      const body = req.body;
    const userID = body.id;

    const user = await userModel.findById(userID);
    if(!user) {
        console.log(`[${new Date().toISOString()}] An error has occured while trying to login. \n
                Error details: Requested user was not found in database.
                Username: ${username}\n`);
        return res
          .status(404)
          .json({ message: "Requested user was not found in database." });
    }
    return res.status(200).json({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        shippingData: user.shippingData
    });
    }
    catch(error){
      console.log(`[${new Date().toISOString()}] An error has occured while trying to retrieve user data. \n
                Error details: ${error}.
                Username: ${username}\n`);
        return res
          .status(500)
          .json({ message: error });
    }

  },
  async removeUser(req, res){
    try {
      const body = req.body;
    const userID = body.id;
    const user = await userModel.findById(userID);
    if(!user){
      console.log(`[${new Date().toISOString()}] An error has occured while trying to remove user. \n
                Error details: Requested user was not found in database.
                Username: ${username}\n`);
        return res
          .status(404)
          .json({ message: "Requested user was not found in database." });
    }
    await userModel.deleteOne({_id: userID}).then(() => {
      console.log(`[${new Date().toISOString()}] User ${user.username} has been deleted from server successfully.`);
      res.status(200).send();
    });
    } catch (error) {
      console.log(`[${new Date().toISOString()}] An error has occured while trying to remove user data. \n
                Error details: ${error}`);
        return res
          .status(500)
          .json({ message: error });
    }
  },
  async update(req, res){
    try {
        const body = req.body;
    const userID = body.id;

    const existingUser = await userModel.findById(userID);
    if(!existingUser){
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing user. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing user!" });
    }
    delete body.id;
    await userModel.updateOne({_id: userID}, {$set: body});
    console.log(
        `[${new Date().toISOString()}] User ${existingUser.username} has been updated successfully!\n`
      );
      return res.status(200).json({message: `User has been updated successfully!`});
    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing user. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing user!" });
    }
  }
};
