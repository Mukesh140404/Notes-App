import {useState ,useEffect} from 'react'
import './App.css'

function App() {

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask = [...task]
    copyTask.push({title,description})
    setTask(copyTask)

    setTitle("")
    setDescription('')
  } 

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')

  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("notes")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task))
  }, [task])

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx,1)
    setTask(copyTask)
  }

  return (
    <div className='bg-gray-900 w-screen h-screen lg:h-screen pb-8 overflow-y-scroll'>
      <div className='w-full lg:h-full flex flex-wrap'>
        <div className='w-full h-fit lg:w-1/2 flex flex-col gap-8 pt-8 px-8'>
          <h1 className='text-start text-3xl font-bold text-white'>Add Notes</h1>
          <form  
              className='flex flex-col gap-6'
              onSubmit={(e)=>{
              submitHandler(e)
            }} method="post">
            <input type="text" name='title'
            required
            className='border border-white outline-none px-3 py-2 w-full rounded-lg text-xl text-white'
                  placeholder='title here .....'
                  value={title}
                  onChange={(e)=>{
                    setTitle(e.target.value)
                  }}
          />
          <textarea 
          required
          placeholder='description here .....' 
          value={description}
                  onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
          rows={5}
          className='border border-white outline-none px-3 py-2 w-full rounded-lg text-lg text-white'
          name="description" id="description" />
          <button 
          type='submit'
            className='font-bold active:scale-96 py-2 w-full rounded-lg text-xl text-gray-800 bg-white cursor-pointer' 
          >Add Note</button>
          </form>
        </div>
        <div className='lg:border-l-3 bg-blue-950 mt-6 lg:mt-0 border-white w-full lg:h-screen h-fit lg:w-1/2 flex flex-col gap-8 pt-8 px-8 overflow-y-scroll'>
          <h1 className='text-start text-3xl font-bold text-white'>Your Notes</h1>
          <div className='flex flex-wrap gap-4 justify-start items-start'>
           {task.map((elem,idx)=>{
            return <div key={idx} className='h-60 p-4 md:w-47 sm:w-3/7 w-full border bg-yellow-100 rounded-lg flex flex-col justify-between'>
      <div className='flex flex-col gap-1'> 
        <h2 className='text-start text-xl font-bold'>{elem.title}</h2>
        <p className='text-start text-sm text-gray-600'>{elem.description}</p>
      </div>
      <button
      onClick={()=>{
        deleteNote(idx)
      }}
      className='active:scale-95 cursor-pointer py-1 rounded-lg bg-red-600 w-full text-white'>Delete Note</button>
    </div>

           })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
