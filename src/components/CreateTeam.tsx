import {
  Card, Chip, FormControl, FormHelperText, Input,
  InputLabel, MenuItem, Select
} from '@material-ui/core';
import { Form, Formik, } from 'formik';
import { filter } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { getUser } from 'src/store/app/state';
import { requestStudentsForTeam, selectStudentsList, teamRegistration } from 'src/store/app/team';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button, H1 } from '../components'


interface IProps {
  idJf: number | string;
  idClass: number | string;
  closeModal: any;
}
class CreateTeam extends React.Component<IMapDispatchToProps & IMapStateToProps & IProps> {

  public componentDidMount() {
    const { idClass, idJf } = this.props;
    this.props.requestStudentsForTeam(idClass, idJf);
  }

  public render() {
    const { studentsList, closeModal, idJf, idClass } = this.props;
    console.log('studentsList', studentsList)

    const validationSchema = Yup.object().shape({
      alunos: Yup.array().required("Vincular alunos é orbigatário")
    });



    return (
      <Wrap>
        <div>
          <H1>Criar Equipe</H1>
          <Card id='card'>
            <Formik
              initialValues={{ alunos: [] }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={values => {
                const payload = {idJf, idUser: getUser('id_usuario'), alunos: values.alunos, idTurma: idClass }
                this.props.teamRegistration(payload)
                closeModal()
              }}
            >
              {({ errors, touched, values: { alunos },
                handleChange, setFieldTouched }) => {

                const change = (nameInput: any, e: any) => {
                  e.persist();
                  handleChange(e);
                  setFieldTouched(nameInput, true, false);
                };

                return (
                  <Form>
                    <FormControl className='input'
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
                            {
                              selected!.map((value: any) => (
                                <ChipStudent key={value} label={
                                  filter(studentsList, (aluno) => aluno.id_aluno === value).length > 0 &&
                                  filter(studentsList, (aluno) => aluno.id_aluno === value)[0].nome} />
                              ))}
                          </div>
                        )}
                      >
                        {!(studentsList.length > 0)
                          ? <MenuItem>Não há alunos neste curso</MenuItem>
                          : studentsList.map((aluno: any) => (
                            <MenuItem key={aluno.id_aluno} value={aluno.id_aluno}>
                              {aluno.nome}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText error>{touched.alunos ? errors.alunos : ""}</FormHelperText>
                    </FormControl>
                    <ButtonContent>
                      <Button type="submit">Salvar</Button>
                    </ButtonContent>
                  </Form>
                )
              }}
            </Formik>
          </Card>
        </div>
      </Wrap>
    );
  }
}


interface IMapStateToProps {
  studentsList: any;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  studentsList: selectStudentsList(state),
});


interface IMapDispatchToProps {
  requestStudentsForTeam: (idClass: number | string, idJf: number | string) => void;
  teamRegistration: (payload: any) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestStudentsForTeam: (idClass: number | string, idJf: number | string) => dispatch(requestStudentsForTeam.started({ idClass, idJf })),
  teamRegistration: (payload: any) => dispatch(teamRegistration.started(payload))
})


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
    width:98%;
  }  
}
`
const ChipStudent = styled(Chip)`
  margin: 3px;
`

const ButtonContent = styled.div`
    flex: 1;
    justify-content: flex-end;
    display: flex;
`
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);

