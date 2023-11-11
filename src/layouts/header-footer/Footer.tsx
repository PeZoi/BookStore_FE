import React from "react";
import { useLocation } from "react-router-dom";
import { AdminEnpoint } from "../../admin/AdminEnpoint";

function Footer() {
	const location = useLocation();
	const adminEnpoint = AdminEnpoint; // Thêm các path bạn muốn ẩn Navbar vào đây

	if (adminEnpoint.includes(location.pathname)) {
		return null; // Nếu location.pathname nằm trong danh sách ẩn, trả về null để ẩn Navbar
	}
	return (
		// <!-- Footer -->
		<footer className='bg-dark text-center text-white'>
			{/* <!-- Grid container --> */}
			<div className='container p-4'>
				{/* <!-- Section: Social media --> */}
				<section className='mb-4'>
					{/* <!-- Facebook --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-facebook-f'></i>
					</a>

					{/* <!-- Twitter --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-twitter'></i>
					</a>

					{/* <!-- Google --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-google'></i>
					</a>

					{/* <!-- Instagram --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-instagram'></i>
					</a>

					{/* <!-- Linkedin --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-linkedin-in'></i>
					</a>

					{/* <!-- Github --> */}
					<a
						className='btn btn-outline-light btn-floating m-1'
						href='#!'
						role='button'
					>
						<i className='fab fa-github'></i>
					</a>
				</section>
				{/* <!-- Section: Social media --> */}

				{/* <!-- Section: Form --> */}
				<section className=''>
					<form action=''>
						{/* <!--Grid row--> */}
						<div className='row d-flex justify-content-center'>
							{/* <!--Grid column--> */}
							<div className='col-auto'>
								<p className='pt-2'>
									<strong>Sign up for our newsletter</strong>
								</p>
							</div>
							{/* <!--Grid column--> */}

							{/* <!--Grid column--> */}
							<div className='col-md-5 col-12'>
								{/* <!-- Email input --> */}
								<div className=' form-white mb-4'>
									<input
										type='email'
										id='form5Example21'
										className='form-control'
										placeholder='Email Address'
									/>
								</div>
							</div>
							{/* <!--Grid column--> */}

							{/* <!--Grid column--> */}
							<div className='col-auto'>
								{/* <!-- Submit button --> */}
								<button
									type='submit'
									className='btn btn-outline-light mb-4'
								>
									Subscribe
								</button>
							</div>
							{/* <!--Grid column--> */}
						</div>
						{/* <!--Grid row--> */}
					</form>
				</section>
				{/* <!-- Section: Form --> */}

				{/* <!-- Section: Text --> */}
				<section className='mb-4'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
						distinctio earum repellat quaerat voluptatibus placeat nam,
						commodi optio pariatur est quia magnam eum harum corrupti
						dicta, aliquam sequi voluptate quas.
					</p>
				</section>
				{/* <!-- Section: Text --> */}

				{/* <!-- Section: Links --> */}
				<section className=''>
					{/* <!--Grid row--> */}
					<div className='row'>
						{/* <!--Grid column--> */}
						<div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
							<h5 className='text-uppercase'>Links</h5>

							<ul className='list-unstyled mb-0'>
								<li>
									<a href='#!' className='text-white'>
										Link 1
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 2
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 3
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 4
									</a>
								</li>
							</ul>
						</div>
						{/* <!--Grid column--> */}

						{/* <!--Grid column--> */}
						<div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
							<h5 className='text-uppercase'>Links</h5>

							<ul className='list-unstyled mb-0'>
								<li>
									<a href='#!' className='text-white'>
										Link 1
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 2
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 3
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 4
									</a>
								</li>
							</ul>
						</div>
						{/* <!--Grid column--> */}

						{/* <!--Grid column--> */}
						<div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
							<h5 className='text-uppercase'>Links</h5>

							<ul className='list-unstyled mb-0'>
								<li>
									<a href='#!' className='text-white'>
										Link 1
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 2
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 3
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 4
									</a>
								</li>
							</ul>
						</div>
						{/* <!--Grid column--> */}

						{/* <!--Grid column--> */}
						<div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
							<h5 className='text-uppercase'>Links</h5>

							<ul className='list-unstyled mb-0'>
								<li>
									<a href='#!' className='text-white'>
										Link 1
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 2
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 3
									</a>
								</li>
								<li>
									<a href='#!' className='text-white'>
										Link 4
									</a>
								</li>
							</ul>
						</div>
						{/* <!--Grid column--> */}
					</div>
					{/* <!--Grid row--> */}
				</section>
				{/* <!-- Section: Links --> */}
			</div>
			{/* <!-- Grid container --> */}

			{/* <!-- Copyright --> */}
			<div
				className='text-center p-3'
				style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
			>
				© 2020 Copyright:
				<a className='text-white' href='https://mdbootstrap.com/'>
					MDBootstrap.com
				</a>
			</div>
			{/* <!-- Copyright --> */}
		</footer>
	);
}

export default Footer;
