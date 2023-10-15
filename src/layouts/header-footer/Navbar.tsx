/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenreModel from "../../model/GenreModel";
import { getAllGenres } from "../../api/GenreApi";

interface NavbarProps {
	setKeySearch: (keySearch: string) => void;
}

function Navbar({ setKeySearch }: NavbarProps) {
	// Lấy tất cả thể loại
	const [genreList, setGenreList] = useState<GenreModel[]>([]);
	const [erroring, setErroring] = useState(null);

	useEffect(() => {
		getAllGenres()
			.then((response) => {
				setGenreList(response.genreList);
			})
			.catch((error) => {
				setErroring(error.message);
			});
	}, []);

	// Xử lý key search
	let keySearchTemp: string = "";

	const onSetKeySearch = (e: ChangeEvent<HTMLInputElement>) => {
		keySearchTemp = e.target.value;

		if (e.target.value.trim() === "") {
			setKeySearch(e.target.value);
		}
	};

	const submitSearch = () => {
		setKeySearch(keySearchTemp);
	};

	// Khi nhập xong ở trong ô input thì nhấn enter sẽ tìm tìm kiếm luôn
	const handleKeyUp = (event: any) => {
		if (event.key === "Enter") {
			submitSearch();
		}
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			{/* <!-- Container wrapper --> */}
			<div className='container-fluid'>
				{/* <!-- Toggle button --> */}
				<button
					className='navbar-toggler'
					type='button'
					data-mdb-toggle='collapse'
					data-mdb-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<i className='fas fa-bars'></i>
				</button>

				{/* <!-- Collapsible wrapper --> */}
				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'
				>
					{/* <!-- Navbar brand --> */}
					<Link className='navbar-brand mt-2 mt-lg-0' to='/'>
						<img
							src='https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp'
							height='15'
							alt='MDB Logo'
							loading='lazy'
						/>
					</Link>
					{/* <!-- Left links --> */}
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<a className='nav-link' href='#'>
								Trang chủ
							</a>
						</li>
						<li className='nav-item dropdown dropdown-hover'>
							<a
								className='nav-link dropdown-toggle'
								href='#'
								role='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								Thể loại
							</a>
							<ul className='dropdown-menu'>
								{genreList.map((genre) => {
									return (
										<li>
											<Link
												className='dropdown-item'
												to={`/genre/${genre.idGenre}`}
											>
												{genre.nameGenre}
											</Link>
										</li>
									);
								})}
							</ul>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#'>
								Chính sách
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#'>
								Liên hệ
							</a>
						</li>
					</ul>
					{/* <!-- Left links --> */}
				</div>
				{/* <!-- Collapsible wrapper --> */}

				{/* <!-- Right elements --> */}
				<div className='d-flex align-items-center'>
					{/* Form Search */}
					<div className='d-flex me-5' role='search'>
						<input
							className='form-control me-2'
							type='search'
							placeholder='Nhập từ khoá tên sách'
							aria-label='Search'
							onChange={onSetKeySearch}
							onKeyUp={handleKeyUp}
						/>
						<button
							type='button'
							className='btn btn-primary'
							onClick={submitSearch}
						>
							<i className='fas fa-search'></i>
						</button>
					</div>

					{/* <!-- Shopping Cart --> */}
					<a className='text-reset me-3' href='#'>
						<i className='fas fa-shopping-cart'></i>
					</a>

					{/* <!-- Notifications --> */}
					<div className='dropdown'>
						<a
							className='text-reset me-3 dropdown-toggle hidden-arrow'
							href='#'
							id='navbarDropdownMenuLink'
							role='button'
							data-mdb-toggle='dropdown'
							aria-expanded='false'
						>
							<i className='fas fa-bell'></i>
							<span className='badge rounded-pill badge-notification bg-danger'>
								1
							</span>
						</a>
						<ul
							className='dropdown-menu dropdown-menu-end'
							aria-labelledby='navbarDropdownMenuLink'
						>
							<li>
								<a className='dropdown-item' href='#'>
									Some news
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Another news
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Something else here
								</a>
							</li>
						</ul>
					</div>
					{/* <!-- Avatar --> */}
					<div className='dropdown'>
						<a
							className='dropdown-toggle d-flex align-items-center hidden-arrow'
							href='#'
							id='navbarDropdownMenuAvatar'
							role='button'
							data-mdb-toggle='dropdown'
							aria-expanded='false'
						>
							<img
								src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
								className='rounded-circle'
								height='25'
								alt='Black and White Portrait of a Man'
								loading='lazy'
							/>
						</a>
						<ul
							className='dropdown-menu dropdown-menu-end'
							aria-labelledby='navbarDropdownMenuAvatar'
						>
							<li>
								<a className='dropdown-item' href='#'>
									My profile
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Settings
								</a>
							</li>
							<li>
								<a className='dropdown-item' href='#'>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- Right elements --> */}
			</div>
			{/* <!-- Container wrapper --> */}
		</nav>
	);
}

export default Navbar;
