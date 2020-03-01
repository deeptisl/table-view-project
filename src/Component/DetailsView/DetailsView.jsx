import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Button, Navbar, Form, Row, Col } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { ic_arrow_back as previosPage } from 'react-icons-kit/md/ic_arrow_back';

const mapStateToProps = state => {
    return {
        userPersonalDetails: state.userPersonalDetails
    };
};

class Details extends Component {
    constructor() {
        super();
        this.state = {
            redirectPrev: false,
            firstName: "",
            lastName: "",
            companyName: '',
            age: '',
            state: "",
            city: "",
            zip: "",
            web: "",
            email: ""
        };

    }

    componentWillMount() {
        if (this.props.userPersonalDetails) {
            this.setState({
                firstName: this.props.userPersonalDetails.first_name,
                lastName: this.props.userPersonalDetails.last_name,
                age: this.props.userPersonalDetails.age,
                email: this.props.userPersonalDetails.email,
                web: this.props.userPersonalDetails.web,
                state: this.props.userPersonalDetails.state,
                city: this.props.userPersonalDetails.city,
                zip: this.props.userPersonalDetails.zip,
                companyName: this.props.userPersonalDetails.company_name
            })
        }
    }

    handlePreviousPage() {
        this.setState({
            redirectPrev: true
        });
    }


    render() {
        if (this.state.redirectPrev) {
            return (
                <Redirect
                    to={{
                        pathname: '/'
                    }}
                />
            );
        }
        return (
            <div >
                <div>
                    <Navbar bg="primary" variant="primary">
                        <Navbar.Brand >
                            <Button
                                style={{ borderRadius: '0%' }}
                                className="btn btn-primary btn-sm"
                                onClick={() => this.handlePreviousPage()}
                            >
                                <Icon size={30} icon={previosPage} />
                            </Button>
                        </Navbar.Brand>
                        <Navbar.Brand style={{ color: 'white' }}>
                            Data Peace
                        </Navbar.Brand>
                    </Navbar>
                </div>
                <div className="pagePadding">
                    <h1><b>{this.state.firstName} {this.state.lastName}</b></h1>
                    <br />
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b>Company Name</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.companyName} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row} >
                            <Form.Label column sm="8">
                                <b>City</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.city} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b>State</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.state} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b>Zip</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.zip} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b> Email</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.email} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b>Web</b>
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control plaintext readOnly defaultValue={this.state.web} />
                            </Col>
                        </Form.Group>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column sm="8">
                                <b>Age</b>
                            </Form.Label>
                            <Col sm="4" >
                                <Form.Control plaintext readOnly defaultValue={this.state.age} />
                            </Col>
                        </Form.Group>
                        <hr />
                    </Form>
                </div>

            </div>
        );
    }
}

const DetailsView = withRouter(
    connect(
        mapStateToProps,
        null
    )(Details)
);

export default DetailsView;
