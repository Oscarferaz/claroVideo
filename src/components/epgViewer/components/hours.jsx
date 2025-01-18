function Hours({hours}) {
    console.log(hours)
    return (
        <>
            <div className="flex sticky top-0 h-fit w-max">
                <div className="w-[100px]"/>
                {
                    hours
                    .map((hour) => (
                    <p key={hour} className="w-[100px] p-2 text-center">
                       {hour}
                    </p>
                ))}
            </div>
        </>
    );
}

export default Hours;