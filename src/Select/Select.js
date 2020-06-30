import React from 'react';
import styles from './Select.module.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Select = (props) => {
	const { t } = useTranslation();
	const inputId = Math.random() * 100;

	// This component receives an Array of objects with the format { value: String, label: String }
	if (!props.options) {
		console.error('Select component > Requires an array of options');
		return;
	} else if (!(Array.isArray(props.options)) && props.options.length) {
		console.error('Select component > Options must be an Array and it should have at least 1 value ');
		return;
	}

	const changeHandler = (evt) => { if (props.change) props.change(evt); };

	let message = props.message ? (
		<div id={inputId + '_error'} role='alert' className={styles.selectMessage}>
			{props.message}
		</div>
	) : null;

	// Set class //
	const selectContainerClass = [styles.selectContainer];
	if (props.message) selectContainerClass.push(styles.selectContainer_message);
	if (props.noMessage) selectContainerClass.push(styles.selectContainer_noMessage);
	if (props.labelInline) selectContainerClass.push(styles.selectContainer_labelInline);
	if (props.children) selectContainerClass.push(styles.selectContainer_custom);

	const labelClass = [styles.label];
	if (props.labelVisible) labelClass.push(styles.label_visible);
	if (props.labelInline) labelClass.push(styles.label_inline);
	let label = props.label ? (
		<label htmlFor={inputId} className={labelClass.join(' ')}>
			{props.label}
		</label>
	) : null;
	return (
		<div className={selectContainerClass.join(' ')}>
			{props.label && label}
			<div id={props.id} className={styles.selectGroup}>
				<select
					id={inputId}
					disabled={props.disabled ? 'disabled' : null}
					onChange={changeHandler}
					placeholder={props.placeholder}
					className={styles.select}
					value={props.initialValue ? props.initialValue : props.startEmpty ? 'undefined' : ''}
				>
					{
						props.startEmpty ?
							<option value="undefined" disabled={!props.emptySelectable ? 'disabled' : null}>{props.placeholder}</option>
							: null
					}
					{
						props.options && props.options.map(option =>
							<option key={option.value + 'selectKey'} value={option.value}>{t(option.label)}</option>
						)
					}
				</select>
				<label htmlFor={inputId}><FontAwesomeIcon icon={faChevronDown} className={styles.selectArrowIcon} /></label>
			</div>
			{message}
		</div>
	);
};

Select.propTypes = {
	label: PropTypes.string,
	labelVisible: PropTypes.bool,
	labelInline: PropTypes.bool,
	startEmpty: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	options: PropTypes.array.isRequired,
	initialValue: PropTypes.any,
	message: PropTypes.string,
	noMessage: PropTypes.bool,
	change: PropTypes.func,
	children: PropTypes.node,
	emptySelectable: PropTypes.bool
};

export default Select;

export const MONTH_OPTIONS = [
	{ label: 'UI.MONTH.JAN', value: 1 },
	{ label: 'UI.MONTH.FEB', value: 2 },
	{ label: 'UI.MONTH.MAR', value: 3 },
	{ label: 'UI.MONTH.APR', value: 4 },
	{ label: 'UI.MONTH.MAY', value: 5 },
	{ label: 'UI.MONTH.JUN', value: 6 },
	{ label: 'UI.MONTH.JUL', value: 7 },
	{ label: 'UI.MONTH.AUG', value: 8 },
	{ label: 'UI.MONTH.SEP', value: 9 },
	{ label: 'UI.MONTH.OCT', value: 10 },
	{ label: 'UI.MONTH.NOV', value: 11 },
	{ label: 'UI.MONTH.DEC', value: 12 }
];

export const YEAR_OPTIONS = [];

const yearsArr = new Array(200);
const today = new Date().getFullYear();
for (let i = 0; i <= yearsArr.length - 1; i++) {
	const year = today - i;
	YEAR_OPTIONS.push({ label: year, value: year });
}

export const DAYS_OPTIONS = [...new Array(31)].map((item, index) => {
	return { label: index + 1, value: index + 1 };
});

