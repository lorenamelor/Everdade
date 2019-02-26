import * as React from 'react';
import styled from 'styled-components';
import { ExampleComponent } from '../../components';

const HomeWrap = styled.div`
		display:flex;
		height: 100%;
	> img {
		width: 45%;
		height: 100vh;
		/* background-image: url(${(props: any) => props.brainBackground}); */
		/* background: red; */
	}
`;


class Home extends React.PureComponent {
	public render() {
		const brainBackground = require("../../assets/img/brain-background.jpg");

		return (
			<HomeWrap brainBackground={brainBackground}>
				<img src={brainBackground}/>
				<ExampleComponent />
			</HomeWrap>
		);
	}
}



export default Home;
