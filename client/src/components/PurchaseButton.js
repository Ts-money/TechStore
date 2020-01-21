import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

// Purchase button
function PurchaseButton({ productString }) {

    // Variables used to open the confirm popup.
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Renders purchase button
    return (
        <>
            <MyPopup content={'Purchase Product'}>
                <Button
                    as="div"
                    color="green"
                    floated="left"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="cart" style={{ margin: 0 }}></Icon>
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => setConfirmOpen(false)}
            />
        </>
    )

}
export default PurchaseButton;