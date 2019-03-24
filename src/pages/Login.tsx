import * as React from 'react';
import styled from 'styled-components';
import { FormLogin } from '../components';

// tslint:disable-next-line:no-empty-interface
interface IProps { }
interface IState {
	open: boolean;
}

class Login extends React.PureComponent<IProps, IState> {
	public state = {
		open: false,
	};

	public handleOpen = () => {
		this.setState({ open: true });
	};

	public handleClose = () => {
		this.setState({ open: false });
	};
	public render() {
		const brainBackground = require("../assets/img/brain-background.jpg");
		const logo = require("../assets/img/logo.png")

		return (
			<LoginWrap brainBackground={brainBackground}>
				<div id='brainBackground'>
					<img id='brain' src={brainBackground} />
				</div>
				<div>
					<img id='logo' src={logo} />
					<FormLogin />
				</div>
			</LoginWrap>
		);
	}
}

// STYLE
const LoginWrap = styled.div`
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
			width:490px;
		> #brain {
			height: 100vh;
			position: relative;
			width:490px;
		}
	}
	> div:last-child {
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100vh;
			width:100%;
			margin-left: 490px;
			> #logo {
			height: 130px;
			width: 130px;
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

	@media (max-height: 650px){
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

export default Login;
