import {screen, render} from '@testing-library/react';
import Blog from './Blog';

describe.only('initial test', ()=>{
    it.skip('Blog is in the document', ()=>{
        render(<Blog/>)
        const blog = screen.getByText(/Blog/i);
        expect(blog).toBeInTheDocument();
    })
})