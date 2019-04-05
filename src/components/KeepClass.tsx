// import { InputAdornment } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { requestUnits, selectUnits } from 'src/store/app/class';
import { requestCourses, selectCourses } from 'src/store/app/state';
import styled from 'styled-components';
import { unidades } from '../assets/mock'
import { Button, H1 } from '../components'

class KeepJF extends React.Component<IMapDispatchToProps & IMapStateToProps> {
  public componentDidMount() {
    this.props.requestCourses();
    this.props.requestUnits();
  }

  public render() {
    const { courses, units } = this.props;
    console.log(courses, units);
    return (
      <Wrap>
        <div>
          <H1>Cadastrar Turma</H1>
          <Card id='card'>
            <TextField
              id="standard-name"
              className='input'
              label="Disciplina"
              margin="normal"
            />

            {/* < TextField
              className='input'
              name='idCurso'
              select
              label="Curso"
              value={idCurso}
              helperText={touched.idCurso ? errors.idCurso : ""}
              error={touched.idCurso && Boolean(errors.idCurso)}
              onChange={change.bind(null, "idCurso")}
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <img src={require('../assets/icons/course.png')} />
                  </InputAdornment>,
              }}
            >
              {!(courses.length > 0)
                ? <MenuItem>Selecione um curso</MenuItem>
                : courses.map((option: { id_curso: string, nome: string }) => (
                  <MenuItem key={option.id_curso} value={option.id_curso}>
                    {option.nome}
                  </MenuItem>
                ))}
            </TextField> */}

            <TextField
              id="select-class"
              className='input'
              select
              label="Unidade"
              margin="normal"
            >
              {unidades.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="select-class"
              className='input-max'
              select
              label="Alunos"
              margin="normal"
            >
              {['Maria Beatriz', 'João Miguel'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Card>
        </div>
        <Button>Salvar</Button>
      </Wrap>
    );
  }
}

// STYLE
const Wrap = styled.div`
  >Button{
    float: right;
  }
  #card{    
    padding:10px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  .input{
    margin: 0 5px 15px 5px;
    width:47%;
    @media (max-width: 800px){
      width:98%;
    }
  }
  .input-max{
    margin: 0 5px 15px 5px;
    width: 98%; 
  } 
}
`


// REDUX ACTIONS
interface IMapDispatchToProps {
  requestCourses: () => void;
  requestUnits: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestCourses: () => dispatch(requestCourses.started()),
  requestUnits: () => dispatch(requestUnits.started()),
})

// REDUX STATE
interface IMapStateToProps {
  courses: [];
  units: [];
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  courses: selectCourses(state),
  units: selectUnits(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepJF);
