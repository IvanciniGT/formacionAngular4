

const nombre = "Ivan"

const objeto1=  {
    nombre,
    apellido: 'Perez',
    edad: 30,
}

const nombre2 = null
const objeto2=  {
    nombre : nombre2,
    edad: 35,
    email: "miemail"
}

console.log(objeto1, objeto2, {...objeto1, ...objeto2})