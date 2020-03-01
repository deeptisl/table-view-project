import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { Table, Form } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
import {
    showDetails,
    userDetailsView
} from '../../action/action';

function mapDispatchToProps(dispatch) {
    return {
        showDetails: () =>
            dispatch(showDetails()),
        userDetailsView: (userDetails) =>
            dispatch(userDetailsView(userDetails))
    };
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    };
};

class TableView extends Component {
    constructor() {
        super();
        this.state = {
            userData: [],
            search: '',
            decreasePage: 0,
            increasePage: 10,
            prev: true,
            counter: 1,
            personData: []
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentWillMount() {
        this.props.showDetails().then(() => {
            if (this.props.userData) {
                this.setState({
                    userData: this.props.userData
                })
            }
        });
    }

    async handleDataDetails() {
        this.setState({
            increasePage: 10,
            decreasePage: 0,
            counter: 1,
            prev: true,
            redirect: false
        });
    }

    async handleNext() {
        await this.setState(prevState => {
            return {
                counter: prevState.counter + 1,
                increasePage: prevState.increasePage + 10,
                decreasePage: prevState.decreasePage + 10
            };
        });
        if (this.state.counter === 1) {
            this.setState({ prev: true });
        } else this.setState({ prev: false });
    }

    async handlePrevious() {
        await this.setState(prevState => {
            return {
                counter: prevState.counter - 1,
                increasePage: prevState.increasePage - 10,
                decreasePage: prevState.decreasePage - 10
            };
        });

        if (this.state.counter === 1) {
            this.setState({ prev: true });
        }
    }

    async updateSearch(event) {
        const tempVal = event.target.value;
        if (this.state.search.length > tempVal.length) {
            this.handleDataDetails();
        }
        await this.setState({
            search: tempVal.substr(0, 20)
        });
    }

    async handleForClick(data) {
        this.props.userDetailsView(data)
        await this.setState({
            personData: data,
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect
                    to={`/${this.state.personData.first_name}/${this.state.personData.id}`}
                />
            );
        }

        const temp = this.state.userData;
        const filterData = temp.filter(filterDataList => {
            return (
                filterDataList.first_name
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) !== -1 ||
                filterDataList.last_name.indexOf(this.state.search) !== -1
            );
        });
        const sortedData = filterData.sort((a, b) =>
            a.first_name.localeCompare(b.first_name)
        );
        let showPage = false;
        const Length = sortedData.length;
        const totalPage = Math.ceil(Length / 10);
        let next = false;
        if (this.state.counter === totalPage) {
            next = true;
        }
        if (totalPage > 1) {
            showPage = true;
        }

        return (
            <div >
                <div>
                    <div>
                        <Navbar bg="primary" variant="primary">
                            <Navbar.Brand style={{ color: 'white' }}>
                                Data Peace
                            </Navbar.Brand>
                        </Navbar>
                    </div>
                    <div className="pagePadding">
                        <div style={{ marginTop: '20px' }}>
                            <Form>
                                <Form.Group controlId="patientSearch">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search By First Name or Last Name"
                                        value={this.state.search}
                                        onChange={this.updateSearch}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th  >
                                            First Name
                                        </th>
                                        <th  >
                                            Last Name
                                        </th>
                                        <th  >
                                            Company Name
                                        </th>
                                        <th  >
                                            City
                                        </th>
                                        <th  >
                                            State
                                        </th>
                                        <th  >
                                            Zip
                                        </th>
                                        <th  >
                                            Email
                                        </th>
                                        <th  >
                                            Web
                                        </th>
                                        <th  >
                                            Age
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData
                                        .slice(
                                            this.state.decreasePage,
                                            this.state.increasePage
                                        )
                                        .map(detaiList => {
                                            return (
                                                <tr height="55px" onClick={() => this.handleForClick(detaiList)}>
                                                    <td  >
                                                        {detaiList.first_name}
                                                    </td>
                                                    <td  >
                                                        {detaiList.last_name}
                                                    </td>
                                                    <td  >
                                                        {detaiList.company_name}
                                                    </td>
                                                    <td  >
                                                        {detaiList.city}
                                                    </td>
                                                    <td  >
                                                        {detaiList.state}
                                                    </td>
                                                    <td  >
                                                        {detaiList.zip}
                                                    </td>
                                                    <td  >
                                                        {detaiList.email}
                                                    </td>
                                                    <td  >
                                                        {detaiList.web}
                                                    </td>
                                                    <td  >
                                                        {detaiList.age}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div>
                        {showPage ? (
                            <div className="pageAlignment">
                                <button
                                    type="button"
                                    disabled={this.state.prev}
                                    onClick={() => this.handlePrevious()}
                                    className="btn btn-primary btn-fill btn-sm"
                                >
                                    Prev
                                          </button>
                                &ensp;&lt; Page <b>{this.state.counter}</b> of{' '}
                                {totalPage} &gt;&ensp;
                                           <button
                                    type="button"
                                    disabled={next}
                                    onClick={() => this.handleNext()}
                                    className="btn btn-primary btn-fill btn-sm"
                                >
                                    Next
                                     </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const TableData = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TableView)
);

export default TableData;
