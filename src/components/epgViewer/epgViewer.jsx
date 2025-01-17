import { useEffect, useState } from "react"
import { getEpgData } from "../../services/fetchData"
import Hours from "./components/hours"
import Channels from "./components/channel"
import Events from "./components/events"

function EpgViewer ({onClose}) {
    const [data, setData] = useState([]) 
    
    useEffect( () => {
        const getData = async () => {
            try{
                const epgData = await getEpgData()
                setData(epgData)
            }catch(e){
                console.log(e)
            }
        }
        getData()
    }, [])

    return(
        <div className="flex flex-col relative h-full text-white bg-black overflow-auto">
             <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white rounded hover:bg-red-600"
                style={{zIndex: 2}}
            >
                X
            </button>

            <div className="h-[50%]">
            </div>

            <div className="h-[50%] overflow-auto" style={{backgroundColor: 'bg-color-[rgb(50 49 49 / 43%)]'}}>
                <Hours/>
                
                    {
                        data.map(({id, name, image, number, events}) => {
                            return(
                                <div key={id} className="relative">
                                    <Channels channel={{name, image, number}}/>
                                    <Events events={events}/>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default EpgViewer