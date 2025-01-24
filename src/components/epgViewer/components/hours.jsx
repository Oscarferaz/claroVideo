import { memo } from "react"

function Hours() {
  return (
    <>
      
        {Array.from({ length: 24 }).flatMap((_, index) => [
          <p key={`${index}:00`} className="w-[250px] p-2">
            {`${String(index).padStart(2, "0")}:00`}
          </p>,
          <p key={`${index}:30`} className="w-[250px] p-2">
            {`${String(index).padStart(2, "0")}:30`}
          </p>,
        ])}
    </>
  )
}

export default memo(Hours)

