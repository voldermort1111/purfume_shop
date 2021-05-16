import Text from 'antd/lib/typography/Text';
import { NavLink } from 'react-router-dom';

export function NotFound() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				minHeight: '100vh',
			}}
		>
			<Text style={{ fontSize: 50 }} strong>
				404 not found!
			</Text>
			<NavLink to=''>
				<Text style={{ fontSize: 20, color: 'blue' }}>{'<< Trở lại trang chủ'}</Text>
			</NavLink>
		</div>
	);
}
