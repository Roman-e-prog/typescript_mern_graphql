import {screen, render, waitFor, act} from '@testing-library/react';
import Register from './Register';
import LanguageProvider from '../../components/languageContext/LanguageContext';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { REGISTER_USER, UNIQUE_EMAIL, UNIQUE_USERNAME } from '../../mutations/userMutations';
import {MockedProvider} from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

const mocks = [
    {
        request:{
            query: REGISTER_USER,
            variables:{
                vorname:"Roman",
                nachname:"MyName",
                username:"RomanArmin",
                email:"roman@test.de",
                password:"1234567"
            }
        },
        result:{
            data:{
                user:{id:1, vorname:"Roman", nachname:"MyName",  username:"RomanArmin", password:"1234567" }
            }
        }
    }
]
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn()
}))
describe('initial test and query tests', ()=>{
    it('Register is in the document', ()=>{
        render(<Register/>)
        const register = screen.getByText(/Register/i);
        expect(register).toBeInTheDocument();
    })
    it.only("Register has all its inputs", async ()=>{
        render(<LanguageProvider>
                <BrowserRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Register/>
                    </MockedProvider>
                </BrowserRouter>
            </LanguageProvider>)
        const vorname = screen.getByRole('textbox',{
            name:/vorname/i
        })
        const nachname = screen.getByRole('textbox',{
            name:/nachname/i
        })
        const username = screen.getByRole('textbox',{
            name:/username/i
        })
        const email = screen.getByRole('textbox',{
            name:/email/i
        })
        const password = screen.getByLabelText('Passwort')
        const passwordValidation = screen.getByLabelText(/Passwort Validieren/i)
        const registerButton = screen.getByRole('button',{
            name:/registrieren/i
        })
        expect(vorname).toBeInTheDocument();
        expect(nachname).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(passwordValidation).toBeInTheDocument();

        await waitFor(()=>{
            userEvent.type(vorname, 'Roman');
            userEvent.type(nachname, 'MyName');
            userEvent.type(username, 'RomanArmin');
            userEvent.type(email, 'roman@test.de');
            userEvent.type(password, '1234567');
            userEvent.type(passwordValidation, '1234567');
        })
        expect(vorname).toHaveValue('Roman')
        expect(nachname).toHaveValue('MyName')
        expect(username).toHaveValue('RomanArmin')
        expect(email).toHaveValue('roman@test.de')
        expect(password).toHaveValue('1234567')

        act(()=>{
            userEvent.click(registerButton);
        })
        

    })     
})