import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Err from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`

  mutation CREATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ){id}
  }


`

class CreateItem extends Component {

  constructor(){
    super()

  }

  state = {
    title: 'cool shoes',
    description: 'these are yeezys',
    image: 'www.google.com/yeezy.jpg',
    largeImage: 'www.google.com/largeyeezy.jpg',
    price: 5000
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number'? parseFloat(value) : value
    this.setState({[name]: val})
  }

  render () {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, err, called, data})=>(

          <Form onSubmit={async e => {
            e.preventDefault()
            const res = await createItem()
            Router.push({
              pathname: '/item' ,
              query: { id: res.data.createItem.id }
            })
           
          }}>
            <h2>Sell an Item</h2>
            <Err>{err}</Err>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='title'>
                Title
                <input 
                  type='text' 
                  id='title' 
                  name='title' 
                  placeholder='Title' 
                  required 
                  value={this.state.title} 
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='price'>
                Price
                <input 
                  type='number' 
                  id='price' 
                  name='price' 
                  placeholder='Price' 
                  required 
                  value={this.state.price} 
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='description'>
                Description
                <textarea  
                  id='description' 
                  name='description' 
                  placeholder='Enter a Description' 
                  required 
                  value={this.state.description} 
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem
export { CREATE_ITEM_MUTATION }