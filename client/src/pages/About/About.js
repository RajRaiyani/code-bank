

const About = () => {
	return(
		<>
		<div >
		<div className="h-[70vh] w-[80vw] m-auto">
			<img src="https://admission.darshan.ac.in/Default/ClientPanel/media/DU_Campus_AboutUs.jpg"  className="w-[100%] h-[100%] object-cover "alt="" />
			{/* <span className="w-[100%] h-[70vh] gc-bg-green absolute top-0 left-0 opacity-40 text-7xl text-white flex items-center ">Darshan University </span> */}
		</div>
		<div className="h-[40vh] bg-red-400 w-[50vw] m-auto mt-2 " >
			<div className="text-center text-xl">About GreenCode </div>
			<div className="flex justify-evenly">
			<div>
				User
			</div>
			<div>
				SuperUser
			</div>
			<div>
				Admin
			</div>
			</div>
		</div>
		</div>
		</>
	)
}

export default About;