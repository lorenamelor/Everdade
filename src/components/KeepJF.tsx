import Btn from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { FieldArray, Form, Formik } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from '../store';
import { JFEdit, JFRegistration, requestJFById, selectIsJFRegistration, selectJFById } from '../store/app/jf';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button, H1 } from '../components'

// tslint:disable-next-line:no-empty-interface
interface IProps {
  idClass: number | string;
  closeModal: any;
  idItem?: number | string;
}

// validate form
const ValidationJFSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  tempoMaxExib: Yup.string().required("Tempo de exibição é obrigatório"),
  status: Yup.string().required("Status é obrigatório"),
  qntMaxAlunosEquipe: Yup.string().required("Número de membro é obrigatório"),
  fatos: Yup.array().required("Cadastrar fatos é obrigatório")
});


class KeepJF extends React.Component<IProps & IMapStateToProps & IMapDispatchToProps> {
  public state = {
    editValues: {
      nome: '',
      tempoMaxExib: '',
      status: '',
      idTurma: this.props.idClass,
      fatos: [{ texto: '', respostaCorreta: '', ordem: '', topico: '' }],
      qntMaxAlunosEquipe: '',
    },
    factsCount: 1
  }

  public initialValues = {
    nome: '',
    tempoMaxExib: '',
    status: '',
    idTurma: this.props.idClass,
    fatos: [{ texto: '', respostaCorreta: '', ordem: '', topico: '' }],
    qntMaxAlunosEquipe: '',
  }

  public handleCountFacts = () => {
    let count = this.state.factsCount;
    count = count + 1;
    this.setState({ factsCount: count })
  }
  public componentDidMount() {

    if (this.props.idItem) {
      this.props.requestJFById(this.props.idItem);
    }
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.JFById !== this.props.JFById && prevProps.JFById !== {}) {
      const { jf, fatos } = this.props.JFById;

      const facts = fatos.map((fato: any) => ({
        texto: fato.texto_fato, 
        respostaCorreta: fato.resposta_correta,
        ordem: fato.ordem_jf, 
        topico: fato.topico,
      }))

      this.setState({
        editValues: {
          nome: jf[0].nome,
          tempoMaxExib: jf[0].tempo_max_exib,
          status: jf[0].status,
          idTurma: this.props.idClass,
          idJf: this.props.idItem,
          fatos: facts,
          qntMaxAlunosEquipe: jf[0].quantidade_alunos_equipe,
        }
      });

    }
  }

  public componentWillUnmount(){
    this.setState({
      editValues: {
        nome: '',
        tempoMaxExib: '',
        status: '',
        idTurma: this.props.idClass,
        fatos: [{ texto: '', respostaCorreta: '', ordem: '', topico: '' }],
        qntMaxAlunosEquipe: '',
      }
    })
  }

  public render() {
    const { editValues } = this.state;
    const { isJFRegistration, closeModal, idItem } = this.props;

    const addIcon = require('../assets/icons/add-icon.png')
    const deletIcon = require('../assets/icons/delet-icon.png')
    return (
      <Wrap>
        <Formik
          initialValues={editValues.nome !== '' ? editValues : this.initialValues}
          enableReinitialize
          validationSchema={ValidationJFSchema}
          onSubmit={values => {
            idItem !== ''
              ? this.props.JFEdit(values)
              : this.props.JFRegistration(values);
            closeModal();
          }}
        >
          {({ errors, touched, values: { nome, tempoMaxExib, qntMaxAlunosEquipe, status, fatos },
            handleChange, setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form>
                <div>
                  <H1>Julgamento de Fatos</H1>
                  <KeepJFWrap>
                    <TextField
                      id="standard-name"
                      className='input-small'
                      label="Nome"
                      margin="normal"
                      name='nome'
                      value={nome}
                      helperText={touched.nome ? errors.nome : ""}
                      error={touched.nome && Boolean(errors.nome)}
                      onChange={change.bind(null, "nome")}
                    />

                    <TextField
                      id="standard-select-currency"
                      className='input-small'
                      select
                      label="Status"
                      margin="normal"
                      name='status'
                      value={status}
                      helperText={touched.status ? errors.status : ""}
                      error={touched.status && Boolean(errors.status)}
                      onChange={change.bind(null, "status")}
                    >
                      {['Em criacao', 'Em preparacao', 'Em execucao', 'Finalizado'].map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="standard-name"
                      className='input-small'
                      label="Membros"
                      margin="normal"
                      type="number"
                      name='qntMaxAlunosEquipe'
                      value={qntMaxAlunosEquipe}
                      helperText={touched.qntMaxAlunosEquipe ? errors.qntMaxAlunosEquipe : ""}
                      error={touched.qntMaxAlunosEquipe && Boolean(errors.qntMaxAlunosEquipe)}
                      onChange={change.bind(null, "qntMaxAlunosEquipe")}
                    />

                    <TextField
                      id="standard-name"
                      className='input-small'
                      label="Tempo/fato"
                      margin="normal"
                      type="number"
                      name='tempoMaxExib'
                      value={tempoMaxExib}
                      helperText={touched.tempoMaxExib ? errors.tempoMaxExib : ""}
                      error={touched.tempoMaxExib && Boolean(errors.tempoMaxExib)}
                      onChange={change.bind(null, "tempoMaxExib")}
                    />
                  </KeepJFWrap>
                  <div className='facts'>
                    <H1>Fatos</H1>
                    <ContainerFacts>

                      <FieldArray
                        name="fatos"
                        render={arrayHelpers => (
                          <>
                            {fatos.map((fato, index) => (
                              <>
                                <KeepFacts key={index}>
                                  <TextField
                                    id="outlined-multiline-flexible"
                                    label="Fato"
                                    multiline
                                    rowsMax="4"
                                    rows="4"
                                    className='inputMultiline'
                                    margin="normal"
                                    variant="outlined"
                                    // helperText={touched.fatos && fatos[index].texto === "" ? 'O fato é obrigatório' : ''}
                                    // error={touched.fatos && fatos[index].texto === ""}
                                    name={`fatos[${index}].texto`}
                                    value={fatos[index].texto}
                                    onChange={change.bind(null, `fatos[${index}].texto`)}
                                    inputProps={{
                                      maxLength: 400,
                                    }}
                                  />
                                  <div>
                                    <div>
                                    <TextField
                                       id="standard-name"
                                      select
                                      className='input-small'
                                      label="Resposta"
                                      margin="normal"
                                      name={`fatos[${index}].respostaCorreta`}
                                      value={fatos[index].respostaCorreta}
                                      // helperText={touched.fatos && fatos[index].respostaCorreta === "" ? 'A resposta é obrigatória' : ''}
                                      // error={touched.fatos && fatos[index].respostaCorreta === ""}
                                      onChange={change.bind(null, `fatos[${index}].respostaCorreta`)}
                                    >
                                      {[{ label: 'Verdadeiro', value: 'v' }, { label: 'Falso', value: 'f' }].map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>

                                    <TextField
                                      id="standard-name"
                                      className='input-small'
                                      label="Ordem"
                                      margin="normal"
                                      type="number"
                                      name={`fatos[${index}].ordem`}
                                      value={fatos[index].ordem}
                                      // helperText={touched.fatos && fatos[index].ordem === "" ? 'A ordem é obrigatória' : ''}
                                      // error={touched.fatos && fatos[index].ordem === ""}
                                      onChange={change.bind(null, `fatos[${index}].ordem`)}
                                    />
                                    </div>
                                    <TextField
                                      id="standard-name"
                                      className='input'
                                      label="Tópico da matéria"
                                      margin="normal"
                                      type="text"
                                      name={`fatos[${index}].topico`}
                                      value={fatos[index].topico}
                                      // helperText={touched.fatos && fatos[index].topico === "" ? 'O topico é obrigatória' : ''}
                                      // error={touched.fatos && fatos[index].topico === ""}
                                      onChange={change.bind(null, `fatos[${index}].topico`)}
                                      inputProps={{
                                        maxLength: 80,
                                      }}
                                    />
                                  </div>
                                </KeepFacts>
                                <span className='actions-buttons'>
                                  <ButtonSmall background={'#096F66'} onClick={() => arrayHelpers.insert(index, { texto: '', respostaCorreta: '', ordem: '', topico: '' })}>
                                    <img src={addIcon} />
                                  </ButtonSmall>
                                  { fatos.length !== 1 &&
                                  <ButtonSmall background={'#DB4437'} onClick={() => fatos.length !== 1 ? arrayHelpers.remove(index) : ({})}>
                                    <img src={deletIcon} />
                                  </ButtonSmall>
                                  }
                                </span>
                              </>))}
                          </>)}
                      />
                    </ContainerFacts>

                  </div>
                </div>
                <ButtomContainer>
                  <Button type="submit" loading={isJFRegistration}>Salvar</Button>
                </ButtomContainer>
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
  >div:first-child{
      overflow-y: scroll;
      height: 80vh;
      margin-bottom:10px;
  }
  >Button{
    float: right;
  }
  .actions-buttons{
    margin-right: 10px;
    display:flex;
    flex-direction: row-reverse;
  }
`

const KeepJFWrap = styled(Card)`
    padding:10px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    margin: 10px;
  .input{
    margin: 0 5px 15px 5px;
    width:47%;
    @media (max-width: 800px){
      width:98%;
    }
  }  
  .input-small{
    margin: 0 5px 10px 5px;
    
    width: 22%;
    @media (max-width: 800px){
      width:45%;
    }
    @media (max-width: 370px){
      width:98%;
    }
  }
`

const ContainerFacts = styled.div`
    overflow-y: scroll;
    height: 210px;
  `;

const KeepFacts = styled(Card)`
    padding:10px;
    align-items: center;
    justify-content: center;
    display:flex;
    margin: 10px;
    .inputMultiline{
      width: 70%;
      margin-left: 5px;
      margin-right: 15px;
    }
    >.div {
      display:flex;
      flex-direction: column;
      >.div{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .input-small{
      margin: 0 5px 10px 5px;
      width: 44%;
    }
    .input{
      margin: 0 5px 10px 5px;
      width: 91%;
    }
`

const ButtonSmall = styled(Btn)`
  &&{
    background-color: ${(props: any) => props.background};
    width: 20px;
    min-width: 26px;
    height: 25px;
    margin: 0 1px;

    @media (max-width: 700px){
      margin: 1px 1px;
    }
    :hover{
      background-color: ${(props: any) => props.background};
    }
}
`
const ButtomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
`
// REDUX ACTIONS
interface IMapDispatchToProps {
  JFRegistration: (payload: any) => void;
  JFEdit: (payload: any) => void;
  requestJFById: (idJF: any) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  JFRegistration: (payload) => dispatch(JFRegistration.started(payload)),
  JFEdit: (payload) => dispatch(JFEdit.started(payload)),
  requestJFById: (idJF) => dispatch(requestJFById.started(idJF)),

})

// REDUX STATE
interface IMapStateToProps {
  isJFRegistration: boolean;
  JFById: any;
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  isJFRegistration: selectIsJFRegistration(state),
  JFById: selectJFById(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepJF);
