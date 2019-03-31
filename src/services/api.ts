import axios from 'axios';

export async function apiRequestCourses(): Promise<any> {
	const courses: any = await axios.get(`http://localhost/everdade/index.php/cursos`);
	return courses;
}

export async function apiSignUp(payload: any): Promise<{ data: { msg: any } }>  {
	console.log(payload)
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/cadastro`, { ...payload} , { headers });
}

export async function apiSignIn(payload: any): Promise<{ data: { msg: any } }>  {
	console.log(payload)
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/login`, { ...payload} , { headers });
}