import React from 'react';
import {screen, render, waitFor, cleanup} from '@testing-library/react';
import Login from './Login';
import { MockedProvider } from '@apollo/client/testing';
import { LOGIN_USER } from '../../mutations/userMutations';
import { log } from 'console';
import { UserContext } from '../../userContext/UserContext';
import userEvent from '@testing-library/user-event';
afterEach(()=>{
    jest.clearAllMocks();
})
beforeEach(()=>{
    cleanup();
})
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn()
}))
const user = {
    vorname:"",
    nachname:"",
    username:"",
    email:"",
    password:"",
    profilePicture:"",
    isAdmin:false,
};
const handleLogin = jest.fn();
const handleLogout = jest.fn();
const mocks = [
    {
        request:{
            query: LOGIN_USER,
            variables:{
                username:'RomanArmin',
                email:'roman@test.de',
                password:'1234567'
            }
        },
        result:{
            data:{
                user:{id:1,  username:'RomanArmin',  email:'roman@test.de', password:'1234567'}
            }
        }
    }
]
describe.only('initial test', ()=>{
    it('Login is in the document', ()=>{
        render(<Login/>)
        const login = screen.getByText(/Login/i);
        expect(login).toBeInTheDocument();
    })
    it.only('test if all inputs are there', async ()=>{
        render(
            //@ts-ignore
                <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Login/>   
                    </MockedProvider>
                </UserContext.Provider>
        )
         screen.debug()
         const loginForm = screen.getByTestId('loginForm')
         const username = screen.getByRole('textbox', {
             name:/username/i
         })
         const email = screen.getByRole('textbox', {
             name:/email/i
         })
         const password = screen.getByTestId(/password/i)
         const loginBtn = screen.getByRole('button', {
             name:/login/i
         })
         expect(loginForm).toBeInTheDocument();
         expect(username).toBeInTheDocument();
         expect(email).toBeInTheDocument();
         expect(password).toBeInTheDocument();
         expect(loginBtn).toBeInTheDocument();

         await waitFor(()=>{
            userEvent.type(username, 'RomanArmin');
            userEvent.type(email, 'roman@test.de');
            userEvent.type(password, '1234567');
            userEvent.click(loginBtn)
         })
         expect(loginBtn).toBeDisabled()
     
    })
})