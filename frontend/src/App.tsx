import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Bibliothek from './pages/bibliothek/Bibliothek';
import Blog from './pages/blog/Blog';
import Forum from './pages/forum/Forum';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Uebermich from './pages/uebermich/Uebermich';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Dashboard from './pages/dashboard/Dashboard';
import SingleBlogpost from './pages/singleBlogpost/SingleBlogpost';
import ForumRessort from './pages/forumRessort/ForumRessort';
import SingleForumQuestion from './pages/singleForumQuestion/SingleForumQuestion';
import UserAccount from './pages/userAccount/UserAccount';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        user: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

function App() {
  return (
    <div className="app" data-testid="app">
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/uebermich" element={<Uebermich/>}/>
            <Route path="/bibliothek" element={<Bibliothek/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/forum" element={<Forum/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/blogpost/:id" element={<SingleBlogpost/>}/>
            <Route path="/forum/:ressort" element={<ForumRessort/>}/>
            <Route path="/:ressort/:id" element={<SingleForumQuestion/>}/>
            <Route path="/account/:id" element={<UserAccount/>}/>
            <Route path="/accountUserForum/:id" element={<SingleForumQuestion/>}/>
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
