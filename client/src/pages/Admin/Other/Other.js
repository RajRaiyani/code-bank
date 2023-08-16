import { useState } from "react";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import useGetAllLanguages from "../../../hooks/useGetAllLanguages";
import { MdDeleteForever } from "react-icons/md";


const Other = () => {
	const [category, setCategory] = useGetAllCategories();
	const [languagg1,setLanguage2]=useState();
	const [language, setLanguage] = useGetAllLanguages();	

	const Level = () => {
		const [data,setdata]=useState("");
		function handleDelete(e){
			console.log(e)
		}
		const printLanguage= language.map((e,index)=>{
			return(
				
				<div className="flex items-center justify-between w-[300px] p-6 gc-shadow-14-normal" key={index}>
				<div className="ms-2  text-xl gc-text-black">{e} 
				</div>
				<MdDeleteForever className="text-red-500 text-2xl" onClick={()=>{handleDelete(e)}}/>

				</div>
				
			)
		})
		return(
			<>
			<div>
				<div className="flex my-2">
			<input className="border gc-border-green w-[220px] my rounded" type="text" name="level" onChange={(e)=>{setdata(e.target.value)}}/><br/>
			<button className="bg-[#7cc529] border w-[80px] rounded-lg p-2 text-xl" onClick={(e)=>{setCategory(e.target.value)}}>submit</button>
			</div>
		<div className="overflow-y-auto min-h-fit max-h-[84vh]  gc-shadow-14-normal max-w-[550px]">
			{printLanguage}
			</div>
			</div>
			</>
		)
	}
	const Catagories = () => {
		const [data,setdata]=useState("");
		function handleDelete(e){
			console.log(e)
		}

		const printcategory= category.map((e,index)=>{
			return(
				
				<div className="flex items-center justify-between w-[300px] p-6 gc-shadow-14-normal" key={index}>
				<div className="ms-2 text-xl gc-text-black">{e} 
				</div>
				<MdDeleteForever className="text-red-500 text-2xl" onClick={()=>{handleDelete(e)}}/>
				</div>
				
			)
		})
		return(
			<>
			<div>
				<div className="flex my-2">
			<input className="border gc-border-green w-[220px] rounded"  type="text" name="level" onChange={(e)=>{setdata(e.target.value)}}/><br/>
			<button className="bg-[#7cc529] border rounded-lg w-[80px] p-2 text-xl" onClick={()=>{console.log(data)}} >submit</button>
			</div>
		<div className=" overflow-y-auto min-h-fit max-h-[84vh] gc-shadow-14-normal max-w-[550px]">
			{printcategory}
			</div>
			</div>
			</>
		)
	}
	return(
		<div className="flex">
			<div className="w-[50%] flex justify-center"><Level/></div>
			<div className="w-[50%] flex justify-center"><Catagories/></div>
		</div>
	)
}

export default Other;