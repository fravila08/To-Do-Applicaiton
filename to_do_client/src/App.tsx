import React, {  useEffect, useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Task } from './components/Task'
import axios from 'axios'
import { CsrfToken } from './components/CsrfToken'

export interface TaskInterface {
    id: number;
    Title: string;
    Completed:boolean;
}

export interface ResponseTasks{
    completed: TaskInterface[];
    pending: TaskInterface[];
    biggestID: number;
}

export async function getTasks():Promise<ResponseTasks>{
    let response = await axios.get('allTasks')
    return response.data
}


function App() {
  
  const [compTasks, setCompTasks] : [TaskInterface[] , (compTasks:TaskInterface[])=>void]=useState<TaskInterface[]>([])
  const [pendTasks, setPendTasks] : [TaskInterface[] , (pendTasks:TaskInterface[])=>void]=useState<TaskInterface[]>([])
  
  useEffect(()=>{
      const getResponse=async ()=>{ 
          let response=await getTasks()
          setCompTasks(response.completed)
          setPendTasks(response.pending)
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
          
          {pendTasks.map((task)=>(
            <Task 
              task={task} 
            />
          ))}

        </Col>

        <Col xs={1}></Col>

      </Row>

      <Row>

        <Col xs={1}></Col>

        <Col xs={10} className='listHolder'>
          
          <h5 className='listHeader'> Completed </h5>
        
          {compTasks.map((task)=>(
            <Task 
              task={task}
            />
          ))}
      
        </Col>

        <Col xs={1}></Col> 

      </Row>
    </Container>
  )
}

export default App
