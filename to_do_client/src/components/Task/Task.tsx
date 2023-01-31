import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import { Tasks } from '../../App'

interface IdSelectionProps{
    selected: number[];
    setSelected: (selected: number[]) => void;
    task: Tasks;
}

// export function addToSelection(selected:number[],id:number, checked:boolean){
//     console.log("hello")
//     let mySelected=selected
//     if(checked){
//         mySelected.push(Number(id))
//     }
//     else{
//         let newSelected:number[]=[]
//         for(let i=0; i< mySelected.length; i++){
//             if(mySelected[i]!==id){
//                 newSelected.push(mySelected[i])
//             }
//         }
//         mySelected=newSelected
//     }
//     console.log(mySelected,'s')
//     return mySelected
// }


export const Task: React.FC<IdSelectionProps>=({setSelected, selected, task})=>{
    const [mySelected, setMySelected]=useState<number[]>(selected)
    
    useEffect(()=>{
        setMySelected(selected)
    },[selected])


    return(
        <Row style={{backgroundColor:"grey", border:"black 2px solid"}}>
            <Col xs={9}>
                {task.title}
            </Col>
            <Col xs={2}>
                <Form.Check type="checkbox" label="select" 
                onChange={(e)=>{
                    if(e.target.checked){
                    setSelected([...selected, task.id])
                    }
                    else{ setSelected(selected.filter(item=> item !== task.id))}
                    }} 
                
                />
            </Col>
        </Row>
    )
}