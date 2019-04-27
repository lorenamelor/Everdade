export const listItems = [
  {cod: 1,name: 'Turma de Sistemas de informação A'},
  {cod: 2,name: 'Turma de Sistemas de informação B'},
  {cod: 3,name: 'Turma de Sistemas de informação C'},
  {cod: 4,name: 'Turma de Sistemas de informação D'},
]

export const listJF = [
  {cod: 2,name: 'Julgamento de fatos A', status:'Em execução', turma:'SI', time:'2', membros:'5', qtdFatos:25, qtdEquipes:10 },
  {cod: 1,name: 'Julgamento de fatos B', status:'Finalizado', turma:'SI', time:'2', membros:'5', qtdFatos:25, qtdEquipes:10 },
  {cod: 3,name: 'Julgamento de fatos C', status:'Em preparação', turma:'SI', time:'2', membros:'5', qtdFatos:25, qtdEquipes:10 },
  {cod: 5,name: 'Julgamento de fatos D', status:'Em preparação', turma:'SI', time:'2', membros:'5', qtdFatos:25, qtdEquipes:10 },
  {cod: 4,name: 'Julgamento de fatos E', status:'Em criação', turma:'SI', time:'2', membros:'5', qtdFatos:25, qtdEquipes:10 },
]

export const listFacts = [
  {cod: 1,name: 'Fatos A', topic:'Casos de Uso', resposta:false, respostaEquipe: true, acertos: 9, erros: 3, fact:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum laoreet odio, nec molestie felis lacinia nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac gravida tellus. Donec suscipit sit amet velit in ornare. Mauris lacinia nulla at turpis pulvinar, vitae tempus enim sagittis. ', equipes:['Equipe A','Equipe B','Equipe C','Equipe D','Equipe E']},
  {cod: 2,name: 'Fatos B', topic:'Casos de Uso', resposta:false, respostaEquipe: false, acertos: 9, erros: 3, fact:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum laoreet odio, nec molestie felis lacinia nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac gravida tellus. Donec suscipit sit amet velit in ornare. Mauris lacinia nulla at turpis pulvinar, vitae tempus enim sagittis. ', equipes:['Equipe A','Equipe B','Equipe C','Equipe D','Equipe E']},
  {cod: 3,name: 'Fatos C', topic:'Casos de Uso', resposta:false, respostaEquipe: true, acertos: 9, erros: 3, fact:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum laoreet odio, nec molestie felis lacinia nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac gravida tellus. Donec suscipit sit amet velit in ornare. Mauris lacinia nulla at turpis pulvinar, vitae tempus enim sagittis. ', equipes:['Equipe A','Equipe B','Equipe C','Equipe D','Equipe E']},
  {cod: 4,name: 'Fatos D', topic:'Casos de Uso', resposta:false, respostaEquipe: false, acertos: 9, erros: 3, fact:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum laoreet odio, nec molestie felis lacinia nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac gravida tellus. Donec suscipit sit amet velit in ornare. Mauris lacinia nulla at turpis pulvinar, vitae tempus enim sagittis. ', equipes:['Equipe A','Equipe B','Equipe C','Equipe D','Equipe E']},
]

export const listTeam = [
  {cod: 1,name: 'Equipe A', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros:10, acertosNominais: 10, acertosReais: 15, membros:['Maria Clara','João Antonio','Eleonora de Melo','Pedro Quiroz','José Eustáquio']},
  {cod: 2,name: 'Equipe B', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros:10, acertosNominais: 10, acertosReais: 15, membros:['Maria Clara','João Antonio','Eleonora de Melo','Pedro Quiroz','José Eustáquio']},
  {cod: 3,name: 'Equipe C', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros:10, acertosNominais: 10, acertosReais: 15, membros:['Maria Clara','João Antonio','Eleonora de Melo','Pedro Quiroz','José Eustáquio']},
  {cod: 4,name: 'Equipe D', qtdMembros: 5, lider: 'João Mendes', acertos: 20, erros:10, acertosNominais: 10, acertosReais: 15, membros:['Maria Clara','João Antonio','Eleonora de Melo','Pedro Quiroz','José Eustáquio']},
]

export const cursos = ['Sistemas de Informação', 'Ciências da computação', 'Analise e desenvolvimento de sistemas', 'Engenharia da computação'];

export const unidades = [{id_unidade: "2", nome: "Barreiro"}, {id_unidade: "5", nome: "Corel"}, {id_unidade: "6", nome: "Praca Liberdade"}, {id_unidade: "7", nome: "Coracao Eucaristico"}]