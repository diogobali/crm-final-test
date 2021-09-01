import styled from 'styled-components';

export const Container= styled.div`
    .login{
        display:flex;
        height: 100vh;
        width: 100vh;
        
        div{
            width: 400px;
            height: 400px;
            margin: auto;
            display:flex;
            flex-direction: column;

            h1{
                margin-bottom: 35px;
                
            }
        }
    }

    form{
        display:flex;
        flex-direction: column;

        button{
            height: 50px;
            border-radius: 8px;
            font-weight: 500;
            background: #835afd;
            color: #fff;
            padding: 0 32px;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 0;
            transition: filter 0.2s; 
            width: 80%;
        }

        input{
            width:80%;
            margin-bottom: 20px;
        }
    }

`;