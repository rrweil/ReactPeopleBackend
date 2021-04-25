import React from 'react';

export default function PersonRow({ person, onDeleteClick, onEditClick, onCheckboxChange, isChecked}) {
    const { firstName, lastName, age, id} = person;
    return (<tr key={id}>
        <td>
            <input type="checkbox" className="form-check form-control" onChange={onCheckboxChange} checked={isChecked}/> 
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <button className="btn btn-warning mr-3" onClick={onEditClick}>Edit</button>
            <button className="btn btn-danger" onClick={onDeleteClick }>Delete</button>
        </td>
    </tr >)
}