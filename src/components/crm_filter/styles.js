import styled, { css } from 'styled-components';

export const Container= styled.div`
    
    .crm-filter{
        padding: 1em;
        width: 200px;
        height: 300px;
        overflow-y: scroll;
        z-index: 999;
        position:absolute;
        top: 0;
        margin-top: 35px;
        background: #ccc;
        ul{
            display:flex;
            list-style:none;
            text-decoration: none;
            flex-wrap: wrap;
            gap: 1.2em;
            align-items:start;
            width: 100%;
            li{
                width: auto;
                font-size: 0.8em;
                justify-content:start;
                align-items:center;
                display:flex;
                label{
                    margin-left: 5px;
                }
            }
        }
    }

    .aroundAll{
        display:flex;
        justify-content:right;
        padding: 0.3em;
        margin-right: 15px;
        margin-top: 5px;
        align-items:center;
        position:relative;
    }

    .filter-icon{
        position:absolute;
    }
`
