import { describe, expect, it, vi } from "vitest";
import TestRenderer from 'react-test-renderer';
import { Header, createTask } from "./Header";
import axios from 'axios';

vi.mock('axios')

// describe("This will confirm the correct information will be sent on `post`",()=>{
//     it("will create a new task with the current content in the input bar", async()=>{
//         (axios.post as vi.Mock).mockResolvedValue({data:{itemCreated:true}})
//         let name="Style this app"
//         let createtask= await createTask(name)
//         expect(createtask).toBeTruthy()
//     })
// })


describe("Will take a snapshot of the current Header compenent",()=>{
    it("will create a snapshot",()=>{
        let selectedIDs:number[]=[]
        const header= TestRenderer.create(<Header selectedIDs={selectedIDs}/>)
        expect(header).toMatchSnapshot()
    })
})