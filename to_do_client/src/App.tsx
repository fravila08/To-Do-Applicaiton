import React, {  useEffect, useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Task } from './components/Task'
import axios from 'axios'
import { CsrfToken } from './components/CsrfToken'
import { Header } from './components/Header'

export interface Tasks {
  id: number;
  Title: string;
  Completed:boolean;
}

export interface RTasks{
  completed: Tasks[];
  pending: Tasks[];
  biggestID: number;
}

export async function getTasks():Promise<RTasks>{
    let response= await axios.get('allTasks')
    return response.data
  }


function App() {
  const dTasks: Tasks[]=[]
  const [selectedIDs, setSelectedIDs]= useState<number[]>([])
  const [compTasks, setCompTasks]:[Tasks[],(compTasks:Tasks[])=>void]=React.useState(dTasks)
  const [pendTasks, setPendTasks]:[Tasks[],(pendTasks:Tasks[])=>void]=React.useState(dTasks)
  const [bigID, setBigID]=useState<number>(0)

  
  useEffect(()=>{
    const getResponse=async ()=>{ 
      let response=await getTasks()
      setCompTasks(response.completed)
      setPendTasks(response.pending)
      setBigID(response.biggestID)
    }
    getResponse()
  },[])

  // useEffect(()=>{
  //   console.log(selectedIDs,'ue')
  // },[selectedIDs])


  
  CsrfToken()
  return (
    <Container className="App">
     
    <Row style={{textAlign:"center"}}>
        <h1>To Do App</h1>
    </Row>
    <Row>
      <Header bigID={bigID} setBigID={setBigID} pendTasks={pendTasks} setPendTasks={setPendTasks} selectedIDs={selectedIDs} />
    </Row>

    <Row>
      <Col xs={1}>
      </Col>
      <Col xs={10} style={{border:"black solid 4px", height:"40vh", backgroundColor:"lightgray", textAlign:"center"}}>
        <h5 style={{backgroundColor:"white", borderRadius:"5vw", marginTop:"5px"}}>Pending</h5>
        
        {pendTasks.map((task)=>(
          <Task selected={selectedIDs} setSelected={setSelectedIDs} task={task} />
        ))}
      </Col>
      <Col xs={1}>
      </Col>
    </Row>

    <Row>
      <Col xs={1}>
      </Col>
      <Col xs={10} style={{border:"black solid 4px", height:"40vh", backgroundColor:"lightgray", textAlign:"center"}}>
        <h5 style={{backgroundColor:"white", borderRadius:"5vw", marginTop:"5px"}}>Completed</h5>
       
          {compTasks.map((task)=>(
            <Task 
            setSelected={setSelectedIDs} 
            selected={selectedIDs} 
            task={task}
          />
          ))}
     
      </Col>
      <Col xs={1}>
        
      </Col>
    </Row>
    </Container>
  )
}

export default App
