import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './MediaCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const MediaCard = (props) => {
	const { t } = useTranslation();

	return (
		<div>
			{ props.close ?
				<div className={styles.closeBtnCont}>
					<button className={'unstyledButton ' + styles.closeBtn} onClick={props.close} aria-label={t('UI.REMOVE_IMAGE')} title={t('UI.REMOVE_IMAGE')}>
						<FontAwesomeIcon icon={faTimes}/>
					</button>
				</div> : null
			}
			<div style={{ backgroundImage: `url(${props.src})` }} className={styles.wrapper}>
				{/* An actual img element exists for accesibility concerns. */}
				<img href={props.src} alt={props.alt} className='srOnly' />
			</div>
		</div>
	);
};

MediaCard.propTypes = {
	src: PropTypes.string.isRequired,
	close: PropTypes.func,
	alt: PropTypes.string.isRequired
};

export default MediaCard;
