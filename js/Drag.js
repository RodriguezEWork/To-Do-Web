draggable();

function draggable() {
    var p = document.querySelectorAll('.Tarjeta');
    var choice = document.querySelectorAll('.Seccion');
    var dragItem = '';
    var seleccion = null;

    for (var i of p) {
        i.addEventListener('dragstart', dragStart);
        i.addEventListener('dragend', dragEnd);
    }

    function dragStart() {
        dragItem = this;
        seleccion = dragItem.getAttribute('id');
    }

    function dragEnd() {
        dragItem = '';
    }

    for (j of choice) {
        j.addEventListener('dragover', dragOver);
        j.addEventListener('dragenter', dragEnter);
        j.addEventListener('dragleave', dragLeave);
        j.addEventListener('drop', Drop);
    }

    function Drop() {
        this.children[0].append(dragItem);
        let probando = this.children[0];
        console.log(probando)
        let comprobacion = probando.outerHTML;
        if (comprobacion.indexOf('progreso') > -1) {

            let tarjetas = document.getElementById('asignar');
            console.log(tarjetas)
            let revision = document.getElementById('revision');
            console.log(revision)
            let completo = document.getElementById('completo');
            console.log(completo)

            localStorage.setItem('tarjeta', tarjetas.outerHTML);
            localStorage.setItem('revision', revision.outerHTML);
            localStorage.setItem('completo', completo.outerHTML);

            localStorage.setItem('progreso', comprobacion);

        } else if (comprobacion.indexOf('revision') > -1) {

            let tarjetas = document.getElementById('asignar');
            console.log(tarjetas)
            let progreso = document.getElementById('progreso');
            console.log(progreso)
            let completo = document.getElementById('completo');
            console.log(completo)

            localStorage.setItem('tarjeta', tarjetas.outerHTML);
            localStorage.setItem('progreso', progreso.outerHTML);
            localStorage.setItem('completo', completo.outerHTML);

            localStorage.setItem('revision', comprobacion);

        } else if (comprobacion.indexOf('asignar') > -1) {

            let revision = document.getElementById('revision');
            console.log(revision)
            let progreso = document.getElementById('progreso');
            console.log(progreso)
            let completo = document.getElementById('completo');
            console.log(completo)

            localStorage.setItem('revision', revision.outerHTML);
            localStorage.setItem('progreso', progreso.outerHTML);
            localStorage.setItem('completo', completo.outerHTML);

            localStorage.setItem('tarjeta', comprobacion);

        } else if (comprobacion.indexOf('completo') > -1) {

            let tarjetas = document.getElementById('asignar');
            console.log(tarjetas)
            let progreso = document.getElementById('progreso');
            console.log(progreso)
            let revision = document.getElementById('revision');
            console.log(revision)

            localStorage.setItem('tarjeta', tarjetas.outerHTML);
            localStorage.setItem('progreso', progreso.outerHTML);
            localStorage.setItem('revision', revision.outerHTML);

            localStorage.setItem('completo', comprobacion);

        }
        seleccion = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        this.style.border = "none";
    }
}

let formularioTarea = document.getElementById('submit');

function cargarDatos() {

    let tarjetas = document.getElementById('asignar');
    let progreso = document.getElementById('progreso');
    let revision = document.getElementById('revision');
    let completo = document.getElementById('completo');

    tarjetas.innerHTML = localStorage.getItem('tarjeta');
    progreso.innerHTML = localStorage.getItem('progreso');
    revision.innerHTML = localStorage.getItem('revision');
    completo.innerHTML = localStorage.getItem('completo');

    draggable();
}

formularioTarea.addEventListener('click', (e) => {

    let titulo = document.getElementById('titulo').value;
    let discripcion = document.getElementById('discripcion').value;
    let tarjetas = document.getElementById('asignar');
    let modalidades = document.querySelector('.modalidades');

    tarjetas.innerHTML += `
        <div draggable="true" class="Tarjeta">
            <h3>${titulo}</h3>
            <div class="Acciones">
                <a href="#${titulo + 1}" class="Boton">Ver mas detalles</a>
            </div>
        </div>

        <div id="${titulo + 1}" class="modal">
            <div class="modal_container">
                <form id="crear-form" class="form-style-9">
                    <ul>
                        <li>
                            <input type="text" name="field3" class="field-style field-full align-none" placeholder="${titulo}" disabled />
                        </li>
                        <li>
                            <textarea name="field5" class="field-style" placeholder="Descripcion" disabled>${discripcion}</textarea>
                        </li>
                        <li>
                            <a href="#general">Cerrar</a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    `;

    localStorage.setItem('tarjeta', tarjetas.outerHTML);

    draggable();

    e.preventDefault();

})

cargarDatos()