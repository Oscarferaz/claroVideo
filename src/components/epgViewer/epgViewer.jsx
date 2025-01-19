import { useCallback, useEffect, useState } from "react"
import { getEpgData } from "../../services/fetchData"
import Hours from "./components/hours"
import Channels from "./components/channel"
import Events from "./components/events"
import { processEpgData } from "../../utils/utils"



function EpgViewer ({onClose}) {

    const [data, setData] = useState([]) 
    const [programHovered, setProgramHovered] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hours, setHours] = useState([])
    
    useEffect( () => {
        const getData = async () => {
            try{
                const epgData = await getEpgData()
                const {data, hours} = processEpgData(epgData)
                setData(data)
                setHours(hours)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        getData()
    }, [])

    const handleMouseEnter = useCallback((program) => {
        setProgramHovered(program);
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
                <div className="sticky top-0 z-10 bg-black w-full w-max">
                    <Hours hours={hours}/>
                </div>
            
                    {data.map(({ id, name, image, number, events }) => (
                        <div key={id} className="flex w-max">
                            <Channels channel={{ name, image, number }} />
                            <div className="flex">
                                <Events events={events} onMouseEntered={handleMouseEnter}/>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default EpgViewer