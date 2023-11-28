import { raceModel } from "../db/models/race.model";

export const raceController = {
    async getAll(req, res){
        try {
            const races = await raceModel.find();       
            res.status(200).json(races);
        } catch (error) {
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to retrieve races. \n
                    Error details:` + error
              );
            return res
                .status(500)
                .json({ message: "Server error has occured while trying to retrieve races!" });
        }
    },
    async addNew(req, res){
        try {

            const body = req.body;
    
            let title = body.title;
            let image = body.image;
            let type = body.type;
            let categories = body.categories;
            let city = body.city;
            let collection = body.collection;
            let participants = body.participants;
            let dateProp = body.dateProp;
    
            if(!title || !type || !dateProp || !city){
                console.log(
                    `[${new Date().toISOString()}] An error has occured while trying to create new race. \n
                        Error details: Incomplete data about new race\n`
                  );
                  return res.status(400).json({message: "Incomplete data about new race."})
            }
            await raceModel.create({
                title: title,
                image: image,
                type: type,
                categories: categories,
                city: city,
                gender: gender,
                collection: collection,
                participants: participants,
                dateProp: dateProp
            });
            console.log(
                `[${new Date().toISOString()}] New race ${title} has been created successfully!\n`
              );
              return res.status(200).json({message: `New race ${title} has been created successfully!`});
    
        } catch (error) {
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to create new race. \n
                    Error details:` + error
              );
              return res
                .status(500)
                .json({ message: "Server error has occured while trying to create new race!" });
        }
    },
    async update(req, res){
        try {
            const body = req.body;
        const raceID = body.id;
    
        const existingRace = await raceModel.findById(raceID);
        if(!existingRace){
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to update existing race. \n
                    Error details:` + error
              );
              return res
                .status(500)
                .json({ message: "Server error has occured while trying to update existing race!" });
        }
        delete body.id;
        await raceModel.updateOne({_id: raceID}, {$set: body});
        console.log(
            `[${new Date().toISOString()}] Race ${body.title} has been updated successfully!\n`
          );
          return res.status(200).json({message: `Race has been updated successfully!`});
        } catch (error) {
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to update existing race. \n
                    Error details:` + error
              );
              return res
                .status(500)
                .json({ message: "Server error has occured while trying to update existing race!" });
        }
      },
      async delete(req, res){
        try {
            const body = req.body;
            const raceID = body.id;
            const race = await raceModel.findById(radeID);
            if(!race){
                console.log(`[${new Date().toISOString()}] An error has occured while trying to remove race. \n
                    Error details: Race hasn't been found in database.`);
            return res
              .status(400)
              .json({ message: error });
            }
    
            await raceModel.deleteOne({_id: raceID}).then(() => {
                console.log(`[${new Date().toISOString()}] Race ${race.title} has been removed from server successfully.`);
                res.status(200).send();
            });
    
        } catch (error) {
            console.log(`[${new Date().toISOString()}] An error has occured while trying to remove race. \n
                    Error details: ${error}`);
            return res
              .status(500)
              .json({ message: error });
        }
      }
}