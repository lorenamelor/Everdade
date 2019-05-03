import axios from 'axios';

export async function apiSignUp(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/cadastrar`, { ...payload} , { headers });
}

export async function apiSignIn(payload: any): Promise<{ data: any }>{
	return axios.post(`http://localhost/everdade/index.php/usuario/login`, { ...payload});
}

export async function apiRequestClassByUserId(userId: number | string): Promise<any> {
	const classByUserId: any = await axios.get(`http://localhost/everdade/index.php/turma?idUsuario=${userId}`);
	return classByUserId.data;
}

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