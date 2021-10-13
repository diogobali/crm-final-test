import React from 'react';
import { Modal as ModalComponentEditInfo } from 'antd';
import { useModalContextEditInfo } from './modalEditInfo.context'


import EditInfo from '../editInformation';

import './styles.scss';

const ModalEditInfo = () => {
    const { 
        modalEditInfoState: { message, visible, itemId, status }, 
    } = useModalContextEditInfo();

    if(!visible) return null;

    return(
        <ModalComponentEditInfo 
            visible={visible}
            itemId={itemId}
            status={status}
        >
            <EditInfo 
                itemId={itemId}
                status={status}
            />
        </ModalComponentEditInfo>
    )
}

export default ModalEditInfo;