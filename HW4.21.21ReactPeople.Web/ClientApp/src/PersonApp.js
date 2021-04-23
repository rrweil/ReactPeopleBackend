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
        isEditing: false
    }

    componentDidMount = () => {
        axios.get('/api/people/GetAllPeople').then(({ data }) => {
            this.setState({ people: data });
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
        this.setState({ person: personToEdit, isEditing: true});
        
    }

    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' }, isEditing: false });
    }

    onUpdateClick = (personId) => {
        this.setState({ person: { ...this.state.person, id: personId } });
        axios.post('/api/people/editperson', this.state.person ).then(() => {
            axios.get('/api/people/getallpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },
                    isediting: false
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

    generatePersonTable = () => {
        return (
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
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
                                //look into sending the whole person in and just setting "state.person to person - b/c already will have the id)
                                onDeleteClick={() => this.onDeleteClick(person)}
                                onEditClick={() => this.onEditClick(person)}
                            />
                        })
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

