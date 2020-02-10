import React from 'react';
import styles from './RadioButtons.module.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RadioButtons = (props) => {
	const { t } = useTranslation();

	const radioNames = Math.random()*1000;

	// Group class
	const radioGroupContainerClass = [styles.radioGroupContainer];

	if(props.radioStyle === RADIO_STYLE.INLINE_RANGE) radioGroupContainerClass.push(styles.radioGroupContainer_styleRangeInline);

	if (props.message) radioGroupContainerClass.push(styles.radioGroupContainer_message);
	let message = props.message ? (
		<div role='alert' className={styles.radioMessage}>
			{props.message}
		</div>
	) : null;

	// Input class
	let radioContainerClass = [styles.radioCont];
	if(props.radioStyle === RADIO_STYLE.INLINE || props.radioStyle === RADIO_STYLE.INLINE_RANGE)
		radioContainerClass.push(styles.radioCont_styleInline);

	// Generate inputs
	const radioInputs =
		props.buttonNames ? Object.keys(props.buttonNames).map( key => {

			const value = props.buttonNames[key];
			
			return (
				<div key={key+'key'} className={radioContainerClass.join(' ')}>
					<input
						checked={props.initialValue === value ? true : ''}
						type='radio'
						name={radioNames}
						id={key+'id'}
						onChange={ () => {}}
						onClick={props.change}
						value={value || ''}
						className={styles.radioInput}
					/>
					<label className={styles.radioLabel} htmlFor={key+'id'}>
						<span className={styles.radioLabel__text}>{ props.translationKey ? t(props.translationKey+key) : t(key)}</span>
					</label>
				</div>
			);
		}) : null
	;

	return (
		<div className={radioGroupContainerClass.join(' ')}>
			{radioInputs}
			{message}
		</div>
	);
};

RadioButtons.propTypes = {
	buttonNames: PropTypes.object.isRequired,
	change: PropTypes.func,
	translationKey: PropTypes.string,
	radioStyle: PropTypes.string,
	message: PropTypes.string,
	initialValue: PropTypes.any
};

export default RadioButtons;

export const RADIO_STYLE = Object.freeze({
	BLOCK: 'BLOCK',
	INLINE: 'INLINE',
	INLINE_RANGE: 'INLINE_RANGE'
});
