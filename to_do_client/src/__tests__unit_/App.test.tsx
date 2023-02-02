import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from 'react-test-renderer';
import axios from 'axios';
import { getTasks } from "../App";
import App from "../App";

vi.mock('axios')

describe("App.tsx",()=>{
    describe("getTasks function",()=>{
        it("will return 2 arrays of tasks [completed/pending]",async ()=>{
            const mockedAxios= axios as Mocked<typeof axios>;
            mockedAxios.get.mockResolvedValue({data:{completed:[],pending:[]}})
            const tasks=await getTasks()
            expect(tasks).toStrictEqual({completed:[],pending:[]})
        })
    })
})

describe("App.tsx",()=>{
    it("will create and match snapshot",()=>{
        const myApp= TestRenderer.create(<App/>)
        expect(myApp).toMatchSnapshot()
    })
})