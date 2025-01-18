import  { useState } from 'react'
import Modal from './components/modal/modal'
import EpgViewer from './components/epgViewer/epgViewer'

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Mostrar EPG
      </button>
      <Modal isOpen={showModal} width='90%' height='90%'>
        <EpgViewer onClose={() => setShowModal(false)}/>
      </Modal>
    </div>
  )
}

export default App
