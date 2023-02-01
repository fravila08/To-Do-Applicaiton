import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import { Tasks } from '../App'

interface IdSelectionProps{
    selected: number[];
    setSelected: (selected: number[]) => void;
    task: Tasks;
}




export const Task: React.FC<IdSelectionProps>=({setSelected, selected, task})=>{
    return(
        <Row style={{backgroundColor:"grey", border:"black 2px solid"}}>
            <Col xs={8} style={{display:'flex'}}>
                {task.Title}
            </Col>
            <Col xs={2}>
                <Form.Check type="checkbox" label="select" 
                onChange={(e)=>{e.target.checked?
                    setSelected([...selected, task.id])
                    :
                    setSelected(selected.filter(item=> item !== task.id))
                    }} 
                />
            </Col>
        </Row>
    )
}