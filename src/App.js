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
    handleUpdate = async (id) => {
        const {product} = this.state;
        const {name, price, count} = product;
        if (!(name && price && count)) return;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'PUT',
            headers,
            body: JSON.stringify(product)
        };
        const request = new Request(`http://localhost:4000/products/${id}`, options);
        const response = await fetch(request);
        let status = await response.status;
        if (status === 200) {
            this.getProducts()
        }

    };
    handleDelete = async (id) => {
        const options = {
            method: 'DELETE'
        };
        const request = new Request(`http://localhost:4000/products/${id}`, options);
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
        <td>
            <button
                type='button' className={this.getBtnClasses()}
                onClick={() => {
                    this.handleUpdate(id)
                }}//update
            >
                <ion-icon name="create"/>
            </button>
            <button type='button' className='btn rounded-circle btn-outline-danger'
                    onClick={() => {
                        this.handleDelete(id)
                    }}
            >
                <ion-icon name="trash"/>
            </button>
        </td>
    </tr>;

    //setting up btn classes for cleaner code in the render method
    getBtnClasses() {
        const {product} = this.state;
        const {name, count, price} = product;
        let classes = 'btn rounded-circle btn-';
        classes += (!(name && price && count)) ? "basic" : "info";
        return classes
    }

    //render final results
    render() {
        const {products, product} = this.state;
        return (
            <div className='App'>
                <h1> LIST OF FRUITS</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='table-responsive'>
                                <table className='table  table-bordered table-hover table-sm'>
                                    <caption>List of products</caption>
                                    <thead>
                                    <tr className='thead-dark'>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Count</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody className='table-info'>
                                    {this.state.products.length === 0 && <tr>
                                        <td> -</td>
                                        <td> -</td>
                                        <td> -</td>
                                        <td>
                                            <button
                                                type='button' className={this.getBtnClasses()}
                                                onClick={this.handleUpdate}
                                            >
                                                <ion-icon name="create"/>
                                            </button>
                                            <button type='button' className={this.getBtnClasses()}
                                                    onClick={this.addProduct}
                                            >
                                                <ion-icon name="add"/>
                                            </button>
                                        </td>
                                    </tr>}
                                    {products.map((this.renderProduct))}
                                    </tbody>
                                </table>

                        </div>
                    </div>
                </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
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

                            {this.state.products.length > 0 && <button type='button' className={this.getBtnClasses()}
                                                                       onClick={this.addProduct}
                            >
                                <ion-icon name="add"/></button>}
                        </div>
                    </div>
                </div>
                <div className='alert alert-info alert-dismissible'>
                    <button className="close fade in" data-dismiss="alert" aria-label="close">&times;</button>
                    Insert values for <strong>adding</strong> a new product or <strong>editing</strong> an existing one</div>
            </div>

        )
    }


}

export default App;
