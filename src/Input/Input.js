import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'date-input-polyfill-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Input.module.scss';

class Input extends Component {

	constructor(props) {
		super(props);
		this.state = { value: props.initialValue ? props.initialValue : '' };
	}

	inputId = Math.random() * 100;
	icon = this.props.icon ? (
		<label htmlFor={this.inputId} className={styles.icon}>
			<FontAwesomeIcon icon={this.props.icon} />
		</label>
	) : null;

	changeHandler = (evt) => {
		this.setState({ value: evt.target.value });
		if (this.props.change) this.props.change(evt);
	};

	clearInputHandler = (evt) => {
		this.inputValue = undefined;
		// if the element has a currentTarget. it gets the first element (the input) and sets its value to null
		if (evt.currentTarget) evt.currentTarget.parentElement.firstElementChild.value = null;
		if (this.props.clearHandler) this.props.clearHandler(evt);
	};

	render() {
		// Set class //
		let inputContainerClass = [styles.inputContainer];
		
		let messageClass = [styles.messageClass];



		if (this.props.message) inputContainerClass.push(styles.inputContainer_message);
		switch (this.props.status) {
			case INPUT_STATUS.INFO:
				messageClass.push(styles.inputMessageGray);
				break;

			default:
				messageClass.push(styles.inputMessage);
				break;
		}


		if (this.props.type === INPUT_TYPES.CHECKBOX) {
			inputContainerClass.push(styles.inputContainer_checkbox);
		}
		switch (this.props.inputStyle) {
			case INPUT_STYLE.HEADER:
				inputContainerClass.push(styles.inputContainer_styleHeader);
				break;
			case INPUT_STYLE.TITLE:
				inputContainerClass.push(styles.inputContainer_styleTitle);
				break;
			case INPUT_STYLE.CONTENT:
				inputContainerClass.push(styles.inputContainer_styleContent);
				break;
			default:
				inputContainerClass.push(this.props.inputStyle);
				break;
		}
		if (this.props.icon) inputContainerClass.push(styles.inputContainer_icon);
		switch (this.props.status) {
			case INPUT_STATUS.DANGER:
				inputContainerClass.push(styles.inputContainer_statusDanger);
				break;
			case INPUT_STATUS.INFO:
				inputContainerClass.push(styles.inputContainer_statusInfo);
				break;
			default:
				break;
		}

		let inputGroupClass = [styles.inputGroupContainer];
		if (this.props.type === INPUT_TYPES.TEXT_AREA) {
			inputGroupClass.push(styles.inputGroup_textarea);
			if(this.props.status === INPUT_STATUS.DANGER) 
				inputGroupClass.push(styles.inputGroup_textareaDanger);
		}

		let labelClass = [styles.label];
		if (this.props.labelVisible) labelClass.push(styles.label_visible);
		if (this.props.labelStyle) labelClass.push(this.props.labelStyle);
		let label = this.props.label ? (
			<label htmlFor={this.inputId} className={labelClass.join(' ')}>
				{this.props.label}
			</label>
		) : null;

		let message = this.props.message ? (
			<div id={this.inputId + '_error'} role='alert' className={messageClass.join(' ')}>
				{this.props.message}
			</div>
		) : null;

		if ( this.props.initialValue !== this.state.value && this.props.initialValue !== undefined && this.props.initialValue !== null) {
			this.setState({ value: this.props.initialValue });
		}

		return (
			<div className={inputContainerClass.join(' ')}>
				{this.props.type !== INPUT_TYPES.CHECKBOX && (label)}
				<div className={inputGroupClass.join(' ')}>
					{this.props.type !== INPUT_TYPES.TEXT_AREA
						?
						<input
							min={this.props.min}
							max={this.props.max}
							maxLength={this.props.maxLength}
							autoFocus={this.props.autofocus}
							type={this.props.type}
							placeholder={this.props.placeholder}
							id={this.inputId}
							className={styles.input}
							onChange={this.changeHandler}
							onBlur={this.props.blur}
							onInput={this.props.input}
							value={this.state.value || ''}
							onKeyUp={this.props.keyUp}
							onFocus={this.props.focus}
							aria-describedby={this.inputId + '_error'}
							disabled={this.props.disabled ? 'disabled' : null}
							checked={(this.props.type === INPUT_TYPES.CHECKBOX) && this.props.checked}
						/>
						:
						<textarea
							placeholder={this.props.placeholder}
							id={this.inputId}
							autoFocus={this.props.autofocus}
							onChange={this.changeHandler}
							onBlur={this.props.blur}
							value={this.state.value || ''}
							onKeyUp={this.props.keyUp}
							onFocus={this.props.focus}
							aria-describedby={this.inputId + '_error'}
							disabled={this.props.disabled ? 'disabled' : null}
							rows={this.props.areaRows || 4}
							maxLength={this.props.maxLength || 1000}
						/>
					}
					{this.props.type === INPUT_TYPES.CHECKBOX && (label)}
					{this.icon}
					{
						this.props.clearHandler && this.inputValue ? (
							<button className={'unstyledButton ' + styles.rightIcon} onClick={this.clearInputHandler} title='Clear' aria-label='Clear'>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						)
							: null
					}
				</div>
				{message}
			</div>
		);
	}
}

Input.propTypes = {
	label: PropTypes.string,
	labelStyle: PropTypes.string,
	labelVisible: PropTypes.bool,
	placeholder: PropTypes.string,
	icon: PropTypes.any,
	type: PropTypes.string.isRequired,
	inputStyle: PropTypes.string,
	inputID: PropTypes.string,
	change: PropTypes.func,
	keyUp: PropTypes.func,
	focus: PropTypes.func,
	autofocus: PropTypes.bool,
	blur: PropTypes.func,
	clearHandler: PropTypes.func,
	disabled: PropTypes.bool,
	initialValue: PropTypes.string,
	message: PropTypes.string,
	status: PropTypes.string,
	maxLength: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	areaRows: PropTypes.number,
	checked: PropTypes.bool,
	input: PropTypes.func
};

export default Input;

export const INPUT_TYPES = Object.freeze({
	TEXT: 'text',
	NUMBER: 'number',
	EMAIL: 'email',
	TEL: 'tel',
	PASSWORD: 'password',
	SEARCH: 'search',
	CHECKBOX: 'checkbox',
	TEXT_AREA: 'text_area', 
	DATE: 'date',
	RANGE: 'range'
});
export const INPUT_STATUS = Object.freeze({
	DANGER: 'danger',
	INFO: 'info'
});
export const INPUT_STYLE =  Object.freeze({
	HEADER: 'header',
	TITLE: 'title',
	CONTENT: 'content',
	OTHER: 'other'
});