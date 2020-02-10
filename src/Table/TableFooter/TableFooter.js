import React from 'react';
import styles from './TableFooter.module.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const TableFooter = (props) => {
	const { t } = useTranslation();

	const currPage = props.pageOffset / props.pageSize;
	const totalPages = Math.ceil(props.totalCount / props.pageSize);

	const pagesArr = [];
	for (let i = 0; i < Math.ceil(props.totalCount / props.pageSize); i++) {
		pagesArr.push(i);
	}

	const isFirstPage = () => {
		return currPage === 0;
	};

	const isLastPage = () => {
		return props.totalCount === 0 ? currPage === totalPages : currPage + 1 === totalPages;
	};

	const classNameResolver = (page) => {
		const result = [styles.tablePagination__btn];
		if (page === currPage) result.push(styles.active);

		return result.join(' ');
	};

	return (
		<div className={styles.tableFooter}>
			<p className={styles.tableResults}>
				{props.totalCount === 0 ? null : props.pageOffset + 1}{props.totalCount === 0 ? null : '-'}
				{props.pageOffset + props.pageSize > props.totalCount
					? props.totalCount
					: props.pageOffset + props.pageSize}{' '}
				{t('ADMIN_USERS.OF')} {props.totalCount} {t('ADMIN_USERS.RESULTS')}
			</p>
			<div className={styles.tablePagination}>
				<button
					key={'prev-all'}
					type='button'
					className={[styles.tablePagination__btn, styles.btnNavigate].join(' ')}
					disabled={isFirstPage()}
					onClick={props.changePage}
					value={0}
				>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</button>
				<button
					key={'prev-1'}
					type='button'
					className={[styles.tablePagination__btn, styles.btnNavigate].join(' ')}
					disabled={isFirstPage()}
					onClick={props.changePage}
					value={props.pageOffset - props.pageSize}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				{pagesArr
					.filter((page) => {
						if (currPage < 3) {
							return page < 5;
						}
						if (currPage >= totalPages - 3) {
							return page >= totalPages - 5;
						}
						return page >= currPage - 2 && page <= currPage + 2;
					})
					.map((page) => (
						<button
							key={'ftr-' + page}
							type='button'
							className={classNameResolver(page)}
							onClick={props.changePage}
							value={page * props.pageSize}
						>
							{page + 1}
						</button>
					))}
				<button
					key={'next-1'}
					type='button'
					className={[styles.tablePagination__btn, styles.btnNavigate].join(' ')}
					disabled={isLastPage()}
					onClick={props.changePage}
					value={props.pageOffset + props.pageSize}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
				<button
					key={'next-all'}
					type='button'
					className={[styles.tablePagination__btn, styles.btnNavigate].join(' ')}
					disabled={isLastPage()}
					onClick={props.changePage}
					value={props.pageSize * (Math.ceil(props.totalCount / props.pageSize) - 1)}
				>
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</button>
			</div>
		</div>
	);
};

TableFooter.propTypes = {
	changePage: PropTypes.func,
	totalCount: PropTypes.number,
	pageSize: PropTypes.number.isRequired,
	pageOffset: PropTypes.number.isRequired
};
export default TableFooter;
