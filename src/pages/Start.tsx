import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { loginType, selectLoginType } from '../store/app/state'



class Home extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {
  public render() {
const { login } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '170px', marginTop:10, marginLeft:10 }}>
        <input onChange={()=>({})} onClick={this.handleLoginType('aluno')} checked={login ==='aluno'} type="radio" name='login' /> Aluno
        <input onChange={()=>({})} onClick={this.handleLoginType('professor')} checked={login ==='professor'} type="radio" name='login' /> Professor
      </div>

    );
  }

  public handleLoginType = (type: 'professor' | 'aluno' | null) => () => {
    this.props.loginType(type);
  };
}

interface IMapDispatchToProps {
  loginType: (type: 'professor' | 'aluno' | null) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  loginType: (type) => dispatch(loginType(type))
})


interface IMapStateToProps {
  login: 'professor' | 'aluno' | null;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  login: selectLoginType(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
