import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('paypal')

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentAddress(paymentMethod))
      history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler} className='ptL usL'>
               <Form.Group>
                   <Form.Label as='legend'>Tolov usulini tanlang</Form.Label>

               <Col>
                <Form.Check
                        type='radio'
                        label='Paypal yoki credit cartada foydalaning'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Form.Check
                        type='radio'
                        label='Payme'
                        id='Payme'
                        name='paymentMethod'
                        value='Payme'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
               </Col>
               </Form.Group>


                <Button variant='primary' type='submit' className='ptL'>
                    Davom etish
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen