import React from 'react';

export default function PersonRow({ person, onDeleteClick , onEditClick}) {
    const { firstName, lastName, age} = person;
    return (<tr >
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <button className="btn btn-warning mr-3" onClick={onEditClick}>Edit</button>
            <button className="btn btn-danger" onClick={onDeleteClick }>Delete</button>
        </td>
    </tr >)
}