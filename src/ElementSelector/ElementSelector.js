import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './ElementSelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebouncedCallback } from 'use-debounce';
import { faCheckCircle, faInfoCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import Input, { INPUT_TYPES } from '../Input/Input';
import Button, { BUTTON_COLOR, BUTTON_STYLE, BUTTON_SIZE, BUTTON_ICON_POS } from '../Button/Button';


const ElementSelector = ({
	elementList,
	selectedList,
	updateItemCallBack,
	filterBy,
	searchPlaceholder,
	disableRemove,
	hideSelectors,
	displayAddedPills,
	drawElement,
	focus }) => {

	const { t } = useTranslation();

	const [state, setState] = useState({
		searchText: '',
		elementList: elementList || [],
		selectedList: selectedList || [],
		originalList: selectedList || []
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

	// Update parent on each rereander
	updateItemCallBack(state.selectedList);


	const filterElements = () => {
		const filterVariable = filterBy ? filterBy : ['title'];
		return elementList.filter(el => {
			for (let key of Object.keys(el)) {
				if (filterVariable.includes(key)) {
					const shouldBeFiltered = el[key]?.toLowerCase().includes(state.searchText.toLowerCase());
					if (shouldBeFiltered)
						return shouldBeFiltered;
				}
			}
		});
	};

	const resolveTagText = (e) => {
		const tagVariable = filterBy ? filterBy : 'title';
		return e[tagVariable];
	};

	const drawNewAddedsPills = () => {
		let newAdded = [];
		const isAPreviouslySelected = (checked) => !!state.originalList.find(el => el.id === checked.id);
		state.selectedList.forEach(e => { if (!isAPreviouslySelected(e)) newAdded.push(e); });
		return (
			<>
				{
					// New Selected's items chips
					newAdded && newAdded.length ?
						<div>
							<h3 className='srOnly'>{t('UI.SELECTED_ELEMENTS')}</h3>
							<ul className={styles.selectedElementsList}>
								{
									newAdded.map(e =>
										<li className={styles.selectedElementsListItem} key={e.id}>
											<Button
												buttonStyle={BUTTON_STYLE.FILL}
												color={BUTTON_COLOR.MAIN} size={BUTTON_SIZE.TINY}
												click={() => { toggleElement(e); }}
												text={resolveTagText(e)}
												title={t('UI.REMOVE_ELEMENT')}
												icon={faTimes} iconPos={BUTTON_ICON_POS.RIGHT}
											/>
										</li>
									)
								}
							</ul>
						</div>
						: null
				}
			</>
		);
	};

	const elementItem__selectedIcon = [styles.elementItem__selectedIcon, 'marginAuto'];
	const elementItem__unselectedIcon = [styles.elementItem__unselectedIcon, 'marginAuto'];

	const resolveSearchPlaceHolder = () => searchPlaceholder ? searchPlaceholder : t('UI.SEARCH');
	return (
		<>
			{displayAddedPills ? drawNewAddedsPills() : null}
			<Input
				type={INPUT_TYPES.TEXT}
				autofocus={focus}
				placeholder={resolveSearchPlaceHolder()}
				icon={faSearch}
				change={({ target: { value } }) => debouncedCallback(value)}
				clearHandler={clearSearchHandler}
				style={{ marginBottom: '1rem' }}
			/>
			<div>
				<h3 className='srOnly'>{t('UI.SEARCH_RESULTS')}</h3>
				<ul className={styles.elementsList + ' customScrollbar'}>
					{
						elementList && elementList.length ?
							filterElements()
								.map(el =>
									<li key={el.id} className={styles.elementItem}>
										<button
											disabled={disableRemove ? disableRemove(el) : null}
											className={styles.elementItem__btn + ' unstyledButton'}
											onClick={() => toggleElement(el)}
										>
											{
												drawElement ? drawElement(el)
													: 'Draw element function not defined.' +
													' insert function to be called ir order to list these elements'
											}
											{
												!hideSelectors ?
													isAdded(el) ?
														<FontAwesomeIcon icon={faCheckCircle} className={elementItem__selectedIcon.join(' ')} />
														: <FontAwesomeIcon icon={faCheckCircle} className={elementItem__unselectedIcon.join(' ')} />
													: null
											}
										</button>
									</li>
								)
							:
							<li className={styles.elementsList__infoText}>
								<FontAwesomeIcon icon={faInfoCircle} className='marginRight_1' />
								{t('UI.NO_ELEMENTS')}
							</li>
					}
				</ul>
			</div>
		</>
	);
};

ElementSelector.propTypes = {
	drawElement: PropTypes.func.isRequired,
	elementList: PropTypes.array.isRequired,
	selectedList: PropTypes.array.isRequired,
	updateItemCallBack: PropTypes.func.isRequired,
	filterBy: PropTypes.array,
	searchPlaceholder: PropTypes.string,
	disableRemove: PropTypes.func,
	hideSelectors: PropTypes.bool,
	displayAddedPills: PropTypes.bool,
	focus: PropTypes.bool
};

export default ElementSelector;