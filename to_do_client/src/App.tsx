import React, {  useEffect, useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Task } from './components/Task'
import axios from 'axios'
import { CsrfToken } from './components/CsrfToken'

export interface ITask {
    id: number;
    title: string;
    completed:boolean;
}

export interface ResponseTasks{
    tasks: ITask[];
}

export async function getTasks():Promise<ResponseTasks>{
    let response = await axios.get('allTasks')
    return response.data
}


function App() {
  
  const [tasks, setTasks]:[ITask[], (tasks:ITask[])=>void]=useState<ITask[]>([])

  useEffect(()=>{
      const getResponse=async ()=>{ 
          let response=await getTasks()
          setTasks(response.tasks)
      }
      getResponse()
  },[])
  
  CsrfToken()

  return (
    <Container className="App"> 

      <Row id='Header'>
          <h1>To Do App</h1>
      </Row>

      <Row>

        <Col xs={1}></Col>

        <Col xs={10} className='listHolder'>
          
          <h5 className='listHeader'> Pending </h5>
          
          {tasks.map((task)=>(task.completed === false ?
            <Task 
              task={task} 
            />
            :
            null
          ))}

        </Col>

        <Col xs={1}></Col>

      </Row>

      <Row>

        <Col xs={1}></Col>

        <Col xs={10} className='listHolder'>
          
          <h5 className='listHeader'> Completed </h5>
        
          {tasks.map((task)=>( task.completed?
            <Task 
              task={task}
            />
            :
            null
          ))}
      
        </Col>

        <Col xs={1}></Col> 

      </Row>
    </Container>
  )
}

export default App
