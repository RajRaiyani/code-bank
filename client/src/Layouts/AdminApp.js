import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminApp = ()=>{

	const [sidebarState,setSidebarState] = useState(true);

	return(
		<div className="flex flex-col justify-between w-screen h-screen gc-text-black">
			<AdminHeader sidebarToggle={()=>setSidebarState(pri=>!pri)} />
			<div className="flex justify-between w-full h-full">
				{sidebarState===true && <AdminSidebar />}
				<div className="w-full h-full">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default AdminApp