import React, {Component} from 'react'
import axios from 'axios'
import CategoriesList from '../Categories/CategoriesList'
import Loading from '../Loading'
import Error from '../Error'

class SingleBalance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: undefined,
            error: '',
            loading: true
        }
    }

    componentDidMount() {
        const balanceId = this.props.match.params.id
        this.setState({loading: true})

        axios.get(`/api/balances/${balanceId}`).then(response => {
            this.setState({
                balance: response.data,
                loading: false,
                error: false
            })
        }).catch(error => {
            console.error('error: ', error)
            this.setState({
                error: `${error}`,
                loading: false
            })
        })
    }

    render() {
        const {balance, loading, error} = this.state
        let content
        if (loading) {
            content = (
                <Loading/>
            )
        } else if (error) {
            content = (
                <Error content={error}/>
            )
        } else {
            content = (
                <div className='card'>
                    <div className='card-header'>
                        {new Intl.DateTimeFormat().format(new Date(balance.start_date))}
                        -
                        {new Intl.DateTimeFormat().format(new Date(balance.end_date))}
                    </div>
                    <div className='card-body'>
                        <CategoriesList balance={balance}/>
                    </div>
                </div>
            )
        }

        return (
            <div className='c-single-balance container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleBalance
