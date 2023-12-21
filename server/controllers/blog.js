//------------------------ version 2 -----------------

const blog = require("../models/blog");
const bloglike = require("../models/bloglike");
const blogcomment =require("../models/blogcomment");

exports.postBlog=async (req,res)=>{
    var {title,data}=req.body;
    var BlogData;
    try
    {
        BlogData= await blog.create({user_id:req.user_id,data, title});
        
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while adding Blog.", error })

    }
	res.json({ status: "OK", data:BlogData });

}

exports.getAllBlog=async (req,res)=>{
    var data=await blog.find().populate("user_id");
 
    try{
        if(!data)
        return res.json({ status: "NOT_EXIST", message: "blog does not exist." })
  
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while getting Blog.", error })

    }
	res.json({ status: "OK", data });
}

exports.getBlogById=async (req,res)=>{
    var data=await blog.findOne({ _id: req.params.id }, {}).populate("user_id");
    var isLiked=false;

    try{
        if(!data)
        return res.json({ status: "NOT_EXIST", message: "blog does not exist." })

        if( await bloglike.findOne({user_id:req.user_id ,blog_id:req.params.id }))isLiked=true;
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while getting Blog.", error })

    }
	res.json({ status: "OK", data:{data , isLiked}});
}

exports.deleteBlog=async (req,res)=>{
    var {blog_id}=req.body;
    var data;
    try{
        data=await blog.deleteOne({_id:blog_id});
        await bloglike.deleteMany({blog_id:blog_id});
        await blogcomment.deleteMany({blog_id:blog_id});
        
    }
    catch{
        return res.json({ status: "X", message: "something went wrong while deleting Blog.", error })
        
    }
}

exports.updateBlog=async (req,res)=>{
    var {data ,blog_id}=req.body;
    var blogdata;
    try{
        blogdata= await blog.findOne({ _id: blog_id }, {});
        if(!blogdata)
        return  res.json({ status: "NOT_EXIST", message: "Blog does not exist." });
        else
        {
        blogdata.data=data;
        blogdata.save();
        }
        
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while updating Blog.", error })
    }
}

exports.likeBlog = async (req, res) => {
	var blog_id = req.params.id;
	var user_id = req.user_id;
	if (!(blog_id && user_id)) {
		return res.json({ status: "MISSING_FIELD", message: "either blog Id or user Id is missing." });
	}
	var like = false;
	try {
		if (!(await bloglike.findOneAndRemove({ user_id, blog_id }))) {

			if (!(await blog.updateOne({ _id: blog_id }, { $inc: { likes: 1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such blog Exist." });
			}
			await bloglike.create({ user_id, blog_id });

			like = true;
		} else {
			if (!(await blog.updateOne({ _id: blog_id }, { $inc: { likes: -1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such question Exist." });
			}
		}
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while adding like to blog.", error })
	}
	res.json({ status: "OK", like });

}