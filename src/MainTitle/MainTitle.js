import React from 'react'; 
import styles from './MainTitle.module.scss';
import PropTypes from 'prop-types';
import ProfileImage from '../ProfileImage/ProfileImage';

const MainTitle = (props) => { 

	let titleContClass = [styles.titleCont];
	if (props.line) titleContClass.push(styles.titleCont_line);
	if (props.lineDark) titleContClass.push(styles.titleCont_lineDark);
	if (props.fontNormal) titleContClass.push(styles.titleCont_fontNormal);
	if (props.noJustify) titleContClass.push(styles.titleCont_noJustify);


	let headingElement;
	switch (props.heading) {
		case TITLE_HEADING.H1:
			headingElement = <h1 className={styles.titleCont__title}>{props.title} </h1>;
			break;
		case TITLE_HEADING.H2:
			headingElement = <h2 className={styles.titleCont__title}>{props.title} </h2>;
			break;
		case TITLE_HEADING.H3:
			headingElement = <h3 className={styles.titleCont__title}>{props.title} </h3>;
			break;
		case TITLE_HEADING.H4:
			headingElement = <h4 className={styles.titleCont__title}>{props.title} </h4>;
			break;
		case TITLE_HEADING.H5:
			headingElement = <h5 className={styles.titleCont__title}>{props.title} </h5>;
			break;
		case TITLE_HEADING.H6:
			headingElement = <h6 className={styles.titleCont__title}>{props.title} </h6>;
			break;
		default:
			break;
	}

	return (
		<div className={titleContClass.join(' ')}>
			<div className={styles.titleCont__titleCont}>
				{props.profilePhoto || props.profilePic ?
					<ProfileImage
						path={props.profilePic}
						profile={props.profilePhoto}
						styles={styles.profilePic}
					/> : null } 
				{headingElement}
				{props.afterTitleContent}
			</div>
			<div className={styles.titleCont__childrenCont}>{props.children}</div>
		</div>
	);
};

MainTitle.propTypes = {
	children: PropTypes.node,
	title: PropTypes.any.isRequired,
	fontNormal: PropTypes.bool,
	heading: PropTypes.string.isRequired,
	line: PropTypes.bool,
	lineDark: PropTypes.bool,
	noJustify: PropTypes.bool,
	profilePhoto: PropTypes.object,
	profilePic: PropTypes.string,
	afterTitleContent: PropTypes.object
};

export default MainTitle;

export const TITLE_HEADING =  Object.freeze({
	H1: 'h1',
	H2: 'h2',
	H3: 'h3',
	H4: 'h4',
	H5: 'h5',
	H6: 'h6'
});
