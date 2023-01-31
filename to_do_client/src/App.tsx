import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Task } from './components/Task/Task'
import Button from 'react-bootstrap/Button'

export type Tasks= {
  id: number;
  title: string;
}


function App() {
  const [selectedIDs, setSelectedIDs]= useState<number[]>([])

  useEffect(()=>{
    console.log(selectedIDs,'ue')
  },[selectedIDs])
  
  function addToSelection(selected:number[],id:number, checked:boolean):void{
    console.log("hello")
    let mySelected=selected
    if(checked){
        mySelected.push(Number(id))
    }
    else{
        let newSelected:number[]=[]
        for(let i=0; i< mySelected.length; i++){
            if(mySelected[i]!==id){
                newSelected.push(mySelected[i])
            }
        }
        mySelected=newSelected
    }
    console.log(mySelected,'s')
    return setSelectedIDs(mySelected)

}

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
