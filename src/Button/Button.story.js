import React from 'react'
import i18n from '../assets/i18n/config';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { BUTTON_COLOR, BUTTON_STYLE } from './Button';

storiesOf('Button', module)

	.add('with clicked action', () => (
		<>
		<Button
			text={'Button Text'}
			click={action('Clicked')}
			color={BUTTON_COLOR.MAIN}
			buttonStyle={BUTTON_STYLE.FILL}
		/>
			<Button
				text={'Button Text'}
				click={action('Clicked')}
				color={BUTTON_COLOR.GREY}
				buttonStyle={BUTTON_STYLE.FILL}
			/>
		</>
	))
	.add('with gray coloraction', () => (
		<Button
			text={'Button Text'}
			click={action('Clicked')}
			color={BUTTON_COLOR.GREY}
			buttonStyle={BUTTON_STYLE.FILL}
		/>
	))
