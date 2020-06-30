import React, { Component } from 'react';
import styles from './Toast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import FlexContainer, { FLEX_ALIGN } from '../FlexContainer/FlexContainer';
import {ANIMATIONS_DURATION} from "../config";

class Toast extends Component {

	constructor(props) {
		super(props);
		this.state = { show: false };
		this.handleClose = this.handleClose.bind(this);
	}


	handleClose = () => {
		this.setState({ show: !this.state.show });
		setTimeout(() => {
			this.props.click();
		}, 300);
	};

	render() {
		setTimeout(() => { if (this.props.click && !this.state.show) this.handleClose(); }, 4300);

		// Set class //
		const toastClass = [styles.toast, styles.slideOut];
		if (this.state.show) {
			toastClass.push(styles.hideToast)
		}

		switch (this.props.color) {
			case TOAST_COLOR.MAIN:
				toastClass.push(styles.toast_colorMain);
				break;
			case TOAST_COLOR.GREY:
				toastClass.push(styles.toast_colorGrey);
				break;
			case TOAST_COLOR.INFO:
				toastClass.push(styles.toast_colorInfo);
				break;
			case TOAST_COLOR.WARNING:
				toastClass.push(styles.toast_colorWarning);
				break;
			case TOAST_COLOR.DANGER:
				toastClass.push(styles.toast_colorDanger);
				break;
			default:
				toastClass.push(styles.toast_colorDanger);
				break;
		}

		return (
			<Fade duration={ANIMATIONS_DURATION.REGULAR}   right>
				<div
					role='alert'
					className={`${toastClass.join(' ')}`}
					onClick={this.handleClose}
				>
					<FlexContainer align={FLEX_ALIGN.CENTER}>
						{ this.props.icon ?
							this.props.iconSpin ?
								<FontAwesomeIcon icon={this.props.icon} spin className={styles.toast__icon} />
								:
								<FontAwesomeIcon icon={this.props.icon} className={styles.toast__icon} />
							: null
						}
						<div className={styles.toast__content}>{this.props.children}</div>
					</FlexContainer>
				</div>
			</Fade>
		);
	}
}

Toast.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
	click: PropTypes.func,
	icon: PropTypes.any,
	iconSpin: PropTypes.bool
};

export default Toast;

export const TOAST_COLOR = Object.freeze({
	MAIN: 'MAIN',
	GREY: 'GREY',
	INFO: 'INFO',
	WARNING: 'WARNING',
	DANGER: 'DANGER'
});
