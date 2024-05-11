import {screen, render} from '@testing-library/react';
import Forum from './Forum';


describe.skip('initial test', ()=>{
    it.skip('Forum is in the document', ()=>{
        render(<Forum/>)
        const forum = screen.getByText(/Forum/i);
        expect(forum).toBeInTheDocument();
    })
})
