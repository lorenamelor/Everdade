import * as React from 'react';
import styled from 'styled-components';
import { listItems } from '../assets/mock'
import { Button, H1, KeepClass, Modal, NavigationBar, SimpleList } from '../components';
import { Start } from '../pages';


// tslint:disable-next-line:no-empty-interface
interface IProps {

}
interface IState {
  open: boolean;
}

class Home extends React.PureComponent<IProps,IState> {
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
			<HomeWrap brainBackground={brainBackground}>
				<div id='brainBackground'>
					<img id='brain' src={brainBackground} />
					<img id='logo' src={logo} />
				</div>
				<div>
					<NavigationBar />
					<Start />
					<div>
						<div id='header'>
							<H1>Turmas</H1>
							<Button handleClick={this.handleOpen}>CADASTRAR TURMA</Button>
						</div>
						<SimpleList listItems={listItems} />
						<Modal openModal={this.state.open} handleClose={this.handleClose} description={<KeepClass />} width='50%'/>
					</div>
				</div>
			</HomeWrap>
		);
	}
}

const HomeWrap = styled.div`
		display:flex;
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
		> #logo {
			position: absolute;
			height: 150px;
			width: 150px;
		}
	}
	> div:last-child {
			display:flex;
			flex-direction: column;
			width:100%;
			margin-left: 490px;
			> div:last-child {
				padding-left: 25px;
				padding-right: 25px;
			}
	}

	@media (max-width: 1000px), (max-height: 300px){
		#brainBackground{
				display: none;
			}
			&& > div:last-child {
				margin-left: 0;
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
`;

export default Home;