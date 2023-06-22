import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase.js"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const mySwal = withReactContent(Swal)

export const Show = () => {
    //1 configurar los hooks
    const[players,setPlayers] = useState([])

    //2 referenciamos a la db de firestore
    const playerCollection = collection(db,"players")
    
    //3 funcion para mostrar todos los docs
    const getPlayers = async () => {
        const data = await getDocs(playerCollection)
        setPlayers(
            data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        )
    }

    //4 funcion para eliminar un doc
    const deletePlayer = async (id) => {
        const playerDoc = doc(db, "players", id)
        await deleteDoc (playerDoc)
        getPlayers()
    }

    //5 funcion para la confirmacion
    const confirmDelete= (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                //llamamos la funcion eliminar
                deletePlayer(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    //6 useEffect
    useEffect(() => {getPlayers()},[])

    //7 devolemos la vista
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-grip gap-2">
                        <Link to="/create" className="btn btn-secondary mt-2">CREAR</Link>
                    </div>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Nombre</th>
                                <th>Numero</th>
                                <th>Posicion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.number}</td>
                                    <td>{player.position}</td>
                                    <td>
                                        <Link to={`/edit/${player.id}`} className="btn btn-light">EDITAR</Link>
                                        <button onClick={() => {confirmDelete(player.id)}} className="btn btn-danger">eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}