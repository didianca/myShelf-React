import React from 'react';
import './App.css';
import 'react-table/react-table.css'

class App extends React.Component {
    //set up state of data. depending on the state, the app will render diff results
    state = {
        products: [],
        product: {
            name: '',
            price: '',
            count: ''
        }
    };

    //no idea \/
    componentDidMount() {
        this.getProducts();
    }

    //get request to get all items in the db --populate table
    // use arrow function so the this keyword is inherited there for you have access to the parent class
    getProducts = () => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(res => this.setState({products: res.data}))
            .catch((e) => console.log(e))
    };
    //post request to add product to db
    addProduct = async () => {
        const {product} = this.state;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(product)
        };
        const request = new Request('http://localhost:4000/products', options);
        const response = await fetch(request);
        let status = await response.status;
        if (status === 200) {
            this.getProducts()
        }
    };
    //setting up the table
    renderProduct = ({id, name, price, count}) => <tr key={id}>
        <td>{name}</td>
        <td>{price} </td>
        <td>{count}</td>
    </tr>;

    //setting up btn classes for cleaner code in the render method
    getBtnClasses() {
        const {product} = this.state;
        const {name, count, price} = product;
        let classes = 'btn  btn-lg m-5 btn-';
        classes += (!(name && price && count)) ? "basic" : "info";
        return classes
    }

    //render final results
    render() {
        const {products, product} = this.state;
        return (
            <div className='App'>
                <h1> LIST OF FRUITS</h1>
                <div className='table-responsive'>
                    <table className='table  table-bordered table-hover table-sm'>
                        <caption>List of products</caption>
                        <thead>
                        <tr className='thead-dark'>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Count</th>
                        </tr>
                        </thead>
                        <tbody className='table-info'>
                        {this.state.products.length === 0 && <tr>
                            <td> -</td>
                            <td> -</td>
                            <td> -</td>
                        </tr>}
                        {products.map((this.renderProduct))}
                        </tbody>

                    </table>
                </div>
                <div >
                    <div className='border border-info'>
                        <input
                            className='form-control'
                            placeholder='name'
                            value={product.name}
                            onChange={e => this.setState({product: {...product, name: e.target.value}})}/>
                    </div>
                    <div className='border border-info'>
                        <input
                            className='form-control'
                            placeholder='price'
                            type='number'
                            value={product.price}
                            onChange={e => this.setState({product: {...product, price: e.target.value}})}/>
                    </div>
                    <div className='border border-info'>
                        <input
                            className='form-control'
                            placeholder='count'
                            type='number'
                            value={product.count}
                            onChange={e => this.setState({product: {...product, count: e.target.value}})}/>
                    </div>

                </div>
                <button
                    className={this.getBtnClasses()}
                    onClick={this.addProduct}>
                    Add Product
                </button>
            </div>

        )
    }


}

export default App;
