const readline = require("readline").createInterface({
	input:process.stdin,
	output:process.stdout
});

async function start(){
	await readline.question("what is you name : ",(val)=>{
		readline.close();
		console.log(`myname is ${val}`);
	});
	
	console.log("hello world");
}
start();




