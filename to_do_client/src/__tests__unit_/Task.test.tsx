import { Task} from "../components/Task";
import { describe, expect, it} from "vitest";
import TestRenderer from 'react-test-renderer';



describe("Will take a snapshot of the current Task compenent",()=>{
    it("will create a snapshot",()=>{
        let selected:number[]=[]
        const setSelected=(v:number[])=>{selected=v}
        const header= TestRenderer.create(<Task 
            setSelected={setSelected} 
            selected={selected} 
            task={{"id":1,"Title":"Style", "Completed":false}}
          />)
        expect(header).toMatchSnapshot()
    })
})