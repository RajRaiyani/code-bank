import { useNavigate, useParams } from "react-router-dom";
import Blog from "../../components/Cards/BlogCard";
import useGetAllBlogs from "../../hooks/useGetAllBlogs";
import deleteBlogByid from "../../utilities/APIcalls/deleteBlog";
import { useState } from "react";
import {marked} from 'marked'; 

import useGetBlogById from "../../hooks/useGetBlogById";
import LikeCard from "../../components/Cards/LikeCard";

function BlogById()
{
    const [data,setData]=useGetAllBlogs();
    const [id , setId]=useState(useParams().id);
    const [databyid, setDatabyid]=useGetBlogById(id);
    console.log(databyid)

    const navigate=useNavigate();
    async function deleteBlog(id)
    {
        setData([...data.filter((e)=>{
            return e._id!==id
        })])

    await deleteBlogByid(id,()=>{navigate("/login")})
    }
  

    return(
        <>
        <div className="flex justify-between ">

            <div className="w-full h-fit border gc-border-green m-2">
                <div className="m-2">
            
                <div className="text-2xl text-center"><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{ databyid.data!==undefined ?databyid.data.user_id.username[0].toUpperCase():null}</span>{databyid.data!==undefined ?databyid.data.title:null}</div>
                {databyid.data !== undefined ? 
                <div className="m-2 p-3 shadow-lg bg-gray-100 min-h-[20vh] max-h-[50vh] overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: marked(databyid.data.data) }}></div>
                </div >:null}
                <div>
                <LikeCard/>
                </div>
                </div>
            </div>
            <div className="overflow-y-auto h-[89vh] blogdatabyid gc-shadow-22 w-[50vw]">
        {data? data.map((e)=>{
            return(
            <Blog  title={e.title} date={e.date} likes={e.likes} username={e.user_id.username} Blogid={e._id} user_id={e.user_id._id} ondelete={()=>{deleteBlog(e._id)}} onClick={()=>{setId(e._id)}} key={e._id}/>
            )
        }):null

        }
            </div>
        </div>
        </>
    )
}

export default BlogById