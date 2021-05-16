import { CaretRightOutlined } from '@ant-design/icons';
import { Card, Checkbox, Collapse, Space } from 'antd';
import Text from 'antd/lib/typography/Text';

export const ProductFilter = ({ panels, onChange, filters }) => {
	return (
		<Collapse ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
			{Object.keys(panels)?.map((key, index) => (
				<Collapse.Panel
					header={
						<Text strong level={5}>
							{panels[key].label}
						</Text>
					}
					key={index}
				>
					<Card>
						<Space direction='vertical'>
							{panels[key]?.options.map((option, index) => (
								<Checkbox
									key={index + option.label}
									value={option.value}
									onChange={e => onChange(e.target.checked, key, option.value)}
									checked={filters[key] && filters[key] === option.value}
								>
									{option.label}
								</Checkbox>
							))}
						</Space>
					</Card>
				</Collapse.Panel>
			))}
		</Collapse>
	);
};
