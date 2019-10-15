import React from 'react'
import axios from 'axios'
import { Col, Row, Icon, Input } from 'antd'
import Hotel from './hotel'


const { Search } = Input;


export default class HotelsList extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            hotels: [],
            page: 1,
            search: '',
            isSearched: false

        }


    }
    handleChange = (e) => {

        this.setState({ search: e.target.value })
    }
    searchHandle = (val) => {
        this.setState({ isSearched: true, search: val, page: 0, hotels: [] }, () => {
            setTimeout(() => {
                this.getMoreData()
            }, 500)

        })

    }
    onScroll = () => {
        const windowHeight = window.innerHeight
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        console.log(windowBottom, "  doc height  ", docHeight)

        if (windowBottom >= docHeight - 10) {
            this.setState({ isLoading: true }, () => {
                this.getMoreData()
            })


            //fetch new data (api call)and append to existing list
        } else {
            console.log("not at the bottom");
            //don’t do anything
        }
    }
    getMoreData = () => {
        const options = {
            page: this.state.page + 1,
            limit: 9,
            collation: {
                locale: 'en'
            }
        }
        if (this.state.isSearched) {

            axios.post(`http://localhost:3005/hotels?search=${this.state.search}`, options)
                .then(response => {
                    if (response.data) {
                        this.setState(prev => {
                            return {
                                hotels: [...prev.hotels, ...response.data],
                                page: prev.page + 1,
                                isLoading: false
                            }
                        })
                    }

                })
                .catch(err => {
                    window.alert(err)
                })
        }
        else {

            axios.post("http://localhost:3005/data", options)
                .then(response => {
                    this.setState(prev => {
                        return {
                            hotels: [...prev.hotels, ...response.data],
                            page: prev.page + 1,
                            isLoading: false
                        }
                    })

                })
                .catch(err => {
                    window.alert(err)
                })

        }

    }

    componentDidMount() {

        const options = {
            page: this.state.page,
            limit: 9,
            collation: {
                locale: 'en'
            }
        }
        axios.post("http://localhost:3005/data", options)
            .then(response => {
                this.setState({ hotels: response.data, }, () => {
                    window.addEventListener('scroll', this.onScroll)
                })

            })
            .catch(err => {
                console.log(err)
            })

    }
    render() {
        console.log("state", this.state.hotels)
        return (
            <div ref="divscroll">
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    value={this.state.search}
                    onChange={this.handleChange}
                    size="large"
                    style={{ width: 400, marginBottom: 20, zIndex: -5 }}
                    onSearch={value => this.searchHandle(value)}

                />
                <Row>
                    {this.state.hotels.map(hotel => <Col key={hotel._id} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Hotel {...hotel} /> </Col>)}
                </Row>
                {this.state.isLoading && <Icon style={{ fontSize: "40px" }} type="loading" spin />}

            </div>
        )
    }
}