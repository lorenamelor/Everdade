import * as React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

interface IProps {
	max?: boolean;
	returnUrl?: string;
}

class NavigationBar extends React.PureComponent<IProps> {
	public render() {
		const { max, returnUrl } = this.props;

		return (
			<div>
				{max
					?
					<MaxNavigation>
						<Link to={returnUrl!}><img className='return' src={require('../assets/icons/return.png')} /></Link>
						<Link to="/home"><img className='logo-top' src={require('../assets/img/logo-top.png')} /></Link>
						<div>
							<img src={require('../assets/icons/user-icon.png')} />
							<img src={require('../assets/icons/signout-icon.png')} />
						</div>
					</MaxNavigation>
					:
					<MinNavigation>
						<img src={require('../assets/icons/signout-icon.png')} />
						<img src={require('../assets/icons/user-icon.png')} />
					</MinNavigation>
				}
			</div>
		);
	}
}

// STYLE
const MinNavigation = styled.div`
	height: 60px;
	width: 100%;
	background: #0C534D;
	display:flex;
	flex-direction: row-reverse;
	align-items: center;
	 img {
		width: 26px;
		height: 28px;
		margin-right: 10px;
		cursor: pointer;
	}
`

const MaxNavigation = styled.div`
	height: 60px;
	width: 100%;
	background: #0C534D;
	display:flex;
	align-items: center;
	justify-content: space-between;
	img {
		width: 26px;
		height: 28px;
		margin-right: 10px;
		cursor: pointer;
	}
	.return{
		margin-left: 10px;
	}
	.logo-top{
		width: auto;
		height: 50px;
		margin-top: 5px;
	}
`

export default NavigationBar;