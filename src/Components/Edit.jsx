import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getDoc,doc,updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export const Edit = () => {

    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [position,setPosition] = useState("")
    const [number,setNumber] = useState(0)

    const navigate = useNavigate()

    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault();
        const playerDoc = doc(db,"players",id)
        const data = {
            lastName: lastName,
            name: name,
            position: position,
            number: number,
        };
        await updateDoc(playerDoc,data)
        navigate("/")
    }

    // funcion que te trae un player por id
    const getPlayerById = async(id) => {
        const playersDoc = await getDoc(doc(db,"players",id));

        if (playersDoc.exists()){
            setLastName(playersDoc.data().lastName)
            setName(playersDoc.data().name)
            setPosition(playersDoc.data().position)
            setNumber(playersDoc.data().number)
        }
        else{
            console.log("no existe");
        }
    }

    useEffect(() =>{
        getPlayerById(id)
    },[])

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Edit Player</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
                        </div>

                        <button type="submit" className="btn btn-primary">Confirmar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}