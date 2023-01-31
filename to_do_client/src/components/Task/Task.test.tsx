import { Task} from "./Task";
import {addToSelection} from "./Task"
import { useState } from "react";

import { describe, expect, it, vi } from "vitest";
import TestRenderer from 'react-test-renderer';

describe("This will control the array of selected id's",()=>{
    it("will take in an id, whether a task is checked, and the useState functions for selectedIDs",()=>{
        let selected=[]
        const setSelected=(v)=>{selected=v}
        let checked=true
        let id=1
        expect(addToSelection(selected, setSelected, id, checked)).toEqual([1])
    })
})

describe("This will control the array of selected id's",()=>{
    it("will take in an id, whether a task is checked, and the useState functions for selectedIDs",()=>{
        let selected=[1]
        const setSelected=(v)=>{selected=v}
        let checked=false
        let id=1
        expect(addToSelection(selected, setSelected, id, checked)).toEqual([])
    })
})

describe("Will take a snapshot of the current Task compenent",()=>{
    it("will create a snapshot",()=>{
        let selected=[]
        const setSelected=(v)=>{selected=v}
        const header= TestRenderer.create(<Task 
            setSelected={setSelected} 
            selected={selected} 
            task={{"id":1,"title":"Style"}}
          />)
        expect(header).toMatchSnapshot()
    })
})