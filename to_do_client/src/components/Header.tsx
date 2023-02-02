import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tasks } from '../App'

interface IdsProps{
    pendTasks:Tasks[];
    setPendTasks: (pendTasks: Tasks[]) => void;
    selectedIDs: number[];
    bigID:number;
    setBigID:(bigID: number)=>void;
}
export const createTask=async(str:string)=>{
    let response = await axios.post('newtask',{
        'name':str
    })
    return response.data.itemCreated
}

export const Header: React.FC<IdsProps>=({bigID, setBigID ,pendTasks, setPendTasks, selectedIDs})=>{
    const [showCreate, setShowCreate]=useState(true)
    const [newTask, setNewTask]=useState('')

    useEffect(()=>{
        let evalInput=newTask.replaceAll(' ','')
        if(evalInput.length>=1 && evalInput != ''){
            setShowCreate(false)
        }
        else{
            setShowCreate(true)
        }
    },[newTask])

    const creatingNewTask=async(str:string, event?:React.FormEvent<HTMLFormElement>)=>{
        event?.preventDefault()
        let response=await createTask(str)
        if(response){
            setPendTasks([...pendTasks, {'id':bigID,'Title':str,'Completed':false}])
            setBigID(bigID++)
            setNewTask('')
        }
    }
    
// style={{display:"flex", justifyContent:"space-between"}}
    return(
        <Container style={{marginBottom:"1vh"}}>
            <Row >
                <Col style={{margin:0,padding:0, display:"flex", justifyContent:'center'}} xs={4}>
                    <Button variant='danger'   disabled={selectedIDs.length>=1? false: true}>Del</Button>
                    <Button variant='warning'  disabled={selectedIDs.length>=1? false: true}>Stat</Button>
                </Col>
                <Col xs={8} style={{margin:0,padding:0}}>
                    <Form style={{display:"flex"}} onSubmit={(e)=>creatingNewTask(newTask, e)}>
                        <Form.Control value={newTask} id='createTaskInput' onChange={(e)=>setNewTask(e.target.value)} />
                        <Button variant='success' id='createTaskButton' disabled={showCreate} type="submit">Create</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}