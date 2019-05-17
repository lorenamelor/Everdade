import axios from 'axios';

/*SIGN UP*/
export async function apiSignUp(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/cadastrar`, { ...payload} , { headers });
}

/*SIGN IN*/
export async function apiSignIn(payload: any): Promise<{ data: any }>{
	return axios.post(`http://localhost/everdade/index.php/usuario/login`, { ...payload});
}

/*COURSES, UNITS AND STUDENTS*/

export async function apiRequestCourses(): Promise<any> {
	const courses: any = await axios.get(`http://localhost/everdade/index.php/cursos`);
	return courses.data;
}

export async function apiRequestUnits(): Promise<any> {
	const units: any = await axios.get(`http://localhost/everdade/index.php/unidades`);
	return units.data;
}

export async function apiRequestStudents(idCurso: any): Promise<any> {
	const students: any = await axios.get(`http://localhost/everdade/index.php/cursos/alunos?idCurso=${idCurso}`);
	return students.data;
}

/*CLASS*/
export async function apiRequestClassByUserId(userId: number | string): Promise<any> {
	const classByUserId: any = await axios.get(`http://localhost/everdade/index.php/turma?idUsuario=${userId}`);
	return classByUserId.data;
}

export async function apiClassRegistration(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/turma/cadastrar`, { ...payload} , { headers });
}

export async function apiRequestClassById(idTurma: number | string): Promise<any> {
	const classById: any = await axios.get(`http://localhost/everdade/index.php/turma/selecionar?idTurma=${idTurma}`);
	return classById.data;
}

export async function apiClassEdit(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.put(`http://localhost/everdade/index.php/turma/editar`, { ...payload} , { headers });
}

export async function apiDeleteClass(idTurma: number | string): Promise<any> {
	return axios.delete(`http://localhost/everdade/index.php/turma/apagar?idTurma=${idTurma}`);
}

/*JULGAMENTO DE FATOS*/

export async function apiJFRegistration(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/jf/cadastrar`, { ...payload} , { headers });
}

export async function apiJFEdit(payload: any): Promise<{ data: { msg: any } }>  {

	const headers: any = {};
	return axios.put(`http://localhost/everdade/index.php/jf/editar`, { ...payload} , { headers });
}

export async function apiRequestJFById(idjf: number | string): Promise<any> {
	const JFById: any = await axios.get(`http://localhost/everdade/index.php/jf/selecionar?idJf=${idjf}`);
	return JFById.data;
}

export async function apiRequestJFByClassId(classId: number | string): Promise<any> {
	const JFByClassId: any = await axios.get(`http://localhost/everdade/index.php/jf?idTurma=${classId}`);
	return JFByClassId.data;
}

export async function apiDeleteJF(idJF: number | string): Promise<any> {
	return axios.delete(`http://localhost/everdade/index.php/jf/apagar?idJf=${idJF}`);
}

/*TEAMS*/

export async function apiRequestTeamByUserAndJF(userId: number | string, JFId: number | string): Promise<any> {
	// const TeamList: any = await axios.get(`http://localhost/everdade/index.php/equipe?idUsuario=${userId}?idJF=${JFId}`);
		return [
			{ cod: 1, nome: 'Equipe A', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros: 10, acertosNominais: 10, acertosReais: 15, membros: ['Maria Clara', 'João Antonio', 'Eleonora de Melo', 'Pedro Quiroz', 'José Eustáquio'] },
			{ cod: 2, nome: 'Equipe B', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros: 10, acertosNominais: 10, acertosReais: 15, membros: ['Maria Clara', 'João Antonio', 'Eleonora de Melo', 'Pedro Quiroz', 'José Eustáquio'] },
			{ cod: 3, nome: 'Equipe C', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros: 10, acertosNominais: 10, acertosReais: 15, membros: ['Maria Clara', 'João Antonio', 'Eleonora de Melo', 'Pedro Quiroz', 'José Eustáquio'] },
			{ cod: 4, nome: 'Equipe D', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros: 10, acertosNominais: 10, acertosReais: 15, membros: ['Maria Clara', 'João Antonio', 'Eleonora de Melo', 'Pedro Quiroz', 'José Eustáquio'] },
		]
}

export async function apiTeamRegistration(payload: any): Promise<{ data: { msg: any } }>  {
	return axios.post(`http://localhost/everdade/index.php/equipe/cadastrar`, { ...payload});
}

export async function apiDeleteTeam(userId:number | string, idTeam: number | string): Promise<any> {
	return axios.delete(`http://localhost/everdade/index.php/equipe/apagar?idUsuario=${userId}?idEquipe=${idTeam}`);
}

