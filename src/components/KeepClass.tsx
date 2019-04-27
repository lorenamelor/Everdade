
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import {
  classEdit, classRegistration, IClass, requestClassById, requestStudents, 
  requestUnits, selectClassById, selectIsClassRegistration, selectStudents, selectUnits,
} from 'src/store/app/class';
import { requestCourses, selectCourses } from 'src/store/app/state';
import { H1 } from '../components'

import FormKeepClass from './FormKeepClass';
interface IProps {
  closeModal: () => void;
  idItem?: number | string;
}

class KeepJF extends React.Component<IMapDispatchToProps & IMapStateToProps & IProps> {
  public state = { editValues: {} }

  public componentDidMount() {
    // this.props.requestCourses();
    // this.props.requestUnits();

    if (this.props.idItem) {
      this.props.requestClassById(this.props.idItem);
    }
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.classById !== this.props.classById && prevProps.classById !== {}) {
      const { classById } = this.props;

      this.setState({
        editValues: {
          idTurma: classById.id_turma,
          nome: classById.nome,
          idCurso: classById.curso_id_curso,
          idUnidade: classById.unidade_id_unidade,
          idProfessor: classById.professor_id_professor,
          disciplina: classById.disciplina,
          alunos: ['1']
        }
      });
      this.props.requestStudents(Number(classById.curso_id_curso));
    }
  }

  public componentWillUnmount(){
    this.setState({
      editValues: {}
    })
  }

  public render() {
    const {
      // courses,
      // units,
      students,
      isClassRegistration,
      idItem,
      closeModal } = this.props;
    const { editValues } = this.state;

    return (
      <>
        <H1>Cadastrar Turma</H1>
        <FormKeepClass
          idClass={idItem}
          classRegistration={this.props.classRegistration}
          classEdit={this.props.classEdit}
          requestStudents={this.props.requestStudents}
          closeModal={closeModal}
          isClassRegistration={isClassRegistration}
          editValues={editValues}
          students={students} />
      </>
    );
  }
}


// REDUX ACTIONS
interface IMapDispatchToProps {
  requestCourses: () => void;
  requestUnits: () => void;
  requestStudents: (idCourse: number) => void;
  classRegistration: (payload: any) => void;
  requestClassById: (idTurma: number | string) => void;
  classEdit: (payload: any) => void;

}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestCourses: () => dispatch(requestCourses.started()),
  requestUnits: () => dispatch(requestUnits.started()),
  requestStudents: (idCourse: number) => dispatch(requestStudents.started(idCourse)),
  classRegistration: (payload) => dispatch(classRegistration.started(payload)),
  requestClassById: (idTurma: number | string) => dispatch(requestClassById.started(idTurma)),
  classEdit: (payload) => dispatch(classEdit.started(payload)),

})

// REDUX STATE
interface IMapStateToProps {
  courses: [];
  units: [];
  students: Array<{ id_aluno: string, nome: string }>;
  isClassRegistration: boolean;
  classById: IClass;
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  courses: selectCourses(state),
  units: selectUnits(state),
  students: selectStudents(state),
  isClassRegistration: selectIsClassRegistration(state),
  classById: selectClassById(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepJF);
