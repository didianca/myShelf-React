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
        headers.append('Content-Type','application/json');
        const options = {
            method:'POST',
            headers,
            body:JSON.stringify(product)
        };
        const request = new Request('http://localhost:4000/products',options);
        const response = await fetch(request);
        let status = await response.status;
        //if(product.price.isNaN || product.count.isNaN) return status = 400;
        if(status === 200){
            this.getProducts()
        }
    };
    renderProduct = ({id, name}) => <div key={id}>{name}</div>;

    render() {
        const {products, product} = this.state;
        const {name,count,price} = product;
        let classes = 'btn  btn-lg m-5 btn-';
        classes += !(name && price && count ) ? "info" :'basic';
        return (
            <div className='App'>
                <div>
                    <h1> LIST OF FRUITS</h1>
                    <div className='badge badge-info m-2'>
                        {products.map((this.renderProduct))}
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
                    <button className={classes} onClick={this.addProduct}>Add Product</button>
                </div>
            </div>
        )
    }
}

export default App;
