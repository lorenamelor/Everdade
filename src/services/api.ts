import axios from 'axios';

export async function apiRequestCourses(): Promise<any> {
	const courses: any = await axios.get(`http://localhost/everdade/index.php/cursos`);
	return courses.data;
}

export async function apiSignUp(payload: any): Promise<{ data: { msg: any } }>  {
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/cadastro`, { ...payload} , { headers });
}

export async function apiSignIn(payload: any): Promise<{ data: any }>{
	const headers: any = {};
	return axios.post(`http://localhost/everdade/index.php/usuario/login`, { ...payload} , { headers });
}


export async function apiRequestUnits(): Promise<any> {
	const units: any = await axios.get(`http://localhost/everdade/index.php/unidades`);
	return units.data;
}