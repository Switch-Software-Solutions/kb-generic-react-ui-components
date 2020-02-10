import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberedTitle.module.scss';

import FlexContainer, { FLEX_ALIGN } from '../FlexContainer/FlexContainer';

const NumberedTitle = (props) => {

	let titleElement = <h2 className={styles.headerTitle}>{props.title}</h2>;
	if(props.headingSmall) titleElement = <h4 className={styles.headerTitle + ' ' + styles.headerTitle_small}>{props.title}</h4>;

	return (
		<div className={styles.sectionContainer}>
			<div>
				<FlexContainer align={FLEX_ALIGN.START}>
					<div className={`${props.number === 0 ? styles.invisibleNumber: ''} ${styles.stepIndicator}`}>{props.number}</div>
					{ titleElement }
				</FlexContainer>
			</div>
			{
				props.children ?
					<>
						{props.children}
					</>
					: null
			}
		</div>
	);
};

NumberedTitle.propTypes = {
	children: PropTypes.node,
	number: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	headingSmall: PropTypes.bool,
};

export default NumberedTitle;
