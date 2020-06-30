import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './ElementSelectorModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebouncedCallback } from 'use-debounce';
import { faCheckCircle, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

import Input, { INPUT_TYPES } from '../Input/Input';
import Button, { BUTTON_COLOR, BUTTON_STYLE } from '../Button/Button';
import FormatDate from '../FormatDate/FormatDate';
import Modal from '../Modal/Modal';



const ElementSelectorModal = (props) => {
	const { t } = useTranslation();

	const [state, setState] = useState({
		searchText: '',
		elementList: props.elementList || [],
		selectedList: props.selectedList || []
	});

	const [debouncedCallback] = useDebouncedCallback((value) => {
		setState({ ...state, searchText: value.trim().toLowerCase() });
	}, 450);

	const clearSearchHandler = () => setState({ ...state, searchText: '' });

	const isAdded = (checked) => !!state.selectedList.find(el => el.id === checked.id);

	const toggleElement = (element) => {
		if (!isAdded(element)) {
			setState({ ...state, selectedList: [...state.selectedList, element] });
			return;
		}

		// if isAdded, Remove Item
		const copy = Array.from(state.selectedList);
		const index = copy.findIndex(e => e.id === element.id);
		if (index !== -1) {
			copy.splice(index, 1);
			return setState({ ...state, selectedList: copy });
		}
	};



	const filterElements = () => {
		const filterVariable = props.filterBy ? props.filterBy : 'title';
		return props.elementList.filter(el => el[filterVariable].toLowerCase().includes(state.searchText.toLowerCase()));
	};

	return (
		<Modal padding show mobileFull closeModal={() => props.closeHandler(state.selectedList)}>
			<div className="marginBottom_1">
				<h2 className='modalTitle'>{
					props.title ? t(props.title) : t('UI.ELEMENT_MODAL_TITLE')
				}</h2>
			</div>
			<Input
				type={INPUT_TYPES.TEXT}
				autofocus
				placeholder={t('UI.SEARCH')}
				icon={faSearch}
				change={({ target: { value } }) => debouncedCallback(value)}
				clearHandler={clearSearchHandler}
			/>

			{
				props.elementList && props.elementList.length ?
					filterElements()
						.map(el => <div key={el.id}>
							<button className={'unstyledButton ' + styles.elementItemBtn} onClick={() => toggleElement(el)}>
								{
									isAdded(el) ?
										<FontAwesomeIcon icon={faCheckCircle} className={styles.elementItem__selectedIcon} /> :
										<FontAwesomeIcon icon={faCheckCircle} className={styles.elementItem__unselectedIcon} />
								}
								<span className={styles.textElement}>
									{
										el.title ? el.title : <FormatDate date={el.updatedAt} longFormat />
									}
								</span>
							</button>
						</div>
						)
					:
					<p className={styles.listInfoText}>
						<FontAwesomeIcon icon={faInfoCircle} className='marginRight_1' />
						{t('UI.NO_ELEMENTS')}
					</p>
			}

			<div className={styles.addElement}>
				<Button
					color={BUTTON_COLOR.MAIN}
					text="UI.ACCEPT"
					buttonStyle={BUTTON_STYLE.FILL}
					click={() => props.closeHandler(state.selectedList)}
				/>
			</div>

		</Modal>
	);
};

ElementSelectorModal.propTypes = {
	elementList: PropTypes.array.isRequired,
	selectedList: PropTypes.array.isRequired,
	closeHandler: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
};

export default ElementSelectorModal;