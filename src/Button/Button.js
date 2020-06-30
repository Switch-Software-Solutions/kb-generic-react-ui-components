import React from 'react'; 
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Button = React.forwardRef((props, ref) => {
	const { t } = useTranslation();
	// Props //
	//
	// type     	: Button type.
	// text     	: Button text label.
	// color    	: Button color (main, grey, info, warning, danger).
	// buttonStyle	: Button style (fill, outline, clear).
	// size     	: Optional. Size variants (big, small).
	// icon     	: Optional. FontAwesome icon (Example: icon={faPlus}).
	// iconPos  	: Optional. Icon position (left, right).
	// click    	: onClick action.
	// value		: Optional. Value for the button.

	// Set class //
	const btnClass = [styles.button];
	switch (props.size) {
		case BUTTON_SIZE.HUGE:
			btnClass.push(styles.button_sizeHuge);
			break;
		case BUTTON_SIZE.BIG:
			btnClass.push(styles.button_sizeBig);
			break;
		case BUTTON_SIZE.SMALL:
			btnClass.push(styles.button_sizeSmall);
			break;
		case BUTTON_SIZE.TINY:
			btnClass.push(styles.button_sizeTiny);
			break;
		default:
			break;
	}
	switch (props.color) {
		case BUTTON_COLOR.MAIN:
			btnClass.push(styles.button_colorMain);
			break;
		case BUTTON_COLOR.GREY:
			btnClass.push(styles.button_colorGrey);
			break;
		case BUTTON_COLOR.INFO:
			btnClass.push(styles.button_colorInfo);
			break;
		case BUTTON_COLOR.WARNING:
			btnClass.push(styles.button_colorWarning);
			break;
		case BUTTON_COLOR.DANGER:
			btnClass.push(styles.button_colorDanger);
			break;
		default:
			break;
	}
	switch (props.buttonStyle) {
		case BUTTON_STYLE.FILL:
			btnClass.push(styles.button_styleFill);
			break;
		case BUTTON_STYLE.OUTLINE:
			btnClass.push(styles.button_styleOutline);
			break;
		case BUTTON_STYLE.CLEAR:
			btnClass.push(styles.button_styleClear);
			break;
		default:
			break;
	}
	switch (props.float) {
		case BUTTON_FLOAT.RIGHT:
			btnClass.push(styles.button_floatRight);
			break;
		case BUTTON_FLOAT.LEFT:
			btnClass.push(styles.button_floatLeft);
			break;
		case BUTTON_STYLE.CLEAR:
			btnClass.push(styles.button_styleClear);
			break;
		default:
			break;
	}

	if (props.width === BUTTON_WIDTH.FULL) {
		btnClass.push(styles.button_fullWidth);
	}

	if (props.highlightedIcon) btnClass.push(styles.button__iconLeftHighlighted);

	if (props.buttonClassName) btnClass.push(props.buttonClassName);

	// Type //
	let buttonType = 'button';
	if (props.type) buttonType = props.type;

	// Icon //
	if (props.iconPos === BUTTON_ICON_POS.ICONONLY && props.icon) btnClass.push(styles.button_iconOnly);
	const leftIcon = () => {
		if (props.iconPos === BUTTON_ICON_POS.LEFT && props.icon) {
			return (
				<span className={styles.button__iconContLeft}>
					<FontAwesomeIcon icon={props.icon} />
				</span>
			);
		} else if (props.iconPos === BUTTON_ICON_POS.ICONONLY && props.icon) {
			return (
				<span className={styles.button__iconContOnly}>
					<FontAwesomeIcon icon={props.icon} />
				</span>
			);
		}
	};
	const rightIcon = () => {
		if (props.iconPos === BUTTON_ICON_POS.RIGHT && props.icon) {
			return (
				<span className={styles.button__iconContRight}>
					<FontAwesomeIcon icon={props.icon} />
				</span>
			);
		}
	};

	return (
		<button
			ref={ref}
			type={buttonType}
			className={btnClass.join(' ')}
			onClick={props.click}
			value={props.value}
			disabled={props.disabled ? 'disabled' : null}
			title={props.title}
			aria-label={props.title}
			name={props.name}
			id={props.id ? props.id : null}
		>
			{leftIcon()}
			{t(props.text)}
			{rightIcon()}
		</button>
	);
});

Button.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	title: PropTypes.string,
	color: PropTypes.string.isRequired,
	buttonStyle: PropTypes.string.isRequired,
	size: PropTypes.string,
	icon: PropTypes.any,
	iconPos: PropTypes.string,
	click: PropTypes.func,
	value: PropTypes.any,
	disabled: PropTypes.bool,
	name: PropTypes.string,
	float: PropTypes.string,
	width: PropTypes.string,
	buttonClassName: PropTypes.string,
	highlightedIcon: PropTypes.bool,
	id: PropTypes.string
};

export default Button;

export const BUTTON_SIZE = Object.freeze({
	HUGE: 'HUGE',
	BIG: 'BIG',
	SMALL: 'SMALL',
	TINY: 'TINY'
});

export const BUTTON_COLOR = Object.freeze({
	MAIN: 'MAIN',
	GREY: 'GREY',
	INFO: 'INFO',
	WARNING: 'WARNING',
	DANGER: 'DANGER'
});

export const BUTTON_STYLE = Object.freeze({
	FILL: 'FILL',
	OUTLINE: 'OUTLINE',
	CLEAR: 'CLEAR'
});

export const BUTTON_ICON_POS = Object.freeze({
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	ICONONLY: 'ICONONLY'
});

export const BUTTON_FLOAT = Object.freeze({
	RIGHT: 'RIGHT',
	LEFT: 'LEFT'
});

export const BUTTON_WIDTH = Object.freeze({
	FULL: 'FULL'
});
