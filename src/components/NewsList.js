import React, { useContext } from 'react';

import NewsContext from '../context';

import Comments from './Comments';

import axios from 'axios';

import { baseURL, commentsNum } from '../constants';

export default function NewsList() {
    const { state, dispatch } = useContext(NewsContext);
    const title = state.news.length > 0 ? `${state.news.length} Top Stories` : "Loading Top Stories ..."

    return (
        <div className="container mx-auto max-w-md text-center font-mono">
            <h1 className="text-bold">{title}</h1>
            <div className="list-reset  p-0">
                {state.news.map(story => (
                    <div key={story.id}>
                        <div className="flex justify-between items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4 story-block">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={story.url}
                                className={`flex-1 ml-3 mr-3 cursor-pointer hover:text-indigo-darkest story-title`}
                            >{story.title}</a>
                            <button
                                className="showCommentButton bg-teal p-1 rounded ml-6 mr-6"
                                onClick={
                                    async () => {
                                        const commentIds = story.kids;

                                        const p = await axios.all(commentIds.slice(0, commentsNum).map((id) => axios.get(`${baseURL}${id}.json`)));

                                        const comments = p.map((item) => {
                                            return item.data;
                                        }
                                        );



                                        dispatch({ type: 'GET_COMMENTS', payload: { storyId: story.id, comments: comments, showComments: true } })
                                    }
                                }
                            >
                                View Comments
                        </button>
                            <button
                                disabled={story.comments.length > 0 ? false : true}
                                className="toggleCommentButton bg-teal p-1 rounded ml-6 mr-6"
                                onClick={() => {
                                    dispatch({ type: 'TOGGLE_COMMENTS', payload: { storyId: story.id, showComments: !story.showComments } })
                                }}
                            >
                                Toggle Comments
                        </button>
                        </div>
                        <Comments comments={story.comments} showComments={story.showComments} />
                    </div>
                ))}
            </div>
        </div>
    )

}