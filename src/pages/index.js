import { getCsrfToken, getSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function SignIn({ csrfToken }) {
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<Navigation />
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form
							method="post"
							action="/api/auth/callback/credentials"
							className="space-y-4 md:space-y-6"
						>
							<div className="m-auto flex flex-col h-full max-h-64 gap-8 items-center">
								<input
									name="csrfToken"
									type="hidden"
									defaultValue={csrfToken}
								/>
								<div className="w-full">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Email
									</label>
									<input
										placeholder="Enter your email"
										autoComplete="email"
										name="email"
										title="Must be a registered email address."
										type="email"
										required
										minLength="4"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>
								<div className="w-full">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Password
									</label>
									<input
										placeholder="Enter your password"
										autoComplete="current-password"
										name="password"
										type="password"
										required
										minLength="4"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>
								<div>
									<button
										type="submit"
										href="/"
										className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>
										Login
									</button>

									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Don’t have an account yet?{" "}
										<Link
											href="/register"
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Register
										</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: "/" + session._doc.role },
		};
	}

	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
