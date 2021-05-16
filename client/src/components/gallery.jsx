import { ProductItem } from './product-item';

export const Gallery = () => {
	return (
		<div id='portfolio' className='text-center'>
			<div className='container'>
				<div className='section-title'>
					<h2>Sản phẩm mới nhất</h2>
				</div>
				<div className='row'>
					<div className='portfolio-items' style={{ paddingLeft: 50 }}>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item'>
							<ProductItem
								name='100 ml Eau De Toilette Spray (#498367)'
								image='img/jc34edtest.jpg'
								price='700,000₫'
								originalPrice='770,405₫'
							/>
						</div>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item' style={{ width: 300 }}>
							<ProductItem
								name='60 ml Eau De Toilette Spray (#490865)'
								image='img/jcw2ts.jpg'
								price='659,000₫'
								originalPrice='717,784₫'
							/>
						</div>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item' style={{ width: 300 }}>
							<ProductItem
								name='60 ml Eau De Toilette Spray (#490865)'
								image='img/jcw2ts.jpg'
								price='659,000₫'
								originalPrice='717,784₫'
							/>
						</div>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item' style={{ width: 300 }}>
							<ProductItem
								name='60 ml Eau De Toilette Spray (#490865)'
								image='img/jcw2ts.jpg'
								price='659,000₫'
								originalPrice='717,784₫'
							/>
						</div>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item' style={{ width: 300 }}>
							<ProductItem
								name='60 ml Eau De Toilette Spray (#490865)'
								image='img/jcw2ts.jpg'
								price='659,000₫'
								originalPrice='717,784₫'
							/>
						</div>
						<div className='col-sm-6 col-md-4 col-lg-4 product-item' style={{ width: 300 }}>
							<ProductItem
								name='60 ml Eau De Toilette Spray (#490865)'
								image='img/jcw2ts.jpg'
								price='659,000₫'
								originalPrice='717,784₫'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
