import axios from 'axios';

export async function apiSignUp(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/cadastro`, { ...payload} , { headers });
}

export async function apiSignIn(payload: any): Promise<{ data: any }>{

	return axios.post(`http://localhost/everdade/index.php/usuario/login`, { ...payload});
}


export async function apiRequestCourses(): Promise<any> {
	const courses: any = await axios.get(`http://localhost/everdade/index.php/cursos`);
	return courses.data;
}

export async function apiRequestUnits(): Promise<any> {
	const units: any = await axios.get(`http://localhost/everdade/index.php/unidades`);
	return units.data;
}

// tslint:disable-next-line:variable-name
export async function apiRequestStudents(id_curso: any): Promise<any> {
	const students: any = await axios.get(`http://localhost/everdade/index.php/cursos/alunos?idCurso=${id_curso}`);
	return students.data;
}

export async function apiClassRegistration(payload: any): Promise<{ data: { msg: any } }>  {
	console.log('apiClassRegistration',payload)
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/turma/cadastro`, { ...payload} , { headers });
}

export async function apiRequestClassById(idTurma: number | string): Promise<any> {
	const classById: any = await axios.get(`http://localhost/everdade/index.php/turma/seleciona?idTurma=${idTurma}`);
	return classById.data;
}

export async function apiClassEdit(payload: any): Promise<{ data: { msg: any } }>  {
	console.log('apiClassEdit',payload)
	const headers: any = {};
	return axios.put(`http://localhost/everdade/index.php/turma/editar`, { ...payload} , { headers });
}