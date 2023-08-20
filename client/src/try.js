import { set } from "react-hook-form";
import useGetAllQuestions from "./hooks/useGetAllQuestions"

const Try=()=>{
    const [data, setData]=useGetAllQuestions();
var searchInData;
console.log(data);
if(data!==undefined)
{
    const hashMap = new Map();
    for (const item of data) {
        const keywords = [
            item.number,
            item.level.toLowerCase(),
            item.question.toLowerCase(),
            item.title.toLowerCase(),
        ];
    
        for (const keyword of keywords) {
            if (!hashMap.has(keyword)) {
                hashMap.set(keyword, []);
            }
            hashMap.get(keyword).push(item);
        }
    }
    
     searchInData=(searchString) =>{
        searchString = searchString.toLowerCase();
        const matchingItems = new Set();
    
        if (hashMap.has(searchString)) {
            hashMap.get(searchString).forEach(item => matchingItems.add(item));
        }
    
        setData([...matchingItems]);
        console.log(matchingItems);
    }
    
}
    
    return(
        <>
        hii
        <input type="text" onChange={(e)=>{searchInData(e.target.value)}}/>
        </>
    )
}
export default Try;