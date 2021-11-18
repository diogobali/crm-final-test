import styled, { css } from 'styled-components';

export const Container= styled.div`
    
    position:relative;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(192,208,230, 0.8);
    border-top: 20px solid rgba(230, 236, 245, 0.4);
    cursor: grab;
    
    &.cardExample {
        border: 2px dashed rgba(0,0,0, 0.2);
        padding-top: 31px;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        cursor: grabbing;
        min-height: 80px;

        p, img, span {
            opacity: 0;
        }
    }


    header{
        position:absolute;
        top:-22px;
        left: 15px;
    }

    p{
        font-weight:500;
        line-height: 20px;
    }



    img{
        width:24px;
        height: 24px;
        border-radius: 2px;
        margin-top: 5px;
    }

    .card--status{
        font-size: 0.9em;
        font-weight:400;
    }

    .btn-info{
        background: none;
        border:none;
        cursor: pointer;
        
    }

    #inputSendDocumentMissing{
        display:none;
    }

    .labelSendDocumentMissing{
        background: #f3f3f3;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
        display:flex;
        padding: 0.3em;
        text-align:center;
        align-items:center;
        justify-content:center;

        &:hover{
            filter: bright  ness(80%);
        }
    }

    .buttonsAdm{
        display:flex;
        gap: 8px;


        button{
            font-size: 0.8em;
            padding: 0.3em;
            border-radius: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
        }
    }

    .btn-sendAdm{
        font-size: 0.8em;
        padding: 0.3em;
        border-radius: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .card-info{
        display:flex;
        align-items:center;
        justify-content:space-between;
    }



    ${props => props.isDragging && css`
        border: 2px dashed rgba(0,0,0, 0.2);
        padding-top: 31px;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        cursor: grabbing;

        p, img, span {
            opacity: 0;
        }
    `}

    ${props => props.hasStatus == 'DECLINADA' && css`
        background-color:red;
    `}
    
    ${props => props.hasStatus == 'ANALISE OPERADORA' && css`
        background-color:orange;
    `}

    ${props => props.hasStatus == 'EMISSAO E ASSINATURA' && css`
        background-color:yellow;
    `}

    ${props => props.hasStatus == 'AGUARDANDO PAGAMENTO' && css`
        background-color:blue;
    `}

    ${props => props.hasStatus == 'IMPLANTADA' && css`
        background-color:lime;
    `}

    ${props => props.hasStatus == 'IMPLANTADA INATIVA' && css`
        background-color:purple;
    `}

    ${props => props.isScheduled && (props.moment2 - 3600000) < props.moment && css`
        background-color:yellow;
    `}

    ${props => props.isScheduled && (props.moment2) < props.moment && css`
    background-color:red;
`}


`;



export const Label = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display:inline-block;
    background: ${props => props.color};   
`;




