import React from 'react';
import styles from './Backdrop.module.scss';
import PropTypes from 'prop-types';

const Backdrop = (props) => {

	const isBackdropClicked = (className) => 
		(className.baseVal === undefined && (className.indexOf !== undefined && className.indexOf('Backdrop') > -1))
	|| (className && className.indexOf !== undefined && className.indexOf('Modal_modal') === 0);

	const clickHandler = ({ target: { className } }) => {
		if (
			!props.nonCloseable && isBackdropClicked(className) && props.clicked
		) props.clicked();
	};

	return (
		<>
			{props.show ? (
				<div className={styles.Backdrop} onMouseDown={clickHandler}>
					{props.children}
				</div>
			) : null}
		</>
	);
};
Backdrop.propTypes = {
	show: PropTypes.bool.isRequired,
	clicked: PropTypes.func,
	children: PropTypes.node.isRequired,
	nonCloseable: PropTypes.bool
};

export default Backdrop;
