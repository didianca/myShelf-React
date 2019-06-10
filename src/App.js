import React from 'react';
import './App.css';
import 'react-table/react-table.css'

class App extends React.Component {
    state = {
        products: [],
        product: {
            name: '',
            price: '',
            count: ''
        }
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = _ => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(res => this.setState({products: res.data}))
            .catch((e) => console.log(e))
    };
    addProduct = async _ => {
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
        //if(product.price.isNaN || product.count.isNaN) return status = 400;
        if (status === 200) {
            this.getProducts()
        }
    };
    renderProduct = ({id, name, price, count}) => <tr>
        <td key={id}>{name}</td>
        <td key={id}>{price} </td>
        <td key={id}>{count}</td>
    </tr>;

    render() {
        const {products, product} = this.state;
        return (
            <div className='App'>
                <div>
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
                            {products.map((this.renderProduct))}
                            </tbody>

                        </table>
                    </div>
                </div>
                <div>
                    <div>
                        <p>-name-</p>
                        <input
                            value={product.name}
                            onChange={e => this.setState({product: {...product, name: e.target.value}})}/>
                    </div>
                    <div>
                        <p>-price-</p>
                        <input
                            type='number'
                            value={product.price}
                            onChange={e => this.setState({product: {...product, price: e.target.value}})}
                        />
                    </div>
                    <div>
                        <p>-count-</p>
                        <input
                            type='number'
                            value={product.count}
                            onChange={e => this.setState({product: {...product, count: e.target.value}})}
                        />
                    </div>
                    <button className={this.getBtnClasses()} onClick={this.addProduct}>Add Product</button>
                </div>
            </div>
        )
    }

    getBtnClasses() {
        const {product} = this.state;
        const {name, count, price} = product;
        let classes = 'btn  btn-lg m-5 btn-';
        classes += (!(name && price && count)) ? "basic" : 'info';
        return classes
    }

}

export default App;
