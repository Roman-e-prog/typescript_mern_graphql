import {screen, render, waitFor, waitForElementToBeRemoved, cleanup} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import BibliothekComponent from './BibliothekComponent';
import { ADD_BIBLIOTHEK, DELETE_BIBLIOTHEK, UPDATE_BIBLIOTHEK } from '../../../mutations/bibliothekMutations';
import { GET_BIBLIOTHEK, GET_BIBLIOTHEKS } from '../../../queries/BibliothekQueries';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

afterEach(()=>{
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
})
const mocks = [
    {
        request:{
            query:ADD_BIBLIOTHEK,
            variables:{
                videoTheme:'Ein Test Thema',
                videoContent:'Ein Test Inhalt',
                url:'https://www.youtube.com/watch=123456',
                ressort:'HTML',
            }
        },
        result:{
            data:{
                addBibliothek:{
                    id:1,
                    __typename:'BibliothekType',
                    videoTheme:'Ein Test Thema',
                    videoContent:'Ein Test Inhalt',
                    url:'https://www.youtube.com/watch=123456',
                    ressort:'HTML',
                }
            }
        }
    },
    {
        request:{
            query:GET_BIBLIOTHEKS
        },
        result:{
            data:{
                bibliotheks:[
                    {
                        id:1,
                        __typename:'BibliothekType',
                        videoTheme:'Ein Test Thema',
                        videoContent:'Ein Test Inhalt',
                        url:'https://www.youtube.com/watch=123456',
                        ressort:'HTML',
                    }
                ]
            }
        }
    },
    {
        request:{
            query:GET_BIBLIOTHEK,
            variables:{id:null}
        },
        result:{
            data:{
                bibliothek:{
                    id:null,
                    __typename:'',
                    videoTheme:'',
                    videoContent:'',
                    url:'',
                    ressort:'',
                }
            }
        }
    },
    {
        request:{
            query:GET_BIBLIOTHEK,
            variables:{id:1}
        },
        result:{
            data:{
                bibliothek:{
                    id:1,
                    __typename:'BibliothekType',
                    videoTheme:'Ein Test Thema',
                    videoContent:'Ein Test Inhalt',
                    url:'https://www.youtube.com/watch=123456',
                    ressort:'HTML',
                }
            }
        }
    },
    {
        request:{
            query:UPDATE_BIBLIOTHEK,
            variables:{
                id:1,
                videoTheme:'Ein anderes Test Thema',
                videoContent:'Ein anderer Test Inhalt',
                url:'https://www.youtube.com/watch=1234567',
                ressort:'CSS',
            }
        },
            result:{
                data:{
                    updateBibliothek:{
                        id:1,
                        __typename:'BibliothekType',
                        videoTheme:'Ein anderes Test Thema',
                        videoContent:'Ein anderer Test Inhalt',
                        url:'https://www.youtube.com/watch=1234567',
                        ressort:'CSS',
                    }
                }
            }
    },
    {
        request:{
            query:GET_BIBLIOTHEKS
        },
        result:{
            data:{
                bibliotheks:[
                    {
                        id:1,
                        __typename:'BibliothekType',
                        videoTheme:'Ein anderes Test Thema',
                        videoContent:'Ein anderer Test Inhalt',
                        url:'https://www.youtube.com/watch=1234567',
                        ressort:'CSS',
                    }
                ]
            }
        }
    },
    {
        request:{
            query:DELETE_BIBLIOTHEK,
            variables:{id:1}
        },
        result:{
            data:{
                deleteBibliothek:{
                    id:1,
                    __typename:'BibliothekType',
                }
            }
        }
    },
    {
        request:{
            query:GET_BIBLIOTHEKS,
        },
        result:{
            data:{
                bibliotheks:[],
            }
        }
    }
];
describe('test the functionallity for the bibliothek component', ()=>{
    it('test the add', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                   <BibliothekComponent/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        const videoTheme = screen.getByRole('textbox', {
            name:/Thema des Videos/i
        });
        const videoContent = screen.getByRole('textbox', {
            name:/Inhalt des Videos/i
        });
        const url = screen.getByRole('textbox', {
            name:/Url des Videos/i
        });
        const ressort = screen.getByRole('textbox', {
            name:/Themen Ressort/i
        });
        const sendBtn = screen.getByRole('button', {
            name:/Absenden/i
        });

        expect(videoTheme).toBeInTheDocument();
        expect(videoContent).toBeInTheDocument();
        expect(url).toBeInTheDocument();
        expect(ressort).toBeInTheDocument();
        expect(sendBtn).toBeInTheDocument();

        await waitFor(()=>{
            userEvent.type(videoTheme, 'Ein Test Thema')
            userEvent.type(videoContent, 'Ein Test Inhalt')
            userEvent.type(url, 'https://www.youtube.com/watch=123456')
            userEvent.type(ressort, 'HTML')
            userEvent.click(sendBtn);
        })
        expect(sendBtn).toBeDisabled();
        screen.debug();
        await waitFor(async ()=>{
            expect(await screen.findByText('Ein Test Thema')).toBeInTheDocument();
            expect(await screen.findByText('Ein Test Inhalt')).toBeInTheDocument();
            const iframe = await screen.findByTestId('iframe') as HTMLIFrameElement;
            expect(iframe.src).toContain('https://www.youtube.com/embed/123456');
            expect(await screen.findByText('HTML')).toBeInTheDocument();
        },{timeout:20000})
    }, 45000)
    it('test the update', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <BibliothekComponent/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        const editBtns = await screen.findAllByTestId('editBtn')
        expect(editBtns).toHaveLength(1);

        await waitFor(()=>{
            userEvent.click(editBtns[0])
        })
        const editBibliothekForm = await screen.findByTestId('editBibliothekForm');
        expect(editBibliothekForm).toBeInTheDocument();
        const videoThemeEdit = screen.getByTestId('videoThemeEdit');
        const videoContentEdit = screen.getByTestId('videoContentEdit');
        const urlEdit = screen.getByTestId('urlEdit');
        const ressortEdit = screen.getByTestId('ressortEdit');
        const bibliothekEditSend = screen.getByTestId('bibliothekEditSend');

        expect(videoThemeEdit).toBeInTheDocument();
        expect(videoContentEdit).toBeInTheDocument();
        expect(urlEdit).toBeInTheDocument();
        expect(ressortEdit).toBeInTheDocument();
        expect(bibliothekEditSend).toBeInTheDocument();

        expect(videoThemeEdit).toHaveValue('Ein Test Thema');
        expect(videoContentEdit).toHaveValue('Ein Test Inhalt');
        expect(urlEdit).toHaveValue('https://www.youtube.com/watch=123456');
        expect(ressortEdit).toHaveValue('HTML');

        await waitFor( async ()=>{
            userEvent.clear(videoThemeEdit)
            userEvent.type(videoThemeEdit, 'Ein anderes Test Thema')
            userEvent.clear(videoContentEdit)
            userEvent.type(videoContentEdit, 'Ein anderer Test Inhalt')
            userEvent.clear(urlEdit)
            userEvent.type(urlEdit, 'https://www.youtube.com/watch=1234567')
            userEvent.clear(ressortEdit)
            userEvent.type(ressortEdit, 'CSS')
            userEvent.click(bibliothekEditSend);
        }, {timeout:10000})
        expect(bibliothekEditSend).toBeDisabled();
        expect( await screen.findByText('Update erfolgreich')).toBeInTheDocument();
        await waitFor(async ()=>{
            expect(editBibliothekForm).not.toBeInTheDocument();
            await new Promise((r)=> setTimeout(r, 5000))
        }, {timeout:10000})
   
        await waitFor(async ()=>{
            expect(await screen.findByText('Ein anderes Test Thema')).toBeInTheDocument();
            expect(await screen.findByText('Ein anderer Test Inhalt')).toBeInTheDocument();
            const iframe = await screen.findByTestId('iframe') as HTMLIFrameElement;
            expect(iframe.src).toContain('https://www.youtube.com/embed/1234567')
            expect(await screen.findByText('CSS')).toBeInTheDocument();
        },{timeout:20000})
    }, 70000)
    it('test the delete', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                <BibliothekComponent/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))

        const deleteBtns = await screen.findAllByTestId('deleteBtn');
        expect(deleteBtns).toHaveLength(1);

        await waitFor(async ()=>{
            userEvent.click(deleteBtns[0])
            await new Promise((r)=> setTimeout(r, 15000))
        },{timeout:20000})
        expect(await screen.findByText('Videobeitrag erfolgreich gelöscht')).toBeInTheDocument();
    }, 30000)
})