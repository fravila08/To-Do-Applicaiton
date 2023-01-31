import { Task} from "./Task";
import { useState } from "react";

import { describe, expect, it, vi } from "vitest";
import TestRenderer from 'react-test-renderer';



describe("Will take a snapshot of the current Task compenent",()=>{
    it("will create a snapshot",()=>{
        let selected:number[]=[]
        const setSelected=(v:number[])=>{selected=v}
        const header= TestRenderer.create(<Task 
            setSelected={setSelected} 
            selected={selected} 
            task={{"id":1,"title":"Style"}}
          />)
        expect(header).toMatchSnapshot()
    })
})