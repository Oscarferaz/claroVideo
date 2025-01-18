import { useEffect, useState } from "react"
import { getEpgData } from "../../services/fetchData"
import Hours from "./components/hours"
import Channels from "./components/channel"
import Events from "./components/events"

function EpgViewer ({onClose}) {
    const [data, setData] = useState([]) 
    const [programHovered, setProgramHovered] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect( () => {
        const getData = async () => {
            try{
                const epgData = await getEpgData()
                setData(epgData)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        getData()
    }, [])

    if(loading) return(
        <div className="flex justify-center items-center h-full text-white bg-black" role="status">
           <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
    )

    return(
        <div className="relative flex flex-col h-full text-white bg-black">
             <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white rounded hover:bg-red-600 w-[15px]"
                style={{zIndex: 2}}
            >
                X
            </button>

            <div className="h-[50%] flex flex-col items-center justify-center">
                {
                    programHovered 
                        ? (
                            <>
                                <p>Duracion: {programHovered.duration}</p> 
                                <p>Comienza: {programHovered.date_begin}</p> 
                           </>
                        )  
                        : (<p>No hay informacion</p>)
                }
            </div>

            <div className="h-[50%] overflow-auto" style={{backgroundColor: 'rgb(50 49 49 / 43%)'}}>
                <div className="sticky top-0 z-10 bg-black w-full">
                    <Hours />
                </div>
                <div>
                    {data?.map(({ id, name, image, number, events }) => (
                        <div key={id} className="flex">
                            <Channels channel={{ name, image, number }} />
                            <div className="relative w-full">
                                <Events events={events} onMouseEntered={(program) => setProgramHovered(program)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EpgViewer