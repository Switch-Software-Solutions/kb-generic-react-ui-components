import React from 'react';
import styles from './FlexContainer.module.scss';
import PropTypes from 'prop-types';

const FlexContainer = (props) => {
	// Generic responsive flexbox container. Reference: https://www.w3schools.com/css/css3_flexbox.asp
	//
	// Props //
	//
	// direction		: flex-direction
	// justify     	: justify-content
	// align    		: align-items
	// wrap					: flex-wrap
	//

	const breakpoints = [
		['', props.direction, props.justify, props.align, props.wrap],
		['_XL', props.directionXL, props.justifyXL, props.alignXL, props.wrapXL],
		['_L', props.directionL, props.justifyL, props.alignL, props.wrapL],
		['_M', props.directionM, props.justifyM, props.alignM, props.wrapM],
		['_S', props.directionS, props.justifyS, props.alignS, props.wrapS],
		['_XS', props.directionXS, props.justifyXS, props.alignXS, props.wrapXS]
	];

	const flexClass = [styles.flexContainer];

	breakpoints.forEach(function(breakpointElement) {
		switch (breakpointElement[1]) {
			case FLEX_DIR.COL:
				flexClass.push(styles[`flexContainer_dirCol${breakpointElement[0]}`]);
				break;
			case FLEX_DIR.COL_REVERSE:
				flexClass.push(styles[`flexContainer_dirColRev${breakpointElement[0]}`]);
				break;
			case FLEX_DIR.ROW:
				flexClass.push(styles[`flexContainer_dirRow${breakpointElement[0]}`]);
				break;
			case FLEX_DIR.ROW_REVERSE:
				flexClass.push(styles[`flexContainer_dirRowRev${breakpointElement[0]}`]);
				break;
			default:
				break;
		}
		switch (breakpointElement[2]) {
			case FLEX_JUSTIFY.CENTER:
				flexClass.push(styles[`flexContainer_justCenter${breakpointElement[0]}`]);
				break;
			case FLEX_JUSTIFY.START:
				flexClass.push(styles[`flexContainer_justStart${breakpointElement[0]}`]);
				break;
			case FLEX_JUSTIFY.END:
				flexClass.push(styles[`flexContainer_justEnd${breakpointElement[0]}`]);
				break;
			case FLEX_JUSTIFY.AROUND:
				flexClass.push(styles[`flexContainer_justAround${breakpointElement[0]}`]);
				break;
			case FLEX_JUSTIFY.BETWEEN:
				flexClass.push(styles[`flexContainer_justBetween${breakpointElement[0]}`]);
				break;
			default:
				break;
		}
		switch (breakpointElement[3]) {
			case FLEX_ALIGN.CENTER:
				flexClass.push(styles[`flexContainer_alignCenter${breakpointElement[0]}`]);
				break;
			case FLEX_ALIGN.START:
				flexClass.push(styles[`flexContainer_alignStart${breakpointElement[0]}`]);
				break;
			case FLEX_ALIGN.END:
				flexClass.push(styles[`flexContainer_alignEnd${breakpointElement[0]}`]);
				break;
			default:
				break;
		}
		if (breakpointElement[4]) flexClass.push(styles[`flexContainer_wrap${breakpointElement[0]}`]);
	});

	return <div className={flexClass.join(' ')}>{props.children}</div>;
};

FlexContainer.propTypes = {
	children: PropTypes.node.isRequired,
	direction: PropTypes.string,
	justify: PropTypes.string,
	align: PropTypes.string,
	wrap: PropTypes.bool,

	directionXL: PropTypes.string,
	justifyXL: PropTypes.string,
	alignXL: PropTypes.string,
	wrapXL: PropTypes.bool,
	directionL: PropTypes.string,
	justifyL: PropTypes.string,
	alignL: PropTypes.string,
	wrapL: PropTypes.bool,
	directionM: PropTypes.string,
	justifyM: PropTypes.string,
	alignM: PropTypes.string,
	wrapM: PropTypes.bool,
	directionS: PropTypes.string,
	justifyS: PropTypes.string,
	alignS: PropTypes.string,
	wrapS: PropTypes.bool,
	directionXS: PropTypes.string,
	justifyXS: PropTypes.string,
	alignXS: PropTypes.string,
	wrapXS: PropTypes.bool
};

export default FlexContainer;

export const FLEX_DIR = Object.freeze({
	COL: 'COL',
	COL_REVERSE: 'COL_REVERSE',
	ROW: 'ROW',
	ROW_REVERSE: 'ROW_REVERSE'
});
export const FLEX_JUSTIFY = Object.freeze({
	CENTER: 'CENTER',
	START: 'START',
	END: 'END',
	AROUND: 'AROUND',
	BETWEEN: 'BETWEEN'
});
export const FLEX_ALIGN = Object.freeze({
	CENTER: 'CENTER',
	START: 'START',
	END: 'END'
});
