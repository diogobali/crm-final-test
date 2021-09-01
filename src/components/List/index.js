import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import { useDrag, useDrop } from 'react-dnd';
import { Container } from './styles';

export default function List({ title, data, index: listIndex, adm, sendAdm }){


    var aux = 0;

    return(
        <Container adm={adm} sendAdm={sendAdm}>
            <header>
                <h2>{title}</h2>
            </header>

            <ul>
                    { data.map((card, index) => {                    
                        if(card.status == listIndex){
                            if(aux == 0){
                                aux = 1;
                            }
                            return(
                            <Card 
                                key={card.id}
                                index={index} 
                                data={card}
                                listIndex={listIndex}
                                button={data?.button}
                                status={card.status} 
                                sendAdm={sendAdm}
                            />
                            )
                        }
                    }

                    )}  
                    {
                        aux == 0 && <Card 
                                        key={0}
                                        index={0} 
                                        data={0}
                                        listIndex={listIndex}
                                        className="cardExample"
                                    />
                    }
            </ul>

        </Container>
    );
}