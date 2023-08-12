import CommentCard from "../components/Cards/CommentCard";

const Exampal = () =>{

	const d = new Date();
	return(
		<div className="p-6 w-1/3">
			<CommentCard userName="rpraiyani" className="m-2" comment="this is for testing akjd lkfjs jdkfe skdfi string font style and the other" date={d.toDateString()}  />
			<CommentCard admin userName="rpraiyani" className="m-2" comment="this is for testing akjd lkfjs jdkfe skdfi string font style and the other" date={d.toDateString()}  />
		</div>
	);
}

export default Exampal;