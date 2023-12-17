const { createApp, ref } = Vue

createApp({
    data() {
        return {
            personal: [],
            url: 'https://nicoag.pythonanywhere.com/personales',
            error: false,
            cargando: true,
            nombre: "",
            cargo: "",
            dia: "",
            horario: "",
            imagen: "",


        }
    },
    methods: { // aqui se definen  las funciones del objeto VUE
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.personal = data
                })
                .catch(error => alert("Ups... se produjo un error: " + error))
        },
        grabar() {
            let personal = {
                nombre: this.nombre,
                cargo: this.cargo,
                dia: this.dia,
                horario: this.horario,
                imagen: this.imagen,
            }
            var options = {
                body: JSON.stringify(personal),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./crud.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

    },
    created() {    //Se ejecuta cuando se carga el objeto VUE
        this.fetchData(this.url)
    }
}).mount('#app')




