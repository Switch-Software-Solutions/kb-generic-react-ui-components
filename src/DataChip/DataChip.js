import React from 'react';
import styles from './DataChip.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataChip = (props) => {
	// Set class
	let datachipClass = [styles.datachip];

	return (
		<div className={datachipClass.join(' ')}>
			<p className={styles.datachipText}>
				<span className={styles.datachipTextMain}>{props.textMain}</span>
				{props.textSec}
			</p>
			{ props.icon &&
				<span className={styles.datachipIcon}><FontAwesomeIcon icon={props.icon} /></span>
			}
		</div>
	);
};

DataChip.propTypes = {
	textMain: PropTypes.any.isRequired,
	textSec: PropTypes.string.isRequired,
	icon: PropTypes.any,
};

export default DataChip;
