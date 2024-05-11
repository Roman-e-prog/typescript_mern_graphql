import {screen, render, waitFor, waitForElementToBeRemoved, cleanup, fireEvent} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BlogpostComponent from './BlogpostComponent';
import { ADD_BLOGPOST, DELETE_BLOGPOST, UPDATE_BLOGPOST } from '../../../mutations/blogpostMutations';
import { BrowserRouter } from 'react-router-dom';
import { GET_BLOGPOST, GET_BLOGPOSTS } from '../../../queries/BlogpostQueries';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { log } from 'console';
afterEach(()=>{
    jest.clearAllMocks();
})
// beforeEach(()=>{
//     cleanup();
// })

global.FormData = class FormData {
    data: Record<string, any> = {};
  
    append(key: string, value: any) {
      this.data[key] = value;
    }
  
    get(key: string) {
      return this.data[key];
    }
  } as any;
  global.fetch = require('jest-fetch-mock');
(fetch as any).mockResponse(JSON.stringify({ images: ['hallo2.jpg'], cloudinaryIds: ['1234567']}));
const mocks = [
    {
        request:{
            query:ADD_BLOGPOST,
            variables:{
                id:1,
                blogtheme:'Ein Test Thema',
                blogdescription:'Eine Testbeschreibung',
                blogtext:'Lorem Ipsum ad Dolores',
                images:['hallo2.jpg'],
                author:'Roman',
                cloudinaryIds:['1234567']
            }
        },
        result:{
            data:{
                addBlogpost:{
                    id:1,
                    __typename:'BlogpostType',
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    images:['hallo2.jpg'],
                    author:'Roman',
                    cloudinaryIds:['1234567']
                }
            }
        }
    },
    {
        request:{
            query:GET_BLOGPOSTS,
        },
        result:{
            data:{
                blogposts:[
                    {   
                    id:1,
                    __typename:'BlogpostType',
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    images:['hallo2.jpg'],
                    author:'Roman',
                    },
                ]
            }
        }
    },
    {
        request:{
            query:GET_BLOGPOST,
            variables:{id:null}
        },
        result:{
            data:{
                blogpost:{
                    id:null,
                    __typename:'BlogpostType',
                    blogtheme:'',
                    blogdescription:'',
                    blogtext:'',
                    images:[],
                    author:'',
                }
            }
        }
    },
    {
        request:{
            query:GET_BLOGPOST,
            variables:{id:1}
        },
        result:{
            data:{
                blogpost:{
                    id:1,
                    __typename:'BlogpostType',
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    images:['hallo2.jpg'],
                    author:'Roman',
                }
            }
        }
    },
    {
        request:{
            query:UPDATE_BLOGPOST,
            variables:{
                    id:1,
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine andere Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    author:'Roman',
                    images:['hallo2.jpg'],
                    cloudinaryIds:['1234567']
            }
        },
        result:{
            data:{
                updateBlogpost:{
                    id:1,
                    __typename:'BlogpostType',
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine andere Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    author:'Roman',
                    images:['hallo2.jpg'],
                    cloudinaryIds:['1234567']
                }
            }
        }
    },
    {
        request:{
            query:GET_BLOGPOSTS,
        },
        result:{
            data:{
                blogposts:[
                        {   
                    id:1,
                    __typename:'BlogpostType',
                    blogtheme:'Ein Test Thema',
                    blogdescription:'Eine andere Testbeschreibung',
                    blogtext:'Lorem Ipsum ad Dolores',
                    images:['hallo2.jpg'],
                    author:'Roman',
                    },
                ]
            }
        }
    },
    {
        request:{
            query:DELETE_BLOGPOST,
            variables:{id:1}
        },
        result:{
            data:{
                blogposts:{
                    id:1,
                    __typename:'BlogpostType'
                }
            }
        }
    },
    {
        request:{
            query:GET_BLOGPOSTS,
        },
        result:{
            data:{
                blogposts:[]
            }
        }
    },
]
describe('blogpost functionallity in dashboard', ()=>{
    it('test the add', async ()=>{
        const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                <BlogpostComponent/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        screen.debug();
        const blogTheme = screen.getByRole('textbox', {
            name:/Blog Thema/i
        })
        const blogDescription = screen.getByRole('textbox', {
            name:/Blog Beschreibung/i
        })
        const blogText = screen.getByRole('textbox', {
            name:/Blog Text/i
        })
        const images = screen.getByTestId('images') as HTMLInputElement;
        const author = screen.getByRole('textbox', {
            name:/Author/i
        })
        const sendButton = screen.getByTestId('blogpostAddBtn')
        expect(blogTheme).toBeInTheDocument();
        expect(blogDescription).toBeInTheDocument();
        expect(blogText).toBeInTheDocument();
        expect(images).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();
        const file = new File(['hallo2.jpg'], 'hallo2.jpg',{type:'images/jpg'})
        await waitFor( async ()=>{
            userEvent.type(blogTheme,'Ein Test Thema');
            userEvent.type(blogDescription,'Eine Testbeschreibung');
            userEvent.type(blogText,'Lorem Ipsum ad Dolores');
            userEvent.upload(images, file);
            userEvent.type(author, 'Roman');
        }, {timeout:10000})
        await waitFor(()=>{
            expect(blogTheme).toHaveValue('Ein Test Thema');
            expect(blogDescription).toHaveValue('Eine Testbeschreibung');
            expect(blogText).toHaveValue('Lorem Ipsum ad Dolores');
            expect(images.files![0].name).toBe("hallo2.jpg");
            expect(images.files!.length).toBe(1);
            expect(author).toHaveValue('Roman');
        })
        await waitFor(async ()=>{
                userEvent.click(sendButton);
            expect(sendButton).toBeDisabled();
            await new Promise((r)=> setTimeout(r, 5000))
        }, {timeout:10000})
       
        await waitFor(async ()=>{
            expect( await screen.findByText('Ein Test Thema')).toBeInTheDocument();
            expect( await screen.findByText('Eine Testbeschreibung')).toBeInTheDocument();
            expect(await screen.findByText('Lorem Ipsum ad Dolores')).toBeInTheDocument();
        },{timeout:20000});
      
    }, 80000)
    it('test the update', async ()=>{
               const {queryByTestId} = 
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                <BlogpostComponent/>
                </BrowserRouter>
            </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        screen.debug();
        const editBtns = await screen.findAllByTestId('editBtn');
        expect(editBtns).toHaveLength(1)

        await waitFor(async ()=>{
            userEvent.click(editBtns[0]);
            await new Promise((r)=> setTimeout(r, 5000))
        }, {timeout:10000})

        const editForm = await screen.findByTestId('editForm');
        expect(editForm).toBeInTheDocument();
        const blogTheme = screen.getByTestId('blogthemeEdit')
        const blogDescription = screen.getByTestId('blogdescriptionEdit')
        const blogText = screen.getByTestId('blogtextEdit')
        const images = screen.getByTestId('imagesEdit') as HTMLInputElement;
        const author = screen.getByTestId('authorEdit')
        const sendButton = screen.getByTestId('editSendBtn')
        expect(blogTheme).toBeInTheDocument();
        expect(blogDescription).toBeInTheDocument();
        expect(blogText).toBeInTheDocument();
        expect(images).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();

        expect(blogTheme).toHaveValue('Ein Test Thema');
        expect(blogDescription).toHaveValue('Eine Testbeschreibung');
        expect(blogText).toHaveValue('Lorem Ipsum ad Dolores');
        expect(author).toHaveValue('Roman');
        const file = new File(['hallo2.jpg'], 'hallo2.jpg',{type:'images/jpg'})
        await waitFor(()=>{
            userEvent.clear(blogDescription);
            userEvent.type(blogDescription,'Eine andere Testbeschreibung')
            userEvent.upload(images, file);
        })
      
        await waitFor(()=>{
            expect(blogDescription).toHaveValue('Eine andere Testbeschreibung')
            expect(images.files![0].name).toBe("hallo2.jpg");
            expect(images.files!.length).toBe(1);
        })
        await waitFor(async ()=>{
            userEvent.click(sendButton)
            await new Promise((r)=> setTimeout(r,10000))
        },{timeout:15000})
        await waitFor(()=>{
            expect(editForm).not.toBeInTheDocument();
        })
        expect(screen.getByText('Eine andere Testbeschreibung')).toBeInTheDocument();
    }, 30000)
    it('test the delete', async ()=>{
        const {queryByTestId} = 
 render(
     <MockedProvider mocks={mocks} addTypename={false}>
         <BrowserRouter>
         <BlogpostComponent/>
         </BrowserRouter>
     </MockedProvider>
        )
        await waitForElementToBeRemoved(()=>queryByTestId('spinner'))
        screen.debug();
        const deleteBtns = await screen.findAllByTestId('deleteBtn');
        expect(deleteBtns).toHaveLength(1);

        await waitFor(async ()=>{
            userEvent.click(deleteBtns[0])
            await new Promise((r)=> setTimeout(r, 5000))
        }, {timeout:10000})
        expect(screen.getByText('Beitrag erfolgreich gelöscht')).toBeInTheDocument();
    }, 20000)
})