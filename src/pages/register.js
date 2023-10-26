import Link from "next/link";
import Router from "next/router";
import Navigation from "@/components/Navigation";

export default function Register() {
	const onSubmit = event => {
		event.preventDefault();

		const firstName = event.target.firstname.value;
		const lastName = event.target.lastname.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const repeatPassword = event.target.repeatpassword.value;

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		if (firstName && lastName && email && password && repeatPassword) {
			if (password === repeatPassword) {
				fetch(`/api/users`, requestOptions)
					.then(response => response.json())
					.then(result => {
						if (result.success === true) {
							Router.push("/signin?success=true");
						} else {
							const errors = JSON.parse(result);
							console.log(errors);
						}
					})
					.catch(error => console.log("error", error));
			} else {
				console.log("Passwords are not the same.");
			}
		} else {
			console.log("Missing data");
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<Navigation />
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Register new account
						</h1>
						<form
							onSubmit={onSubmit}
							method="post"
							action="/api/auth/callback/credentials"
							className="space-y-4 md:space-y-6"
						>
							<div className="m-auto flex flex-col h-full gap-8 items-center">
								<div className="w-full">
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="firstname"
									>
										First name
									</label>
									<input
										type="text"
										name="firstname"
										placeholder="Enter your first name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									></input>
								</div>

								<div className="w-full">
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="lastname"
									>
										Last name
									</label>
									<input
										type="text"
										name="lastname"
										placeholder="Enter your last name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									></input>
								</div>

								<div className="w-full">
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="email"
									>
										Email
									</label>
									<input
										placeholder="ex: john@gmail.com"
										name="email"
										type="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>

								<div className="w-full">
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="password"
									>
										Password
									</label>
									<input
										placeholder="Enter your password"
										autoComplete="current-password"
										name="password"
										type="password"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>

								<div className="w-full">
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="repeatpassword"
									>
										Repeat Password
									</label>
									<input
										placeholder="Enter your password"
										autoComplete="current-password"
										name="repeatpassword"
										type="password"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>

								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Register
								</button>

								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										href="/"
									>
										Login
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
