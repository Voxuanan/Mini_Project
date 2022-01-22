export default function logger(reducer){
    return (preState, action, args) => {
        console.group(action);
        console.log('Previous State:',preState);
        console.log('Action Arguments:',args);
        const nextState = reducer(preState, action, args);
        console.log('Next State:',nextState);

        console.groupEnd(action);
        return nextState
    }
}