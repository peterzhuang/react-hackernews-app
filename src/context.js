import React from 'react';

const NewsContext = React.createContext({

    news: [
        // {
        //     id: 1,
        //     text: "Eat breakfast",
        //     complete: false
        // },
        // {
        //     id: 2,
        //     text: "Do laundry",
        //     complete: false
        // },
        // {
        //     id: 3,
        //     text: "Finish project",
        //     complete: true
        // }
    ],
    currentTodo: {}

});

export default NewsContext;