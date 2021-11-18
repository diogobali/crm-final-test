import styled, { css } from 'styled-components';

export const Container= styled.div`
    
    .notification-bar{
        z-index: 9999;
        position: absolute;
        ul{
            position:relative;
            background: rgba(193, 218, 255, 1);
            display:flex;
            flex-direction: column;
            margin-top: 35px;
            padding: 0.5em;
            width: 200px;
            gap: 0.4em !important;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: scroll;

            li{
                background: rgba(193,218,255, 0.7);
                height: 50px;
                gap: 0.1em;
                border: 2px solid #fff;
                border-radius: 4px;
                border-width:0.05em;
                text-align:start;
                padding: 0.2em;
                font-size: 0.8em;
                max-width: 190px;
            }

            .visualized{
                opacity: 50%;
                background: #ccc;
            }

            button{
                border:none;
                background: transparent;
                cursor: pointer;
            }
    }
`
