import React, { Component } from 'react';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';

import { ANIMATIONS_DURATION } from '@timeswan/core';

import Card, { CARD_PADDING } from '../Card/Card';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({ show: !this.state.show });
		setTimeout(() => {
			this.props.closeModal();
		}, 300);
	}

	handleEsc({ keyCode }) {
		// 27 is the keyCode for Escape key
		if (keyCode === 27)
			this.modalScope.handleClick();
	}

	componentDidMount() {
		document.body.style.overflow = 'hidden';
		if (!this.props.nonCloseable) {
			window.addEventListener('keyup', this.handleEsc);
			window.modalScope = this;
		}
	}

	componentWillUnmount() {
		document.body.style.overflow = 'unset';
		if (!this.props.nonCloseable) {
			window.removeEventListener('keyup', this.handleEsc);
			window.modalScope = undefined;
		}
	}

	render() {
		return (
			<>

				<Backdrop nonCloseable={this.props.nonCloseable} show={this.props.show} clicked={this.handleClick}>
					<div className={`${styles.fadeOut}  ${this.state.show ? 'invisible' : ''}`}>
						<div className={styles.modalBkgScroll}>
							<Fade duration={ANIMATIONS_DURATION.REGULAR}>
								<div className={styles.modalBkgSize}>
									<div className={styles.modal}>
										<Card padding={this.props.padding ? CARD_PADDING.BIG : CARD_PADDING.NONE}>
											{!this.props.nonCloseable ? <button
												type='button'
												title='Close'
												className={styles.modal__closeBtn}
												onClick={this.handleClick}
											>
												<FontAwesomeIcon icon={faTimes} />
											</button> : null}
											{this.props.children}
										</Card>
									</div>
								</div>
							</Fade>
						</div>
					</div>

				</Backdrop>
			</>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.node,
	show: PropTypes.bool,
	closeModal: PropTypes.func,
	nonCloseable: PropTypes.bool,
	padding: PropTypes.bool
};

export default Modal;
