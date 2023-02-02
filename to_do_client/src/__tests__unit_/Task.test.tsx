import { Task } from "../components/Task";
import { describe, expect, it} from "vitest";
import TestRenderer from 'react-test-renderer';



describe("Task.tsx",()=>{
    it("will create and match a snapshot",()=>{
        const header= TestRenderer.create(<Task 
            task={{"id":1,"Title":"Style", "Completed":false}}
        />)
        expect(header).toMatchSnapshot()
    })
})