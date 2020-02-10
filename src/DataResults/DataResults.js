import React from 'react';
import styles from './DataResults.module.scss';
import PropTypes from 'prop-types';

const DataResults = (props) => {
	// Set class
	let dataresultsClass = [styles.dataresults];

	switch (props.dataStyle) {
		case DATARESULTS_STYLE.VERTICAL:
			dataresultsClass.push(styles.dataresults_vertical);
			break;
		case DATARESULTS_STYLE.HORIZONTAL:
			dataresultsClass.push(styles.dataresults_horizontal);
			break;
		case DATARESULTS_STYLE.HORIZONTAL_COLOR:
			dataresultsClass.push(styles.dataresults_horizontalColor);
			break;
		default:
			break;
	}

	return (
		<ul className={dataresultsClass.join(' ')}>
			{
				props.items && props.items.map(item =>
					<li key={item.key + 'key'} className={styles.dataresultsItem}>
						<span className={styles.dataresultsItem__value}>{item.value + '%'} </span>
						<span className={styles.dataresultsItem__key}>{item.key}</span>
						{
							props.children && item.key === 'Other…' ?
								<>
									{props.children}
								</>
								: null
						}
					</li>
				)
			}
		</ul>
	);
};

DataResults.propTypes = {
	items: PropTypes.array.isRequired,
	dataStyle: PropTypes.string.isRequired,
	children: PropTypes.node
};

export default DataResults;

export const DATARESULTS_STYLE =  Object.freeze({
	VERTICAL: 'VERTICAL',
	HORIZONTAL: 'HORIZONTAL',
	HORIZONTAL_COLOR: 'HORIZONTAL_COLOR'
});
