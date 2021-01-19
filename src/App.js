import React, {useState, useEffect, useReducer} from 'react';

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case 'Set-Item-Todo': {
            return action.payload;
        }
        case 'Reset-Todo': {
            return null;
        }
        case 'Change-Email': {
            return {
                ...state,
                email: action.payload
            };
        }
        default: {
            console.error('not valid action');
            return state;
        }
    }
};

export default function App() {
    const [myName, setName] = useState(null);
    const [counter, setCounter] = useState(1);
    const [user, dispatch] = useReducer(reducer, initialState);
    const [inputValue, inputChange] = useState('');

    const fetchData = async () => {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${counter}`);
        const json = await response.json();
        dispatch({type: 'Set-Item-Todo', payload: json});
    };

    useEffect(() => {
        if (counter <=10){
            fetchData()
        }
    }, [counter]);

    const handleSetUser = () => {
        setName({
            name: 'Alina'
        });
    };

    const handleResetUser = () => {
        setName(null);
    };

    const handleInc = () => {
        setCounter((prevState) => prevState +1);
    };

    const handleReset = () => {
       setCounter(1)
    };

    const handleResetTodo = () => {
        dispatch({type: 'Reset-Todo'});
    };

    const handleEmailChange = () => {
        dispatch({type: 'Change-Email', payload: inputValue})
    };
    return (
        <div>
            <h2> Counter: {counter}</h2>
            <button onClick={handleInc}>next user</button>
            <button onClick={handleReset}>start with 1</button>
            <button onClick={handleResetTodo}>reset user</button>
            <br/>
            <input value={inputValue} onChange={({target: {value}}) => inputChange(value)}/>
            <button onClick={handleEmailChange}>change Email</button>
            {
                !!user && <h3>{user.name} - Email: {user.email}</h3>
            }
            <br/>
            <button onClick={handleSetUser}>show my name</button>
            <button onClick={handleResetUser}>hide my name</button>
            {
                !!myName && <h2>{myName.name}</h2>
            }
        </div>
    );
};
