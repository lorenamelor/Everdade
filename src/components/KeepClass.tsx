import { Chip, FormControl, FormHelperText, Input, InputLabel, Select } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Form, Formik, } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { classRegistration, requestStudents, requestUnits, selectIsClassRegistration, selectStudents, selectUnits } from 'src/store/app/class';
import { getUser, requestCourses, selectCourses } from 'src/store/app/state';
import styled from 'styled-components';
import * as Yup from 'yup';
import { unidades } from '../assets/mock'
import { Button, H1 } from '../components'


// validate form
const SignupSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  idCurso: Yup.string().required("Curso é obrigatório"),
  idUnidade: Yup.string().required("Unidade é obrigatório"),
  disciplina: Yup.string().required("Disciplina é obrigatório"),
  alunos: Yup.array().required("Vincular alunos é orbigatário")
});


class KeepJF extends React.Component<IMapDispatchToProps & IMapStateToProps> {
  public componentDidMount() {
    this.props.requestCourses();
     this.props.requestUnits();
     this.props.requestStudents(1);
  }

  public render() {
    const { courses, units, students, isClassRegistration } = this.props;
    console.log(courses, units, students);
    return (
      <Wrap>
        <H1>Cadastrar Turma</H1>
        <Formik
          initialValues={{
            nome: '',
            idCurso: '',
            idUnidade: '',
            idProfessor: getUser('id_usuario'),
            disciplina: '',
            alunos: [],
          }}
          validationSchema={SignupSchema}
          onSubmit={ values => this.props.classRegistration(values) }
        >
          {({ errors, touched, values: { nome, idCurso, idUnidade, disciplina, alunos, idProfessor },
            handleChange, setFieldTouched }) => {
            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };
            return (

              <Form>
                <Card id='card'>
                  <Wrap>
                    <TextField
                      value={nome}
                      id="standard-name"
                      className='input'
                      name='nome'
                      label="Nome"
                      margin="normal"
                      helperText={touched.nome ? errors.nome : ""}
                      error={touched.nome && Boolean(errors.nome)}
                      onChange={change.bind(null, "nome")}
                    />
                    <TextField
                      value={disciplina}
                      id="standard-name"
                      className='input'
                      name='disciplina'
                      label="Disciplina"
                      margin="normal"
                      helperText={touched.disciplina ? errors.disciplina : ""}
                      error={touched.disciplina && Boolean(errors.disciplina)}
                      onChange={change.bind(null, "disciplina")}
                    />

                    < TextField
                      className='input'
                      name='idCurso'
                      select
                      label="Curso"
                      value={idCurso}
                      helperText={touched.idCurso ? errors.idCurso : ""}
                      error={touched.idCurso && Boolean(errors.idCurso)}
                      onChange={change.bind(null, "idCurso")}
                    >
                      {!(courses.length > 0)
                        ? <MenuItem>Selecione um curso</MenuItem>
                        : courses.map((option: { id_curso: string, nome: string }) => (
                          <MenuItem key={option.id_curso} value={option.id_curso}>
                            {option.nome}
                          </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                      value={idUnidade}
                      id="select-class"
                      className='input'
                      name='idUnidade'
                      select
                      label="Unidade"
                      margin="normal"
                      helperText={touched.idUnidade ? errors.idUnidade : ""}
                      error={touched.idUnidade && Boolean(errors.idUnidade)}
                      onChange={change.bind(null, "idUnidade")}
                    >
                      {unidades.map(unidade => (
                        <MenuItem key={unidade.id_unidade} value={unidade.id_unidade}>
                          {unidade.nome}
                        </MenuItem>
                      ))}
                    </TextField>

                    <FormControl className='input-large'
                    >
                      <InputLabel error={touched.alunos && Boolean(errors.alunos)}>Alunos</InputLabel>
                      <Select
                        name='alunos'
                        error={touched.alunos && Boolean(errors.alunos)}
                        onChange={change.bind(null, "alunos")}
                        multiple
                        value={alunos}
                        input={<Input id="select-multiple-chip"

                        />}
                        renderValue={(selected: any) => (
                          <div >
                            {selected!.map((value: any) => (
                              <ChipStudent key={value} label={value} />
                            ))}
                          </div>
                        )}
                      >
                        {[{ id_aluno: '1', nome: 'Lorena' }, { id_aluno: '2', nome: 'Evandro' }].map(name => (
                          <MenuItem key={name.id_aluno} value={name.id_aluno}>
                            {name.nome}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>{touched.alunos ? errors.idCurso : ""}</FormHelperText>
                    </FormControl>
                  </Wrap>
                </Card>
              <ButtonContent>
                <Button type="submit" loading={isClassRegistration}>Salvar</Button>
              </ButtonContent>
              </Form>
        )
      }}
        </Formik>
      </Wrap>
    );
  }
}

// STYLE
const Wrap = styled.div`
  #card{
          padding: 10px;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
  .input{
          margin: 0 5px 15px 5px;
          width:47%;
    @media (max-width: 800px){
          width: 98%;
      }
    }
    .input-large{
          margin: 0 5px 15px 5px;
          width: 95.5%;
    }
  }
  `
const ButtonContent = styled.div`
    flex: 1;
    justify-content: flex-end;
    display: flex;
`
const ChipStudent = styled(Chip)`
  margin: 3px;
`

// REDUX ACTIONS
interface IMapDispatchToProps {
  requestCourses: () => void;
  requestUnits: () => void;
  requestStudents: (idCourse: number) => void;
  classRegistration: (payload: any) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestCourses: () => dispatch(requestCourses.started()),
  requestUnits: () => dispatch(requestUnits.started()),
  requestStudents: (idCourse: number) => dispatch(requestStudents.started(idCourse)),
  classRegistration: (payload) => dispatch(classRegistration.started(payload)),
})

// REDUX STATE
interface IMapStateToProps {
  courses: [];
  units: [];
  students: [];
  isClassRegistration: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  courses: selectCourses(state),
  units: selectUnits(state),
  students: selectStudents(state),
  isClassRegistration: selectIsClassRegistration(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepJF);
