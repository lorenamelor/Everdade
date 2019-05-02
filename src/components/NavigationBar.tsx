import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { selectIsSignOut, signOut } from 'src/store/app/state';
import styled from 'styled-components';

interface IProps {
	max?: boolean;
	returnUrl?: any;
}

class NavigationBar extends React.PureComponent<IProps & IMapDispatchToProps & IMapStateToProps> {
	public render() {
		const { max, returnUrl, signOutSuccess } = this.props;
		if(signOutSuccess){ return <Redirect to='/' /> };
		return (
			<div>
				{max
					?
					<MaxNavigation>
						<div onClick={returnUrl}><img className='return' src={require('../assets/icons/return.png')} /></div>
						<Link to="/home"><img className='logo-top' src={require('../assets/img/logo-top.png')} /></Link>
						<div>
							<img src={require('../assets/icons/user-icon.png')} />
							<img src={require('../assets/icons/signout-icon.png')}  onClick={this.props.signOut}/>
						</div>
					</MaxNavigation>
					:
					<MinNavigation>
						<img src={require('../assets/icons/signout-icon.png')} onClick={this.props.signOut}/>
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

interface IMapStateToProps {
  signOutSuccess: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  signOutSuccess: selectIsSignOut(state),
});

interface IMapDispatchToProps {
  signOut: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  signOut: () => dispatch(signOut.started()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);