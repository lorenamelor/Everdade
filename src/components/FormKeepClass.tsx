
import {
  Card, Chip, FormControl, FormHelperText, Input,
  InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import { Form, Formik, } from 'formik';
import { filter } from 'lodash';
import * as React from 'react';
import { getUser } from 'src/store/app/state';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button } from '../components'

// validate form
const SignupSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  idCurso: Yup.string().required("Curso é obrigatório"),
  idUnidade: Yup.string().required("Unidade é obrigatório"),
  disciplina: Yup.string().required("Disciplina é obrigatório"),
  alunos: Yup.array().required("Vincular alunos é orbigatário")
});

const initialValues= {
  nome: '',
  idCurso: '',
  idUnidade: '',
  idUsuario: getUser('id_usuario'),
  disciplina: '',
  alunos: [],
}

const FormKeepClass = (props: any) => {
   const {
    idClass,
     isClassRegistration,
     classRegistration, 
     editValues, 
     requestStudents,
     closeModal,
     classEdit,
      courses,
      units,
      students,
     } = props;
 

    // @TODO remove mock
    // const courses = [{ nome: 'SI', id_curso: '1' }, { nome: 'ADS', id_curso: '2' }];
    
    return (
      <Wrap>
        <Formik
          initialValues={editValues.nome ? editValues : initialValues}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={values => {
            idClass !== ''
            ? classEdit(values)
            : classRegistration(values)
            closeModal() 
          }}
        >
          {({ errors, touched, values: { nome, idCurso, idUnidade, disciplina, alunos },
            handleChange, setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              if (nameInput === 'idCurso') {
                requestStudents(e.target.value);
                alunos= []
              }
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
                      {units.map((unidade: any, index: any) => {
                        return (<MenuItem key={index.toString()} value={unidade.id_unidade}>
                          {unidade.nome}
                        </MenuItem>);
                      })}
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
                            {
                              selected!.map((value: any) => (
                              <ChipStudent key={value} label={
                                filter(students, (aluno) => aluno.id_aluno === value).length > 0 &&
                                filter(students, (aluno) => aluno.id_aluno === value)[0].nome} />
                            ))}
                          </div>
                        )}
                      >
                        {!(students.length > 0) 
                        ? <MenuItem>Não há alunos neste curso</MenuItem>
                        : students.map((aluno: any) => (
                          <MenuItem key={aluno.id_aluno} value={aluno.id_aluno}>
                            {aluno.nome}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>{touched.alunos ? errors.alunos : ""}</FormHelperText>
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

export default FormKeepClass;
