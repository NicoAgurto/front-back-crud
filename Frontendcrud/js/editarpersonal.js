console.log(location.search)     // lee los argumentos pasados a este formulario
var id = location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            url:'https://nicoag.pythonanywhere.com/personales/' + id , 
            id: 0,
            error:false,
            cargando:true,
            nombre:"",
            cargo:"",
            dia:"",
            horario:"",
            imagen:"",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.cargo = data.cargo
                    this.dia = data.dia
                    this.horario = data.horario
                    this.imagen=data.imagen

                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let personal = {
                nombre: this.nombre,
                cargo: this.cargo,
                dia: this.dia,
                horario: this.horario,
                imagen:this.imagen,
            }
            var options = {
                body: JSON.stringify(personal),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./crud.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
