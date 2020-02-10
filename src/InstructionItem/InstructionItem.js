import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from './InstructionItem.module.scss';

export const InstructionItem = (props) => {
 
	return (
		<>
			<div className={styles.instructionsItem}>
				{props.icon ?
					<div className={styles.instructionsIcon}>
						<div className={styles.innerInstructionsIcon}>
							<FontAwesomeIcon icon={props.icon} />
						</div>
					</div> : null}
				<div>
					<h2 className={styles.instructionsTitle}>
						{
							props.titleBold 
								? (<span className='fontBold'> {props.title} </span>)
								:	props.title
						}
					</h2>
					<p> {props.text}
						{props.link ?
							<button 
								onClick={props.callback ? props.callback : null}
								className={'unstyledButton ' + styles.linkButton}>{` ${props.link}`}</button> : null}
					</p>
				</div>
			</div>
		</>
	);
};

InstructionItem.propTypes = {
	
	icon: PropTypes.any,
	titleBold: PropTypes.bool,
	title: PropTypes.string.isRequired,
	text: PropTypes.any.isRequired,
	callback: PropTypes.func,
	link: PropTypes.string
};


export default InstructionItem;