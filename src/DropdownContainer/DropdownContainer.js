import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownContainer.module.scss';
import Fade from 'react-reveal/Fade';

import { ANIMATIONS_DURATION } from '../config';
import Dropdown, { DROPDOWN_BORDER } from '../Dropdown/Dropdown';

const DropdownContainer = (props) => {
	const [dropdownState, setDropdownState] = useState(false);

	const dropdownRef = useRef();
	const dropdownMenuRef = useRef();

	const dropDownButtonStyle = ['unstyledButton'];
	if (props.buttonClassName) dropDownButtonStyle.push(props.buttonClassName);

	const dropdownCont = [styles.dropdownCont];
	if (props.containerClassName) dropdownCont.push(props.containerClassName);

	const clickHandler = () => {
		if (!dropdownState) {
			setDropdownState(true);
			window.addEventListener('click', blurHandler);
		}
		else {
			setDropdownState(false);
			window.removeEventListener('click', blurHandler);
		}
	};

	const blurHandler = (event, force) => {
		if (dropdownMenuRef.current) {
			if (force || !dropdownRef.current.contains(event.target)) {
				window.removeEventListener('click', blurHandler);
				setDropdownState(false);
			}
		} else {
			// Menu is open and the blur its still being called. Clear the event listener.
			window.removeEventListener('click', blurHandler);
		}
	};

	// If component is re rendered and the menu is displayed. Focus on the button.
	if (dropdownRef.current && dropdownState) {
		dropdownRef.current.focus();
	}

	return (
		<div className={dropdownCont.join(' ')}>
			<button
				type='button'
				className={dropDownButtonStyle.join(' ')}
				onClick={clickHandler}
				ref={dropdownRef}
				aria-haspopup='true'
				aria-owns={props.dropdownID}
				aria-label={props.buttonLabel}
				title={props.buttonLabel}
				id='createStoryPrivacy'
			>
				{props.buttonContent}
			</button>
			{
				dropdownState ?
					(
						<div ref={dropdownMenuRef}>
							<Dropdown
								menuID={props.dropdownID}
								border={DROPDOWN_BORDER.FULL}
								top={props.top}
								left={props.left}
								bottom={props.bottom}
								right={props.right}
							>
								<Fade duration={ANIMATIONS_DURATION.MEDIUM}>
									{props.children}
								</Fade>
							</Dropdown>
						</div>
					) : null
			}
		</div>
	);
};

DropdownContainer.propTypes = {
	dropdownID: PropTypes.string,
	children: PropTypes.node.isRequired,
	buttonContent: PropTypes.node.isRequired,
	buttonLabel: PropTypes.string,
	buttonClassName: PropTypes.string,
	containerClassName: PropTypes.string,
	top: PropTypes.string,
	left: PropTypes.string,
	bottom: PropTypes.string,
	right: PropTypes.string
};

export default DropdownContainer;
