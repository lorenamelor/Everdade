import * as React from 'react';
import styled from 'styled-components';
import { listItems } from '../assets/mock'
import { H1, NavigationBar, SimpleList } from '../components';

const HomeWrap = styled.div`
		display:flex;
		height: 100%;
	> div{
		> img:first-child {
			height: 100vh;
		}
		> img:last-child {
			height: 100px;
			width:100px;
		}
	}
	> div:last-child {
			display:flex;
			flex-direction: column;
			width:100%;
			> div:last-child {
				padding-left: 25px;
				padding-right: 25px;
			}
	}

	@media (max-width: 900px){
			> img{
				display: none;
			}
    }
`;

class Home extends React.PureComponent {

	public render() {
		const brainBackground = require("../assets/img/brain-background.jpg");
		// const logo = require("../../assets/img/logo.png")

		return (
			<HomeWrap brainBackground={brainBackground}>
				<div>
					<img src={brainBackground} />
					<img src='' />
				</div>
				<div>
					<NavigationBar />
					<div>
						<H1>Turmas</H1>
						<SimpleList listItems={listItems} />
					</div>
				</div>
			</HomeWrap>
		);
	}
}



export default Home;
