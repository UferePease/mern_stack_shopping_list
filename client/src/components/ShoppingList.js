import React, { Component } from 'react';
import { 
    Container,
    ListGroup,
    ListGroupItem,
    Button } from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup } from 'react-transition-group';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    // state = {
    //     items: [
    //         { id: uuid(), name: 'Eggs' },
    //         { id: uuid(), name: 'Milk' },
    //         { id: uuid(), name: 'Steak' },
    //         { id: uuid(), name: 'Water' }
    //     ]
    // }

    // call the getItems action when the component is mounted
    componentDidMount() {
        this.props.getItems()
    }

    // delete method
    onDeleteClick = (id) => {
        this.props.deleteItem(id)   // call the action delete method
    } 

    render () {
        const { items } = this.props.item;    // destructuring
        return(
            <Container>
                {/* <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt("Enter Item");
                        if (name) {
                            this.setState(state => ({
                                // using spread operator to obtain the current state, and append new item to the items list
                                items: [...state.items, { id: uuid(), name: name }]
                            }));
                        }
                    }}>Add Item</Button> */}

                <ListGroup>
                    {/* map through the items and display the list with transition effects */}
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) =>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

// set the types of the component props
ShoppingList.propTypes = {
    // since getItems is brought in from areducer, it becomes a componenet prop, and accessed thus:
    getItems: PropTypes.func.isRequired,    // sets getItems from reducer as a functions
    item: PropTypes.object.isRequired       // set item as an object
}

// make this state a component prop
const mapStateToProps = (state) => ({
    item: state.item
})

// export default ShoppingList;

// because we are exporting a componenet with connect statement, 
// the export statement is a bit different
// actions (getItems, deleteItem, addItem) are exported along with the component
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);