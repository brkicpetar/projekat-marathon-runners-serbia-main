import { postModel } from "../db/models/blog.model.js";

export const blogController = {
  async getAll(req, res) {
    try {
        const blogs = await postModel.find();       
        res.status(200).json(blogs);
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] An error has occured while trying to retrieve blogs. \n
            Error details:` + error
      );
      return res
        .status(500)
        .json({ message: "Server error has occured while trying to retrieve blogs!" });
    }
  },
  async getOne(req, res){
    try {
      const body = req.body;
      const blogId = body.id;  
      const blog = await postModel.findOne({_id: blogId});
      if(!blog){
        console.log(
          `[${new Date().toISOString()}] An error has occured while trying to retrieve the blog. \n
              Error details: Requested blog doesn't exist in database\n`
        );
        return res.status(404).json({message: "Requested blog doesn't exist in database"});
      }
       res.status(200).json(blog);
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] An error has occured while trying to retrieve the blog. \n
            Error details:` + error
      );
      return res
        .status(500)
        .json({ message: "Server error has occured while trying to retrieve blog!" });
    }
  },
  async addNew(req, res){
    try {

        const body = req.body;

        let title = body.title;
        let coverImagePath = body.coverImagePath;
        let author = body.author;
        let comments = body.comments;


        if(!title || !coverImagePath || !author || !comments){
            console.log(
                `[${new Date().toISOString()}] An error has occured while trying to create a new blog. \n
                    Error details: Incomplete data about the new blog\n`
              );
              return res.status(400).json({message: "Incomplete data about new blog."})
        }
        await postModel.create({
            title: title,
            coverImagePath: coverImagePath,
            author: author,
            comments: comments,
        });
        console.log(
            `[${new Date().toISOString()}] New blog ${title} has been created successfully!\n`
          );
          return res.status(200).json({message: `New blog ${title} has been created successfully!`});

    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to create new blog. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to create new blog!" });
    }
  },
  async update(req, res){
    try {
        const body = req.body;
    const blogID = body.id;

    const existingBlog = await postModel.findById(blogID);
    if(!existingBlog){
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing blog. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing blog!" });
    }
    delete body.id;
    await postModel.updateOne({_id: blogID}, {$set: body});
    console.log(
        `[${new Date().toISOString()}] Blog ${body.title} has been updated successfully!\n`
      );
      return res.status(200).json({message: `Blog has been updated successfully!`});
    } catch (error) {
        console.log(
            `[${new Date().toISOString()}] An error has occured while trying to update existing blog. \n
                Error details:` + error
          );
          return res
            .status(500)
            .json({ message: "Server error has occured while trying to update existing blog!" });
    }
  },
  async delete(req, res){
    try {
        const body = req.body;
        const blogID = body.id;
        const blog = await postModel.findById(blogID);
        if(!blog){
            console.log(`[${new Date().toISOString()}] An error has occured while trying to remove blog. \n
                Error details: Blog hasn't been found in database.`);
        return res
          .status(400)
          .json({ message: error });
        }

        await postModel.deleteOne({_id: blogID}).then(() => {
            console.log(`[${new Date().toISOString()}] Blog ${blog.title} has been removed from server successfully.`);
            res.status(200).send();
        });

    } catch (error) {
        console.log(`[${new Date().toISOString()}] An error has occured while trying to remove blog. \n
                Error details: ${error}`);
        return res
          .status(500)
          .json({ message: error });
    }
  }
};
