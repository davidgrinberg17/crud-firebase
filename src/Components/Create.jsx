import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection,addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase.js"

export const Create = () => {

    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [position,setPosition] = useState("")
    const [number,setNumber] = useState(0)

    const navigate = useNavigate()

    const playerCollection = collection(db,"players")

    const createPlayer = async (e) => {
        e.preventDefault()
        await addDoc (playerCollection,{

            // campo del documento: valor del input
            lastName: lastName,
            name: name,
            position: position,
            number: number,
        })
        navigate("/")
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Create PLAYER</h1>
                    <form onSubmit={createPlayer}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input placeholder={name} type="text" onChange={ (e) => setName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">LastName</label>
                            <input placeholder={lastName} type="text" onChange={ (e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Position</label>
                            <input placeholder={position} type="text" onChange={ (e) => setPosition(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Number</label>
                            <input placeholder={number} type="number" onChange={ (e) => setNumber(Number(e.target.value))}/>
                        </div>
                        <button type="submit" className="btn btn-primary">CREATE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}