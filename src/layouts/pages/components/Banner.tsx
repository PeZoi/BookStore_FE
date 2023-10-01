import React from "react";

function Banner() {
	return (
		<div className='container-fluid pt-5 pb-4 text-dark d-flex justify-content-center align-items-center'>
			<div>
				<h3 className='display-5 fw-bold'>
					Đọc sách chính là hộ chiếu <br />
					cho vô số cuộc phưu lưu
				</h3>
				<p className=''>Phạm Ngọc Viễn Đông</p>
				<button className='btn btn-primary btn-lg text-white float-end'>
					Khám phá ngay
				</button>
			</div>
		</div>
	);
}

export default Banner;
