import React from 'react';

export const Todo = ({onClick, text, completed}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' :
                    "none"
        }}
    >
        {text}
    </li>
);