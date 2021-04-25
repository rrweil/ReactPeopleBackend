import React from 'react';
import PersonForm from './PersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';


class PersonApp extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isAdding: false,
        isEditing: false,
        isLoading: true,
        peopleToDelete: []
    }

    componentDidMount = () => {
        axios.get('/api/people/GetAllPeople').then(({ data }) => {
            this.setState({ people: data, isLoading: false });
        });
    }

    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/AddPerson', this.state.person).then(() => {
            axios.get('/api/people/GetAllPeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },
                    isAdding: false
                });
            });
        });
    }

    onTextChange = e => {
        const personCopy = { ...this.state.person };
        personCopy[e.target.name] = e.target.value;
        this.setState({ person: personCopy })
    }

    onEditClick = personToEdit => {
        this.setState({ person: personToEdit, isEditing: true });
    }

    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' }, isEditing: false });
    }

    onUpdateClick = (person) => {
        this.setState({ person: person});
        axios.post('/api/people/editperson', this.state.person).then(() => {
            axios.get('/api/people/getallpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },
                    isEditing: false
                });
            });
        });
    }

    onDeleteClick = (personToDelete) => {
        axios.post('/api/people/DeletePerson', personToDelete).then(() => {
            axios.get('/api/people/getallpeople').then(({ data }) => {
                this.setState({
                    people: data
                });
            });
        });
    }


    onCheckboxChange = (personToDelete) => {
        if (!this.state.peopleToDelete.includes(personToDelete)) {
            this.setState({ peopleToDelete: [...this.state.peopleToDelete, personToDelete] });
        } else {
            let filteredArray = this.state.peopleToDelete.filter(person => person !== personToDelete)
            this.setState({ peopleToDelete:  filteredArray});
        }
    }

    onCheckAllClick = () => {
        this.setState({ peopleToDelete: this.state.people });
    }

    onUncheckAllClick = () => {
        this.setState({ peopleToDelete: [] });
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/DeletePeople', this.state.peopleToDelete).then(() => {
            axios.get('/api/people/getallpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    peopleToDelete: []
                });
            });
        });
    }

    generatePersonTable = () => {
        return (
            <table className="table table-hover table-bordered mt-4">
                <thead>
                    <tr>
                        <th>
                            <button className="btn btn-danger btn-block" onClick={this.onDeleteAllClick}>Delete All Checked</button>
                            <button className="btn btn-info btn-block" onClick={this.onCheckAllClick}>Check All</button>
                            <button className="btn btn-info btn-block" onClick={this.onUncheckAllClick} > Uncheck All</button>
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {!!this.state.people.length &&
                        this.state.people.map(person => {
                            return <PersonRow
                                person={person} 
                                onDeleteClick={() => this.onDeleteClick(person)}
                                onEditClick={() => this.onEditClick(person)}
                                onCheckboxChange={() => this.onCheckboxChange(person)}
                                isChecked={this.state.peopleToDelete.includes(person)}
                            />
                        })
                    }
                    {
                        !!this.state.isLoading && <tr ><td colSpan={5}><h1>Loading...</h1></td></tr>
                    }
                </tbody>
            </table>
        )
    }

    render() {
        const { person, isAdding, isEditing } = this.state;
        return (
            <div className="container mt-5">
                <PersonForm
                    person={person}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                    isEditing={isEditing}
                    onCancelClick={this.onCancelClick}
                    onUpdateClick={() => this.onUpdateClick(person)}
                />
                {this.generatePersonTable()}
            </div>
        );
    }
}

export default PersonApp;

