import React from 'react';
import parse from 'html-react-parser';


const Comments = ({ comments, showComments }) => {

    return (
        <>
            {
                showComments ? (
                    <div className="container mx-auto max-w-md text-center font-mono" >
                        <h1 className="text-bold">Top Comments:</h1>
                        <ul className="list-reset text-white p-0">
                            {comments.map(comment => (
                                <li key={comment.id} className="flex flex-col justify-between items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4 comment-block">
                                    <span className="author bg-teal">BY: {comment.by}</span>
                                    <span

                                        className={`flex-1 ml-3 mr-3 cursor-pointer comment-text`}
                                    >{parse(comment.text)}</span>

                                </li>
                            ))}
                        </ul>
                    </div >
                ) : null

            }
        </>
    )

}

export default Comments;