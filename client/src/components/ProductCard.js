import React, { useContext } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import PurchaseButton from './PurchaseButton';

// Product card - is used for each product on the home page to be displayed (parameter is product)
function ProductCard({
    product: { name, price, imageURL, createdAt, id, username }
}) {
    // Current user logged in, if any.
    const { user } = useContext(AuthContext);

    // Renders product card.
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="medium"
                    src={imageURL}
                />
                <Card.Header>
                    {username}
                </Card.Header>
                <Card.Meta>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description as={Link} to={`/products/${id}`}>
                    {name + " - $" + price}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {user && user.username === username && <DeleteButton productId={id} /> }
                {user && <PurchaseButton user={user} productId={id} />}
            </Card.Content>
        </Card>
    );
}

export default ProductCard;