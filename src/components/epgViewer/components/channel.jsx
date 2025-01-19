import { memo } from "react"

function Channel({channel}) {

    const { number, image, name } = channel

    return (
        <div className="sticky left-0 w-[150px] p-2.5 border-r border-b bg-black border-black flex items-center justify-space-around">
            <p className="font-semibold">{number}</p>
            <div className="h-20 w-[7rem] flex justify-center items-center">
                <img src={image} alt={name} className="object-cover" loading="lazy"/>
            </div>
        </div>     
    )
}

export default memo(Channel)