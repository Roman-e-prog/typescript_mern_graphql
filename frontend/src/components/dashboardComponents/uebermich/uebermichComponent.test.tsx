import {screen, render, waitForElementToBeRemoved, waitFor, cleanup, act} from '@testing-library/react';
import UeberMichComponent from './UeberMichComponent';
import { GET_UEBERMICH, GET_UEBERMICHS } from '../../../queries/UeberMichqueries';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_UEBERMICH, DELETE_UEBERMICH, UPDATE_UEBERMICH } from '../../../mutations/ueberMichMutations';
import userEvent from '@testing-library/user-event';
import { log } from 'console';
import { BrowserRouter } from 'react-router-dom';

afterEach(()=>{
    jest.clearAllMocks();
})
beforeEach(()=>{
    cleanup();
})
const addUebermichVariables = {
    id:2,
    myPerson:'Lorem Ipsum ad Dolores'
}
const mocks = [
    {
        delay:30,
        request:{
            query:ADD_UEBERMICH,
            variables:addUebermichVariables
        },
        result:{
            data:[{myPerson:'Lorem Ipsum ad Dolores'}]
        }
    },
  {  
    request:{
        query:GET_UEBERMICHS,
    },
    result:{
        data:{
                uebermichs:[{id:2, __typename:'UebermichType', myPerson:'Lorem Ipsum ad Dolores'}]   
        }
    },
},
  {  
    request: {
        query: GET_UEBERMICH,
        variables: { id: null },
      },
      result: {
        data: {
            uebermich:{
                id: null,
                __typename: 'UebermichType',
                myPerson: '',
            }
          },
        },
},
{  
    request: {
        query: GET_UEBERMICH,
        variables: { id: 2 },
      },
      result: {
        data: {
            uebermich:{
                id: 2,
                __typename: 'UebermichType',
                myPerson: 'Lorem Ipsum ad Dolores',
            }
          },
        },
},
{
    request:{
        query:UPDATE_UEBERMICH,
        variables:{id:2, myPerson:'Lorem Ipsum ad Dolores Update'}
    },
    result:{
        data:{
            updateUebermich:{
                 id:2, 
                __typename:'UebermichType',
                myPerson:'Lorem Ipsum ad Dolores Update'
            }
        }
    }
},
{
    request: {
      query: GET_UEBERMICHS,
    },
    result: {
      data: {
        uebermichs: [{id:2, __typeName:'UebermichType', myPerson:'Lorem Ipsum ad Dolores Update'}], 
      },
    },
  },
  {  
    request:{
        query:DELETE_UEBERMICH,
        variables:{id:2}
    },
    result:{
            data:{
                deleteUebermich:{
                    id:2, 
                    __typename:'UebermichType'
                }    
        } 
    },
},
{
    request: {
      query: GET_UEBERMICHS,
    },
    result: {
      data: {
        uebermichs: [], // Return an empty array to simulate that the entry has been deleted
      },
    },
  },
]

describe('initial test', ()=>{
    it.skip('UeberMichComponent is in the document', ()=>{
        render(<UeberMichComponent/>)
        const ueberMichComponent = screen.getByText(/UeberMichComponent/i);
        expect(ueberMichComponent).toBeInTheDocument();
    })
    it('test the post', async ()=>{
        const {queryByTestId} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <UeberMichComponent/>
                </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        const myPerson = screen.getByRole('textbox', {
            name:/Zu meiner Person/i
        })
        const sendButton = screen.getByRole('button', {
            name:/Absenden/i
        })
        expect(myPerson).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();
        await waitFor(()=>{
            userEvent.type(myPerson, 'Lorem Ipsum ad Dolores');
            expect(myPerson).toHaveValue('Lorem Ipsum ad Dolores')
            userEvent.click(sendButton)
        })
        const myPersonTag = await screen.findByTestId('myPersonTag');
        expect(myPersonTag).toHaveTextContent('Lorem Ipsum ad Dolores')
    })
    it('test the get', async ()=>{
       const {queryByTestId} = render(
        <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <UeberMichComponent/>
                </BrowserRouter>
                </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'));
       
        await waitFor(async ()=>{
            const myPerson = await screen.findByTestId('myPersonTag');
            expect(myPerson).toBeInTheDocument();
            expect(myPerson).toHaveTextContent('Lorem Ipsum ad Dolores');
        },{timeout:20000})
    }, 30000)
    it('test the update', async ()=>{
             const {queryByTestId} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <BrowserRouter>
                        <UeberMichComponent/>
                    </BrowserRouter>
                    </MockedProvider>
            )
            await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
            const editButton = await screen.findByTestId('editButton');
            expect(editButton).toBeInTheDocument();

            await waitFor(async ()=>{
                userEvent.click(editButton)
                await new Promise((r)=> setTimeout(r, 2000))
            },{timeout:20000})
            await waitFor(async ()=>{
                const editForm = await screen.findByTestId('editUebermichForm');
                expect(editForm).toBeInTheDocument();
            },{timeout:20000})
            const myPersonEdit = await screen.findByTestId('myPersonEdit');
            expect(myPersonEdit).toBeInTheDocument();
            expect(myPersonEdit).toHaveValue('Lorem Ipsum ad Dolores');

            await waitFor(()=>{
                userEvent.clear(myPersonEdit);
                userEvent.type(myPersonEdit,'Lorem Ipsum ad Dolores Update')
                const editUebermichSubmit = screen.getByTestId('editUebermichSubmit')
                userEvent.click(editUebermichSubmit)
            })

            await waitFor(async ()=>{
            const myPerson = await screen.findByTestId('myPersonTag');
            expect(myPerson).toBeInTheDocument();
            expect(myPerson).toHaveTextContent('Lorem Ipsum ad Dolores Update');
            }, {timeout:20000})
    }, 120000)
    it('test the delete', async ()=>{
        const {queryByTestId} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <BrowserRouter>
                        <UeberMichComponent/>
                    </BrowserRouter>
                    </MockedProvider>
            )
            // await waitForElementToBeRemoved(()=>queryByTestId('spinner'));
            const deleteButton = await screen.findByTestId('deleteButton');
            expect(deleteButton).toBeVisible();

            await waitFor(async ()=>{
                userEvent.click(deleteButton)
                await new Promise((r)=> setTimeout(r, 5000))
            },{timeout:50000})
            await waitFor(() => {
                expect(screen.getByText('Deine Personenbeschreibung wurde erfolgreich gelöscht')).toBeInTheDocument()
            },{timeout:30000})  
    },80000)
})