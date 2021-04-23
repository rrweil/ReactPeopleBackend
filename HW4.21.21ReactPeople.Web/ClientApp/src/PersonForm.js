import React from 'react';


export default function PersonForm({ person, onTextChange, onAddClick, isAdding, isEditing, onCancelClick, onUpdateClick }) {
    const { firstName, lastName, age } = person;

    return (
        <div className="row">
            <div className="col-md-3" >
                <input type="text" placeholder="First Name" className="form-control" name="firstName" value={firstName} onChange={onTextChange} />
            </div>
            <div className="col-md-3" >
                <input type="text" placeholder="Last Name" className="form-control" name="lastName" value={lastName} onChange={onTextChange} />
            </div>
            <div className="col-md-3" >
                <input type="text" placeholder="Age Name" className="form-control" name="age" value={age} onChange={onTextChange} />
            </div>
            <div className="col-md-3" >
                {!isEditing && <button className="btn btn-primary btn-block" onClick={onAddClick} disabled={isAdding}>Add </button>}
                {!!isEditing && <div><button className="btn btn-warning btn-block" onClick={onUpdateClick}>Update </button></div>}
                {!!isEditing && <div><button className="btn btn-info btn-block mt-1" onClick={onCancelClick}>Cancel </button></div>}


            </div>

        </div>
    )
}
