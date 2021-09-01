import React from 'react';
import { Modal as ModalComponent1 } from 'antd';
import { useModalContext1 } from './modal1.context'


import Step2 from '../step2';

import './styles.scss';

const Modal1 = () => {
    const { 
        modal1State: { message, visible, itemId }, 
    } = useModalContext1();

    if(!visible) return null;

    return(
        <ModalComponent1 
            visible={visible}
            itemId={itemId}
        >
            <Step2 
                itemId={itemId}
            />
        </ModalComponent1>
    )
}

export default Modal1;