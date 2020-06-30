import React, { useRef, createRef }  from 'react';
import styles from './ButtonGroup.module.scss';
import PropTypes from 'prop-types';

import Button, { BUTTON_ICON_POS, BUTTON_COLOR, BUTTON_STYLE, BUTTON_SIZE } from '../Button/Button';

const ButtonGroup = (props) => {

	const elementsRef = useRef( props.options.map(() => createRef() ));

	// Set class
	let btnGroupClass = [styles.buttonGroup];
	switch (props.format) {
		case BUTTONGROUP_FORMAT.COMPACT:
			btnGroupClass.push(styles.buttonGroup_formatCompact);
			break;
		case BUTTONGROUP_FORMAT.COMPACT_MOBILEONLY:
			btnGroupClass.push(styles.buttonGroup_formatCompactMobile);
			break;
		default:
			break;
	}
	if(props.mobileScroll) btnGroupClass.push(styles.buttonGroup_mobileScroll);
	const handleButtonClass = (index) => props.activeButton === index ?
		styles.buttongroup__button + ' ' + styles.buttongroup__button_active :
		styles.buttongroup__button;

	// Set style
	const handleButtonStyle = (index) => props.activeButton === index ? BUTTON_STYLE.FILL : BUTTON_STYLE.OUTLINE;

	const handleButtonClick = (index) => {
		// Control scroll when mobileScroll is active
		if(props.mobileScroll) {
			elementsRef.current[index].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}

		return props.callBack(index);
	};

	return (
		<div className={props.mobileScroll && styles.scrollableBtnGroupCont}>
			<div className={btnGroupClass.join(' ')}>
				{ props.mobileScroll && <span className={styles.mobileScrollPadding} /> }
				{
					props.options && Array.isArray(props.options) && props.options.map((option, index) => <Button
						ref={elementsRef.current[index]}
						key={index}
						buttonId={'profileTab'+index}
						iconPos={BUTTON_ICON_POS.LEFT}
						icon={option.icon}
						buttonClassName={handleButtonClass(index)}
						color={BUTTON_COLOR.MAIN}
						buttonStyle={handleButtonStyle(index)}
						text={option.title}
						size={props.bigButtons ? null : BUTTON_SIZE.SMALL}
						click={() => handleButtonClick(index)}
					/>)
				}
				{ props.mobileScroll && <span className={styles.mobileScrollPadding} /> }
			</div>
		</div>
	);
};

ButtonGroup.propTypes = {
	options: PropTypes.array.isRequired,
	activeButton: PropTypes.number.isRequired,
	callBack: PropTypes.func.isRequired,
	format: PropTypes.string,
	bigButtons: PropTypes.bool,
	mobileScroll: PropTypes.bool
};

export default ButtonGroup;

export const BUTTONGROUP_FORMAT = Object.freeze({
	REGULAR: 'REGULAR',
	COMPACT: 'COMPACT',
	COMPACT_MOBILEONLY: 'COMPACT_MOBILEONLY'
});
