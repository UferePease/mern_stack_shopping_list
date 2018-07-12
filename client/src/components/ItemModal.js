import React, { Component } from 'react';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // a method that assigns the name state to the currently typed in text (takes an event parameter)
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // method for submitting the form
    onSubmit = (e) => {
        e.preventDefault();     // prevent the forn from submitting

        const newItem = {
            name: this.state.name    // name is obtained from the state which is updated with user input
        }

        // Add item via addItem action (it takes an object payload)
        this.props.addItem(newItem);

        // Now, close the modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Item</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add shopping item" onChange={this.onChange} />
                                <Button color="dark" style={{marginTop: '2rem'}} block>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


// make this state a component prop
const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);