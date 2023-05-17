import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { faObjectUngroup } from "@fortawesome/free-solid-svg-icons";

var Try = () => {
	

	function main(){
		console.log("main")
	}
	function sub(e){
		e.stopPropagation();
		console.log("sub")
	}
	return(
        <div onClick={main}>clicke me <button onClick={sub}>hit</button></div>
        
    )
}

export default Try;