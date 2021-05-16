import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Main } from './layouts/main';
import { NotFound } from './components/404';
import { useDispatch } from 'react-redux';
import { clearCartStore } from './redux/actions/cart.action';
// import SmoothScroll from 'smooth-scroll';

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// })

const App = () => {
	// const dispatch = useDispatch();
	// const listener = () => dispatch(clearCartStore());

	useEffect(() => {
		// window.addEventListener('beforeunload', () => dispatch(clearCartStore()));
		// return () => {
		// 	window.removeEventListener('beforeunload', listener);
		// };
	}, []);
	return (
		<Router>
			<Switch>
				<Route path='/404-not-found' component={NotFound} key='notfound' />
				<Route path='/' component={Main} key='main' />
				<Redirect from='*' to='/404-not-found'></Redirect>
			</Switch>
		</Router>
	);
};

export default App;
