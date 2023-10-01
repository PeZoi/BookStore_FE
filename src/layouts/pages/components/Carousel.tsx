import React from "react";

function Carousel() {
	return (
		<div className='row'>
			<div
				id='carouselExampleIndicators'
				className='carousel slide col-8'
				data-mdb-ride='carousel'
			>
				<div className='carousel-indicators'>
					<button
						type='button'
						data-mdb-target='#carouselExampleIndicators'
						data-mdb-slide-to='0'
						className='active'
						aria-current='true'
						aria-label='Slide 1'
					></button>
					<button
						type='button'
						data-mdb-target='#carouselExampleIndicators'
						data-mdb-slide-to='1'
						aria-label='Slide 2'
					></button>
					<button
						type='button'
						data-mdb-target='#carouselExampleIndicators'
						data-mdb-slide-to='2'
						aria-label='Slide 3'
					></button>
				</div>
				<div className='carousel-inner'>
					<div className='carousel-item active'>
						<img
							src={"./../../../images/books/banner-1.jpg"}
							className='d-block w-100'
							alt='Wild Landscape'
							style={{ height: "328px" }}
						/>
					</div>
					<div className='carousel-item'>
						<img
							src={"./../../../images/books/banner-2.jpg"}
							className='d-block w-100'
							alt='Camera'
							style={{ height: "328px" }}
						/>
					</div>
					<div className='carousel-item'>
						<img
							src={"./../../../images/books/banner-3.jpg"}
							className='d-block w-100'
							alt='Exotic Fruits'
							style={{ height: "328px" }}
						/>
					</div>
				</div>
				<button
					className='carousel-control-prev'
					type='button'
					data-mdb-target='#carouselExampleIndicators'
					data-mdb-slide='prev'
				>
					<span
						className='carousel-control-prev-icon'
						aria-hidden='true'
					></span>
					<span className='visually-hidden'>Previous</span>
				</button>
				<button
					className='carousel-control-next'
					type='button'
					data-mdb-target='#carouselExampleIndicators'
					data-mdb-slide='next'
				>
					<span
						className='carousel-control-next-icon'
						aria-hidden='true'
					></span>
					<span className='visually-hidden'>Next</span>
				</button>
			</div>

			<div className='col-4 ps-4'>
				<img
					className='mb-3'
					src={
						"https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/FAHASA-Onl_392x156.jpg"
					}
					alt=''
				/>
				<img
					className=''
					src={
						"https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/FAHASA-potico392x156.png"
					}
					alt=''
				/>
			</div>
		</div>
	);
}

export default Carousel;
