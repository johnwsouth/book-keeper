import React from 'react';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      price: '',
      units: ''

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeprice = this.handleChangeprice.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleChangeEntry = this.handleChangeEntry.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChangeProduct(event) {
    this.setState({
      productName: event.target.value
    });
  }
  handleChangeprice(event) {
    this.setState({
      price: event.target.value
    });
  }
  handleChangeEntry(event) {
    this.setState({
      units: event.target.value
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      productName: '',
      price: '',
      units: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var newEntry = {
      entryName: this.state.productName,
      entryPrice: this.state.price,
      entryUnits: this.state.units
    };
    this.props.addEntry(newEntry);
    this.setState({
      productName: '',
      price: '',
      units: ''
    });
  }

  render() {

    return (
      <form className="mb-4 shadow-md form-container" onSubmit={this.handleSubmit} >
        <i className="fab fa-product-hunt icon-name icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.productName}
          className="form-control form"
          placeholder="Enter the purchased product"
          onChange={this.handleChangeProduct} />
        <i className="ml-1 fas fa-dollar-sign icon-price icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.price}
          className="form-control form"
          placeholder="Enter the product price"
          onChange={this.handleChangeprice} />
        <i className="fas fa-coins icon-entry icon"></i>
        <input
          required
          autoFocus
          type="text"
          value={this.state.units}
          className="form-control form"
          placeholder="Enter the number of units sold"
          onChange={this.handleChangeEntry}/>
        <div className="mt-3">
          <button type="submit" className="btn btn-dark">Add entry</button>
          <button type="cancel" className="btn btn-secondary ml-3" onClick={this.handleCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default EntryForm;
