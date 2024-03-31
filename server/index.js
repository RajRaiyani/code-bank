const app = require("./App");
app.get('/',async(req,res)=>{
    res.json('server is running');
});
app.listen(process.env.SERVER_PORT,()=>{
	console.log("\n------------------START-----------------------\n",)
	console.log(
		"%s\x1b[36m\x1b[1m%d\x1b[0m",
		"server is runing on port : ",process.env.SERVER_PORT
		);
})

