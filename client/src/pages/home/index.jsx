import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/product-item';
import apiConstants from '../../constants/api.constants';
import { SessionStoreKey } from '../../constants/app.constants';
import { getProductNews, getProductSuggesttion } from '../../services/product.service';
import { currencyFormatter } from '../../shared/utils/format';
import { Header } from './../../components/header';

export const Home = ({ landingPageData }) => {
	const [newProducts, setNewProducts] = useState([]);
	const [productSuggestion, setProductSuggestion] = useState([]);
	const auth = useSelector(state => state.auth);
	const [hasAuth, setHasAuth] = useState(!!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN));

	useEffect(() => {
		const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
		setHasAuth(token);
	}, [auth]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		getProductNews().then(result => setNewProducts(result.data));
	}, []);

	useEffect(() => {
		if (hasAuth) {
			getProductSuggesttion().then(result => setProductSuggestion(result.data));
		} else {
			setProductSuggestion([]);
		}
	}, [hasAuth]);

	return (
		<div style={{ marginTop: -50 }}>
			<Header data={landingPageData.Header} style={{ marginBottom: 20 }} />
			<div id='portfolio' className='text-center'>
				<div className='container'>
					<div className='section-title'>
						<h2>Sản phẩm mới nhất</h2>
					</div>
					<div className='row'>
						<div className='portfolio-items' style={{ paddingLeft: 50 }}>
							{newProducts.map((product, index) => (
								<div className='col-sm-6 col-md-4 col-lg-4 product-item'>
									<ProductItem
										id={product.id}
										name={product.name}
										code={product.code}
										quantity={(product.status === 'ACTIVE' && product.quantity) || 0}
										image={`${apiConstants.URL_API}/image/${product.avatar}`}
										price={currencyFormatter.format(product.price)}
										originalPrice={currencyFormatter.format(product.originPrice)}
										key={index}
									/>
								</div>
							))}
						</div>
					</div>
					{hasAuth ? (
						<>
							<div className='section-title' style={{ marginTop: 30 }}>
								<h2>Có thể bạn quan tâm</h2>
							</div>
							<div className='row'>
								<div className='portfolio-items' style={{ paddingLeft: 50 }}>
									{productSuggestion.map((product, index) => (
										<div className='col-sm-6 col-md-4 col-lg-4 product-item'>
											<ProductItem
												id={product.id}
												name={product.name}
												code={product.code}
												quantity={(product.status === 'ACTIVE' && product.quantity) || 0}
												image={`${apiConstants.URL_API}/image/${product.avatar}`}
												price={currencyFormatter.format(product.price)}
												originalPrice={currencyFormatter.format(product.originPrice)}
												key={index}
											/>
										</div>
									))}
								</div>
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};
