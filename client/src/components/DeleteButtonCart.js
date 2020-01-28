import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_PRODUCTS_QUERY } from '../util/graphql';

import MyPopup from '../util/MyPopup';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

function generateToken(id, email, username, cartItems) {
    return jwt.sign(
        {
            id: id,
            email: email,
            username: username,
            cartItems: cartItems
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

function DeleteButtonCart({ user, productId, callback, state }) {

    const [errors, setErrors] = useState({});

    const userId = user.id;

    // Variables used to open the confirm popup.
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = REMOVE_FROM_CART_MUTATION;

    async function updateToken(token) {
        return await localStorage.setItem('jwtToken', token);
    }

    const [removeFromCartMutation] = useMutation(mutation, {
        update(proxy) {
            console.log(proxy);
            user.cartItems = user.cartItems.filter((p) => p.id === productId);
            var token = generateToken(user.id, user.email, user.username, user.cartItems);
            console.log(token);
            updateToken(token);
            window.location.reload(false);
            if (callback) callback();
        },
        variables: {
            userId,
            productId
        }
    });

    async function removeFromCart() {
        setConfirmOpen(false);
        await removeFromCartMutation();
        console.log(productId);
        console.log(user.cartItems);
        console.log(user.cartItems);
    }

    // Renders purchase button
    return (
        <>
            <MyPopup content={'Remove From Cart'}>
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }}></Icon>
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={removeFromCart}
            />
            {console.log(errors)}
        </>
    )

}

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($userId: ID!, $productId: ID!) {
        removeFromCart(userId: $userId, productId: $productId)
    }
`;

export default DeleteButtonCart;