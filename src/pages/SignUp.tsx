import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { requestCourses, selectCouses } from 'src/store/app/state';
import styled from 'styled-components';
import { FormSignUp } from '../components';

// tslint:disable-next-line:no-empty-interface
interface IProps { }
interface IState {
	open: boolean;
}

class SignUp extends React.PureComponent<IProps & IMapDispatchToProps & IMapStateToProps, IState> {
	public state = {
		open: false,
	};

	public componentDidMount() {
		this.props.requestCourses();
	}

	public handleOpen = () => {
		this.setState({ open: true });
	};

	public handleClose = () => {
		this.setState({ open: false });
	};
	public render() {
		const brainBackground = require("../assets/img/brain-extends.jpg");
		const logo = require("../assets/img/logo-horizontal.png");

		return (
			<SignUpWrap brainBackground={brainBackground}>
				<div id='brainBackground'>
					<img id='brain' src={brainBackground} />
				</div>
				<div>
					<img id='logo' src={logo} />
					<FormSignUp />
				</div>
			</SignUpWrap>
		);
	}
}

// STYLE
const SignUpWrap = styled.div`
	display: flex;
	height: 100%;
	#header{
		display:flex;
		justify-content: space-between;
		align-items: center;
	}
	> div:first-child{
			display: flex;
			align-items: center;
    	justify-content: center;
			position: fixed;
			width:50%;
		> #brain {
			height: 100vh;
			position: relative;
			width: 100%;
		}
	}
	> div:last-child {
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100vh;
			width:100%;
			margin-left: 51%;
			> #logo {
			height: 80px;
			align-self: center;
  	  margin-bottom: 10px;
			margin-top: 10px;

		}
	}

	@media (max-width: 800px), (max-height: 300px){
		#brainBackground{
				display: none;
			}
			&& > div:last-child {
				margin-left: 0;
			}
    }

	@media (max-height: 550px){
		#logo{
			display: none;
		}
	}
	
	@media (max-height: 550px){
		#brainBackground{
				width:400px;
				>img:first-child{
					width:400px;
				}
			}
		> div:last-child {
			margin-left: 400px;
		}
  }
`

interface IMapDispatchToProps {
  requestCourses: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestCourses: () => dispatch(requestCourses.started())
})


interface IMapStateToProps {
  courses: [];
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  courses: selectCouses(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

