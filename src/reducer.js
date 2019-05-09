


export default function reducer(state, action) {
    switch (action.type) {
        case "GET_NEWS":
            return {
                ...state,
                news: action.payload
            }
        case "GET_COMMENTS":

            const updatedNews = state.news.map(item => {
                return item.id === action.payload.storyId ? { ...item, comments: action.payload.comments, showComments: action.payload.showComments } : item;
            })

            return {
                ...state,
                news: updatedNews,
            }
        case "TOGGLE_COMMENTS":

            const toggledComments = state.news.map(item => {
                return item.id === action.payload.storyId ? { ...item, showComments: action.payload.showComments } : item;
            })

            return {
                ...state,
                news: toggledComments,
            }
        default:
            return state;
    }
}