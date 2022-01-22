import storage from './ulti/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.complete,
        completed: todo => todo.complete
    },
    editIndex: null
}

const actions = {
    add({ todos }, title){
        if (title){
            todos.push({title, complete: false})
            storage.set(todos)
        }
    },
    toggle({todos}, index){
        const todo = todos[index]
        todo.complete = !todo.complete;
        storage.set(todos)
    },
    toggleAll({todos}, completed){
        todos.forEach(todo => todo.complete = completed)
        storage.set(todos)
    },
    destroy(state,  index){
        if (state.filter == 'all'){
            state.todos.splice(index, 1)
            storage.set(state.todos)
        }
        else if (state.filter == 'active'){
            let temp = null;
            let temp1 = -1;
            for (let i = 0; i < state.todos.length; ++i){
                if (!state.todos[i].complete) {
                    temp1+=1;
                    if (temp1 == index) temp = i
                };
            }
            console.log(temp)
            state.todos.splice(temp, 1)
            storage.set(state.todos)
        }
        else if (state.filter == 'completed'){
            let temp = null;
            let temp1 = -1;
            for (let i = 0; i < state.todos.length; ++i){
                if (state.todos[i].complete){
                    temp1+=1;
                    if (temp1 == index) temp = i
                    console.log(temp1, temp, index)
                };
            }
            state.todos.splice(temp, 1)
            storage.set(state.todos)
        }
    },
    switchFilter(state, filter){
        state.filter = filter;
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    startEdit(state,index){
        state.editIndex = index;
    },
    endEdit(state, title){
        if (state.editIndex !== null){
            if (title){
                state.todos[state.editIndex].title = title;
            }
            else {
                this.destroy(state,state.editIndex)
            }
            state.editIndex = null;
        }
        storage.set(state.todos)
    },
    cancelEdit(state){
        state.editIndex = null;
    }
}

export default function reducer (state = init, action, args){
    actions[action] && actions[action](state, ...args)
    return state;
}