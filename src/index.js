import React, { useContext, useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './style/style.css';

import * as serviceWorker from './serviceWorker';

import NewsContext from './context';

import todosReducer from './reducer';

import NewsList from './components/NewsList';

import { TOP_STORIES_URL, baseURL, storysNum } from './constants';


const TopStories = (url, num) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(url)

        const p = await Promise.all(response.data.slice(0, num).map((id) => axios.get(`${baseURL}${id}.json`)));

        //console.log(p);

        const results = p.map((item) => {
            item.data['comments'] = [];
            item.data['showComments'] = false;
            return item.data;
        }
        );

        setData(results);
    }

    return data;
}

const App = () => {

    const initialState = useContext(NewsContext);
    const [state, dispatch] = useReducer(todosReducer, initialState);

    const savedNews = TopStories(TOP_STORIES_URL, storysNum);

    useEffect(() => {
        dispatch({
            type: "GET_NEWS",
            payload: savedNews
        });
    }, [savedNews])

    return (
        <NewsContext.Provider value={{ state, dispatch }}>
            <NewsList />
        </NewsContext.Provider>
    )
}

ReactDOM.render(
    <App />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
