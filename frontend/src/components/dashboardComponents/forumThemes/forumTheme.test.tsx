import {screen, render, waitFor, waitForElementToBeRemoved, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import ForumThemes from './ForumThemes';
import { ADD_FORUMTHEME, DELETE_FORUMTHEME, UPDATE_FORUMTHEME } from '../../../mutations/forumThemeMutations';
import { GET_FORUMTHEME, GET_FORUMTHEMES } from '../../../queries/ForumThemeQueries';

afterEach(()=>{
    jest.clearAllMocks();
    cleanup();
})

const mocks = [
    {
        request:{
            query:ADD_FORUMTHEME,
            variables:{
                id:1,
                forumtheme:"Ein Test Thema",
                forumressort:"HTML",
                forumcontent:"Ein Test Inhalt",
            },
        },
        result:{
            data:{
                addForumTheme:{
                    id:1,
                    __typename:'ForumThemeType',
                    forumtheme:"Ein Test Thema",
                    forumressort:"HTML",
                    forumcontent:"Ein Test Inhalt", 
                }
            }
        }
    },
    {
        request:{
            query:GET_FORUMTHEMES
        },
        result:{
            data:{
                forumThemes:[{
                    id:1,
                    __typename:'ForumThemeType',
                    forumtheme:"Ein Test Thema",
                    forumressort:"HTML",
                    forumcontent:"Ein Test Inhalt", 
                }]
            }
        }
    },
    {
        request:{
            query:GET_FORUMTHEME,
            variables:{id:null},
        },
        result:{
            data:{
                forumTheme:{
                    id:null,
                    __typename:'ForumThemeType',
                    forumtheme:"",
                    forumressort:"",
                    forumcontent:"", 
                }
            }
        }
    },
    {
        request:{
            query:GET_FORUMTHEME,
            variables:{id:1},
        },
        result:{
            data:{
                forumTheme:{
                    id:1,
                    __typename:'ForumThemeType',
                    forumtheme:"Ein Test Thema",
                    forumressort:"HTML",
                    forumcontent:"Ein Test Inhalt", 
                }
            }
        }
    },
    {
        request:{
            query:UPDATE_FORUMTHEME,
            variables:{
                id:1,
                forumtheme:"Ein Test Thema Update",
                forumressort:"CSS",
                forumcontent:"Ein Test Inhalt Update", 
            },
        },
        result:{
            data:{
                updateForumTheme:{
                    id:1,
                    __typename:'ForumThemeType',
                    forumtheme:"Ein Test Thema Update",
                    forumressort:"CSS",
                    forumcontent:"Ein Test Inhalt Update", 
                }
            }
        }
    },
    {
        request:{
            query:GET_FORUMTHEMES,
        },
        result:{
            data:{
                forumThemes:[{
                    id:1,
                    __typename:'ForumThemeType',
                    forumtheme:"Ein Test Thema Update",
                    forumressort:"CSS",
                    forumcontent:"Ein Test Inhalt Update", 
                }]
            }
        }
    },
    {
        request:{
            query:DELETE_FORUMTHEME,
            variables:{id:1},
        }, 
        result:{
            data:{
                deleteForumTheme:{
                    id:1,
                    __typename:'ForumThemeType',
                }
            }
        }
    },
    {
        request:{
            query:GET_FORUMTHEMES
        },
        result:{
            data:{
                forumThemes:[]
            }
        }
    },
];

describe('test the forumTheme functionallity', ()=>{
    it('test the add', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                <ForumThemes/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'));
        screen.debug;
        const forumTheme = screen.getByRole('textbox',{
            name:/Forum Thema/i
        });
        const forumRessort = screen.getByRole('textbox',{
            name:/Forum Ressort/i
        });
        const forumContent = screen.getByRole('textbox',{
            name:/Forum Inhalt/i
        });
        const sendButton = screen.getByRole('button',{
            name:/Absenden/i
        });

        expect(forumTheme).toBeInTheDocument();
        expect(forumRessort).toBeInTheDocument();
        expect(forumContent).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();

        await waitFor(async ()=>{
            userEvent.type(forumTheme, 'Ein Test Thema');
            expect(forumTheme).toHaveValue('Ein Test Thema');
            userEvent.type(forumRessort, 'HTML');
            expect(forumRessort).toHaveValue('HTML');
            userEvent.type(forumContent, 'Ein Test Inhalt');
            expect(forumContent).toHaveValue('Ein Test Inhalt');
            userEvent.click(sendButton);
            await new Promise((r)=> setTimeout(r, 5000))
        },{timeout:10000})

        expect(await screen.findByText('Ein Test Thema')).toBeInTheDocument();
        expect(await screen.findByText('HTML')).toBeInTheDocument();
        expect(await screen.findByText('Ein Test Inhalt')).toBeInTheDocument();
    },20000)
    it('test the update', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <ForumThemes/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        const editBtns = await screen.findAllByTestId('editBtn')
        expect(editBtns).toHaveLength(1);

        await waitFor(()=>{
            userEvent.click(editBtns[0])
        })
            const forumThemesEditForm = await screen.findByTestId('forumThemesEditForm');
            const forumthemeEdit = await screen.findByTestId('forumthemeEdit');
            const forumressortEdit = await screen.findByTestId('forumressortEdit');
            const forumcontentEdit = await screen.findByTestId('forumcontentEdit');
            const editForumthemeSubmit = await screen.findByTestId('editForumthemeSubmit');
            expect(forumThemesEditForm).toBeInTheDocument();
            expect(forumthemeEdit).toBeInTheDocument();
            expect(forumressortEdit).toBeInTheDocument();
            expect(forumcontentEdit).toBeInTheDocument();
            expect(editForumthemeSubmit).toBeInTheDocument();

            expect(forumthemeEdit).toHaveValue('Ein Test Thema');
            expect(forumressortEdit).toHaveValue('HTML');
            expect(forumcontentEdit).toHaveValue('Ein Test Inhalt');
            await waitFor(async ()=>{
                userEvent.clear(forumthemeEdit)
                userEvent.type(forumthemeEdit, 'Ein Test Thema Update')
                userEvent.clear(forumressortEdit)
                userEvent.type(forumressortEdit, 'CSS')
                userEvent.clear(forumcontentEdit)
                userEvent.type(forumcontentEdit, 'Ein Test Inhalt Update')
                expect(forumthemeEdit).toHaveValue('Ein Test Thema Update')
                expect(forumressortEdit).toHaveValue('CSS')
                expect(forumcontentEdit).toHaveValue('Ein Test Inhalt Update')
                userEvent.click(editForumthemeSubmit);
                await new Promise((r)=>setTimeout(r, 5000))
            }, {timeout:10000})
            expect(forumThemesEditForm).not.toBeInTheDocument();
            expect( await screen.findByText('Ein Test Thema Update')).toBeInTheDocument();
            expect( await screen.findByText('CSS')).toBeInTheDocument();
            expect( await screen.findByText('Ein Test Inhalt Update')).toBeInTheDocument();
    }, 15000)
    it('test the delete', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <ForumThemes/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        const deleteBtns = await screen.findAllByTestId('deleteBtn')
        expect(deleteBtns).toHaveLength(1);

        await waitFor(()=>{
            userEvent.click(deleteBtns[0])
        })
        expect(await screen.findByText('Forumthema wurde gelöscht')).toBeInTheDocument();
    })
})