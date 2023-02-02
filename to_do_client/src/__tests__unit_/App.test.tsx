import { describe, expect, it, vi } from "vitest";
import TestRenderer from 'react-test-renderer';
import { Mocked } from "vitest";
import axios from 'axios';
import { getTasks } from "../App";
import App from "../App";

vi.mock('axios')

describe("Interacts with database to get data",()=>{
    it("will mock axios to test it's funcionality",async ()=>{
        const mockedAxios= axios as Mocked<typeof axios>;
        mockedAxios.get.mockResolvedValue({data:{completed:[],pending:[], bigId:0}})
        const tasks=await getTasks()
        expect(tasks).toStrictEqual({completed:[],pending:[],bigId:0})
    })
})

describe("Will take a snapshot of the current Header compenent",()=>{
    it("will create a snapshot",()=>{
        const myApp= TestRenderer.create(<App/>)
        expect(myApp).toMatchSnapshot()
    })
})