
// Code: dialog component

import { useEffect, useRef } from "react";
import styles from "./modal.module.css"

function Modal ({children, isOpen = false, width = "auto", height = "auto"}) {

    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            if (!dialog.open) dialog.showModal(); 
        } else {
            if (dialog.open) dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog className={`${styles.modal} overflow-hidden`} ref={dialogRef} style={{width, height}}>
            {children}
        </dialog>
    )
}

export default Modal