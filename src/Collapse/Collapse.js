import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';

import styles from './Collapse.module.scss';
import { ANIMATIONS_DURATION } from '@timeswan/core';

import Card, { CARD_PADDING } from '../Card/Card';

const Collapse = (props) => {

	// Set class
	const collapseClass = [styles.collapse];
	if(props.active) collapseClass.push(styles.collapseActive);

	return (
		<div className={collapseClass.join(' ')}>
			<button onClick={() => props.response(props.index)}  className={'unstyledButton sweetFocus fullWidth'}>
				<div className={styles.collapseBtn}>
					<span className={styles.collapseBtn_arrow}>
						<FontAwesomeIcon icon={faChevronDown} />
					</span>
					{props.title}
				</div>
			</button>
			{props.active ? 
				<div className={'marginBottom_1'}>
					<Fade duration={ANIMATIONS_DURATION.SLOWER}>
						<Card padding={CARD_PADDING.BIG} noShadow outline>
							{props.children}
						</Card>
					</Fade> </div>: null} 
		</div>
	);
};

Collapse.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
	title: PropTypes.string
};

export default Collapse;
