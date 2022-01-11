import styled from 'styled-components';



export const Container= styled.div`
    padding: 0 15px;
    height: 100%;
    min-height: 80vh;
    flex: 1;
    opacity: ${props => 
        ((props.adm && props.userData.perfil == 0) ? 0.6 
        : (!props.adm && props.userData.perfil == 0) ? 1
        : (!props.adm && props.userData.perfil == 2) ? 0.6 
        : (props.adm && props.userData.perfil == 2) ? 1 : null
    )};




    & + div{
        border-left: 1px solid rgba(0,0,0, 0.05);
    }


        header{
            display:flex;
            justify-content:space-between;
            align-items:center;
            height: 42px;

            h2{
                font-weight:500;
                font-size: 16px;
                padding: 0 10px;
            }

            button{
                height:42px;
                width:42px;
                border-radius: 18px;
                background: #3b5bfd;
                border: 0;
                cursor: pointer;
            }
        }
        ul{
            margin-top: 30px;
        }
`;

