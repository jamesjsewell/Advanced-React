import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import {CURRENT_USER_QUERY} from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!){
    signin(email: $email, password: $password){
      id
      email
    }
  }
`

class Signin extends Component {
  state = {
    password: '',
    email: ''
  }
  saveToState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render () {
    return (
      <Mutation 
        mutation={SIGNIN_MUTATION} 
        variables={this.state}
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
        >
        {(signin, {error, loading})=>{
          return(
          <Form method="POST" onSubmit={async e =>{ 
            e.preventDefault()
            await signin()
            this.setState({email: '', password: ''})
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <h2>Signin to your Account</h2>

              <label htmlFor='email'>
                Email
                <input type='text' name='email' placeholder='email' value={this.state.email} onChange={this.saveToState} />
              </label>
            
              <label htmlFor='password'>
                Password
                <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.saveToState} />
              </label>
              
              <button type="submit">Sign in!</button>
            </fieldset>
          </Form>)
        }}
      </Mutation>
    )
  }
}

export default Signin