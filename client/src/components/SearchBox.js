import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} style={{display: 'flex'}} className='my-3'>
            <Form.Control
                type='text'
                name='q'
                // value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder='Qidiruv...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Qidirish</Button>
        </Form>
    )
}

export default SearchBox