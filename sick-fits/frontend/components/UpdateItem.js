import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Err from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: { id: $id }){
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`

  mutation UPDATE_ITEM_MUTATION (
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

class UpdateItem extends Component {

  constructor(){
    super()

  }

  state = {
    
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number'? parseFloat(value) : value
    this.setState({[name]: val})
  }

  uploadFile = async e => {
    
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits')
    const res = await fetch('https://api.cloudinary.com/v1_1/jamesjsewell/image/upload', {
      method: 'POST',
      body: data
    })

    const file = await res.json()

    this.setState({image: file.secure_url , largeImage: file.eager[0].secure})
  }

  render () {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
        {({data, loading}) => {

          if(loading) return <p>loading... </p>
          return(

        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, {loading, err})=>(

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
                    defaultValue={data.item.title}
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
                    defaultValue={data.item.price}
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
                    defaultValue={data.item.description} 
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )}
    </Mutation>)}}
        
      
      
      </Query>
    )
  }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
