import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import { TaskInterface } from '../App'

interface IdSelectionProps{
    task: TaskInterface;
}




export const Task: React.FC<IdSelectionProps>=({task})=>{
    return(
        <Row className='task'>

            <Col xs={9} className='taskTitle'>
                {task.Title}
            </Col>
            
        </Row>
    )
}