import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Backdrop from './Backdrop';

storiesOf('Backdrop', module)

	.add('with clicked action', () => (
		<Backdrop show clicked={action('clicked')}> Children </Backdrop>
	));