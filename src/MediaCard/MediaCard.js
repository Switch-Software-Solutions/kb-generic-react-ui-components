import React from 'react';
import PropTypes from 'prop-types';

import styles from './MediaCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const MediaCard = (props) => {
	return (
		<>
			{props.close ?
				<div className={styles.buttonDiv}>
					<button className={'unstyledButton ' + styles.closeIcon} onClick={props.close} title='Remove'>
						<FontAwesomeIcon icon={faTimes}/>
					</button>
				</div> : null}
			<div style={{ backgroundImage: `url(${props.src})` }} className={styles.wrapper} />
		</>
	);
};

MediaCard.propTypes = {
	src: PropTypes.string.isRequired,
	close: PropTypes.func,
	alt: PropTypes.string.isRequired
};

export default MediaCard;