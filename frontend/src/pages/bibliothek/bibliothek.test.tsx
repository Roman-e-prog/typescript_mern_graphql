import {screen, render} from '@testing-library/react';
import Bibliothek from './Bibliothek';

describe.only('initial test', ()=>{
    it.skip('Bibliothek is in the document', ()=>{
        render(<Bibliothek/>)
        const bibliothek = screen.getByText(/Bibliothek/i);
        expect(bibliothek).toBeInTheDocument();
    })
})