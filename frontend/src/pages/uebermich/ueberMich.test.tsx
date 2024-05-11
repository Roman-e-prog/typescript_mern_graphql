import {screen, render} from '@testing-library/react';
import Uebermich from './Uebermich';

describe.only('initial test', ()=>{
    it.skip('Uebermich is in the document', ()=>{
        render(<Uebermich/>)
        const uebermich = screen.getByText(/Uebermich/i);
        expect(uebermich).toBeInTheDocument();
    })
})