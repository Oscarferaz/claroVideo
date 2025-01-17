function Hours() {
    return (
        <>
            <div className="flex sticky top-0 h-fit w-max">
                <div className="w-[100px]"/>
                {
                    Array(24)
                    .fill(0)
                    .map((_, i) => (
                    <p key={i} className="w-[100px] p-2 text-center">
                        {i < 10 ? `0${i}:00` : `${i}:00`}
                    </p>
                ))}
            </div>
        </>
    );
}

export default Hours;