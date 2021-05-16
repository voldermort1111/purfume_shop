import { Redirect, Route, Switch } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';
import { RoutersMain } from '../router';
import JsonData from './../data/data.json';

export const Main = () => {
	return (
		<>
			<Navigation />
			<div style={{ marginBottom: 100 }}></div>
			<Switch>
				<Redirect from='/:code/:zz' to='/404-not-found'></Redirect>
				{RoutersMain.map(router => (
					<Route
						path={router.path}
						exact={!!router.exact}
						component={() => <router.component landingPageData={JsonData} />}
						key={router.name}
					/>
				))}
			</Switch>
			<Footer />
		</>
	);
};
