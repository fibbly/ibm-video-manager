import Header from "./Header";

const Layout: React.FC = ({ children }) => {
	return (
		<div>
			<div className="bg-slate-100 h-screen w-screen flex flex-col">
				<Header />
				<div className="grow">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
