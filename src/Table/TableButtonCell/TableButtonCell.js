import React from 'react';
import styles from './TableButtonCell.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableButtonCell = (props) => {
	const stylesArr = [styles.buttonCell];
	if (props.disabled) stylesArr.push(styles.disabled);
	if (props.emptyCell) stylesArr.push(styles.emptyCell);

	return (
		<td data-label={props.title} className={stylesArr.join(' ')}>
			{ props.emptyCell ?
				<div className={'unstyledButton ' + styles.buttonCell__empty}/>
				:
				<button className={'unstyledButton ' + styles.buttonCell__icon}
					onClick={props.click} title={props.title}
					aria-label={props.title}
					disabled={props.disabled ? 'disabled' : null}
				>
					<FontAwesomeIcon icon={props.icon} />
				</button>
			}
		</td>
	);
};

TableButtonCell.propTypes = {
	icon: PropTypes.any,
	click: PropTypes.func,
	disabled: PropTypes.bool,
	emptyCell: PropTypes.bool
};

export default TableButtonCell;
