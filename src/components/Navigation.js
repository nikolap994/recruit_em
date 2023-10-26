import Link from "next/link";
import { VscAccount, VscActivateBreakpoints } from "react-icons/vsc";

export default function Home() {
	return (
		<div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
				<nav className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
					<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
						<Link
							href="/recruiter"
							className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
						>
							<VscActivateBreakpoints />
							Recruiter
						</Link>
						<Link
							href="/candidate"
							className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
						>
							<VscAccount />
							Candidate
						</Link>
					</ul>
				</nav>
			</div>
		</div>
	);
}
