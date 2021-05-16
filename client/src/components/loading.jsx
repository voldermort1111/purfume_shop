export function Loading() {
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
			<img src='/img/Hourglass.gif' />
		</div>
	);
}
