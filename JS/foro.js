const db = firebase.firestore();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = '';

const saveCom = (titulo, descripcion) =>

db.collection('comentarios').doc().set({  //creacion de la coleccion de comentarios en la base de datos y subida de los datos a la coleccion

  titulo,
  descripcion,

});

const getCom = () => db.collection('comentarios').get();

const onGetComs = (callback) => db.collection('comentarios').onSnapshot(callback);

const getComSingular = (id) => db.collection('comentarios').doc(id).get();

const eliminarComs = id => db.collection('comentarios').doc(id).delete();

const editarComs = (id, editarComs) => db.collection('comentarios').doc(id).update(editarComs);


window.addEventListener('DOMContentLoaded', async (e) => {  //Metodo de lectura
 
    onGetComs((querySnapshot) => {

      taskContainer.innerHTML = '';

      querySnapshot.forEach(doc => {

        console.log(doc.data())
 
        const coment = doc.data();
        coment.id = doc.id;
       
 
        taskContainer.innerHTML += `<div id="contenedor4k" class="card card-body mt-2 border-primary">
        
        <h3>${coment.titulo}</h3>
        <p>${coment.descripcion}</p>
 
        <div>
        <button class="btn btn-primary btn-eliminar" id="btnD" data-id="${coment.id}">Eliminar</button>
        <button class="btn btn-secundary btn-editar" id="btnE" data-id="${coment.id}">Editar</button>
        </div>
 
        </div>`

        const btnsEliminar = document.querySelectorAll('.btn-eliminar');
        btnsEliminar.forEach(btn => {                       //Similar al metodo de actualizar, se obtiene la id del comentario guardado y una vez se
                                                            //compare sera eliminado.
            btn.addEventListener('click', async (e) => {

              await eliminarComs(e.target.dataset.id)

            })

        })

        const btnsEditar = document.querySelectorAll('.btn-editar');
        btnsEditar.forEach(btn => {        //Metodo de actualizacion de datos

           btn.addEventListener('click', async (e) => {

            const doc = await getComSingular(e.target.dataset.id)  //se obtiene la id del comentario guardado en la bd y se pasa para poder editar
            const com = doc.data();                                //ese mismo archivo

            editStatus = true;
            id = doc.id;

            taskForm['task-title'].value = com.titulo
            taskForm['task-description'].value = com.descripcion
            taskForm['btn-task-form'].innerText = 'Actualizar'

           })

        })
 
     })

    })

    

})

taskForm.addEventListener('submit', async (e) => {  //Metodo De Creacion

  e.preventDefault();

  const titulo = taskForm['task-title'];
  const descripcion = taskForm['task-description'];

  if(!editStatus){  //condicion donde si el estado de la app es falso se crearan los comentarios

    await saveCom(titulo.value, descripcion.value);

  }else {  //sino, se actualizaran los datos

    await editarComs(id, {

       titulo: titulo.value, 
       descripcion: descripcion.value

    })

    editStatus = false;  //despues de comprobar, el estado se reiniciara a falso para dar lugar a nuevos datos
    id = '';
    taskForm['btn-task-form'].innerText = 'save';

  }

  await getCom();

  taskForm.reset();
  titulo.focus();

})