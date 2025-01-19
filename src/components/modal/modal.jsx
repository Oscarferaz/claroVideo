import { useEffect, useRef } from "react";

function Modal ({children, width = "auto", height = "auto"}) {

    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
        return () => {
          if (dialog.open) dialog.close();
        };
      }, []);

    return (
        <dialog className='rounded-lg overflow-hidden' ref={dialogRef} style={{width, height}}>
            {children}
        </dialog>
    )
}

export default Modal