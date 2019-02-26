import * as React from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../../components';

const HomeWrap = styled.div`
		display:flex;
		height: 100%;
	> img {
		width: 40%;
		height: 100vh;
	}
`;


class Home extends React.PureComponent {
	public render() {
		const brainBackground = require("../../assets/img/brain-background.jpg");

		return (
			<HomeWrap brainBackground={brainBackground}>
				<img src={brainBackground} />
				<NavigationBar />
			</HomeWrap>
		);
	}
}



export default Home;
