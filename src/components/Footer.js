import React from 'react';
import {FilterLink} from "./FilterLink";

export const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter={"all"}>
                ALL
            </FilterLink> {' '}
            <FilterLink filter={"active"}>
                Active
            </FilterLink> {' '}
            <FilterLink filter={"completed"}>
                Completed
            </FilterLink>
        </p>
    )
};