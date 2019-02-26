import * as React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
	height: 60px;
	width: 60%;
	background: #0C534D;
	display:flex;
	flex-direction: row-reverse;
	align-items: center;
	padding-right: 5px;

	> img {
		width: 26px;
		height: 28px;
		margin-right: 10px;
		cursor: pointer;
	}
`

class NavigationBar extends React.PureComponent {
	public render() {
		return (
			<Wrap>
				<img src={require('../../assets/icons/signout-icon.png')} />
				<img src={require('../../assets/icons/user-icon.png')} />
			</Wrap>
		);
	}
}

export default NavigationBar;