function Channel({channel}) {

    const { number, image, name } = channel

    return (
        <div className="sticky left-0 w-[100px] p-2 border-r border-b border-black flex items-center justify-space-around">
            <p className="font-semibold">{number}</p>
            <div className="h-20 w-20 flex justify-center items-center">
                <img src={image} alt={name} className="object-cover" loading="lazy"/>
            </div>
        </div>     
    )
}

export default Channel