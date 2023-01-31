import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Task } from './components/Task/Task'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { CsrfToken } from './components/CsrfToken'

export type Tasks= {
  id: number;
  title: string;
}

export async function getTasks():Promise<Tasks[]>{
  let response= await axios.get('allTasks')
  console.log(response.data.tasks)
  return response.data.tasks
}


function App() {
  const [selectedIDs, setSelectedIDs]= useState<number[]>([])

  useEffect(()=>{
    console.log(selectedIDs,'ue')
  },[selectedIDs])
  
  CsrfToken()
  return (
    <Container className="App">
     
    <Row>
      <Header selectedIDs={selectedIDs} />
    </Row>

    <Row>
      <Col xs={1}>
      </Col>
      <Col xs={10} style={{border:"black solid 4px"}}>
        Pending
      </Col>
      <Col xs={1}>
      </Col>
    </Row>

    <Row>
      <Col xs={1}>
      </Col>
      <Col xs={10} style={{border:"black solid 4px"}}>
        Completed
        <Container>
          <Task 
            setSelected={setSelectedIDs} 
            selected={selectedIDs} 
            task={{"id":1,"title":"Style"}}
          />
          <Task 
            setSelected={setSelectedIDs} 
            selected={selectedIDs} 
            task={{"id":2,"title":"Style 2"}}
          />
        </Container>
      </Col>
      <Col xs={1}>
        
      </Col>
    </Row>
    </Container>
  )
}

export default App
