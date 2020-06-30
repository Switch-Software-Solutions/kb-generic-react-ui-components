import React, { useRef, useEffect } from 'react';
import styles from './FullScreenModal.module.scss';
import PropTypes from 'prop-types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

import Button, { BUTTON_ICON_POS, BUTTON_STYLE } from '../Button/Button';
import Logo from '../Logo/Logo';
import FlexContainer, { FLEX_DIR, FLEX_ALIGN, FLEX_JUSTIFY } from '../FlexContainer/FlexContainer';


const FullScreenModal = (props) => {

	const { t } = useTranslation();

	const screenModal = useRef();

	document.body.style.overflow = 'hidden';

	// Needed to apply fade effect on close modal
	const [debouncedCallback] = useDebouncedCallback(() => {
		props.close();
	}, 500);

	const handleClose = () => {
		screenModal.current.style.opacity = 0;
		document.body.style.overflow = 'unset';
		debouncedCallback();
	};

	useEffect(() => {
		const closeModal = () => {
			screenModal.current.style.opacity = 0;
			document.body.style.overflow = 'unset';
			debouncedCallback();
		};

		// Allow close modal with escape Key
		const handleEsc = ({ keyCode }) => {
			// 27 is the keyCode for Escape key
			if (keyCode === 27 && props.close)
				closeModal();
		};

		window.addEventListener('keyup', handleEsc);

		// Return function its called on unmount
		return () => {
			document.body.style.overflow = 'unset';
			if (props.close) props.close();
			window.removeEventListener('keyup', handleEsc); 
		};
	}, [props, debouncedCallback]);

	return (
		<>

			<div ref={screenModal} className={styles.fullScreenModal}>

				<FlexContainer direction={FLEX_DIR.COL} align={FLEX_ALIGN.CENTER} justify={FLEX_JUSTIFY.CENTER}>
					{props.close ?
						<div className={styles.returnBtn}>
							<Button
								click={() => { handleClose(); }}
								className={`${styles.button_iconHighlithed} marginLeft_1`}
								buttonStyle={BUTTON_STYLE.CLEAR}
								title={t('UI.BACK')}
								icon={faArrowLeft}
								text={t('UI.BACK')}
								iconPos={BUTTON_ICON_POS.LEFT}
								highlightedIcon
							>
							</Button>
						</div> : null}
					<div className={styles.mainScreenChild}>
						{props.showLogo ? 
							<div className={`${styles.fullScreenModalFakeHeader}`}>
								<Logo header />
							</div> : null }
						<div className={styles.screenChild}>
							{props.children}
						</div>
					</div>
				</FlexContainer>
			</div>
		</>
	);
};

FullScreenModal.propTypes = {
	children: PropTypes.node.isRequired,
	close: PropTypes.func,
	showLogo: PropTypes.bool
};

export default FullScreenModal;
