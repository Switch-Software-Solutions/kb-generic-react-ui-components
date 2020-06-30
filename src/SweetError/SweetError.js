import React from 'react';
import PropTypes from 'prop-types';
import styles from './SweetError.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SweetError = (props) => {

	// Set class
	let sweeterrorClass = [styles.sweetErrorInfoCard];
	if (props.noLine) sweeterrorClass.push(styles.sweetErrorInfoCard_noLine);

	return (
		<div className={sweeterrorClass.join(' ')}>
			{props.icon &&
				<div className={styles.sweetErrorInfoCard__icon}>
					<FontAwesomeIcon icon={props.icon} />
				</div>
			}
			<div className={styles.sweetErrorInfoCard__textCont}>
				{
					props.title ?
						<h2 className={styles.sweetErrorInfoCard__title}>{props.title}</h2>
						: null
				}
				<p className={styles.sweetErrorInfoCard__text}>
					{props.message ? props.message : null}
				</p>
				{
					props.secondaryMessage ?
						<p className={styles.sweetErrorInfoCard__secondaryText}>
							{props.secondaryMessage}
						</p>
						: null
				}

			</div>
		</div>
	);
};

SweetError.propTypes = {
	icon: PropTypes.any,
	noLine: PropTypes.bool,
	title: PropTypes.string.isRequired,
	message: PropTypes.string,
	secondaryMessage: PropTypes.string
};

export default SweetError;
