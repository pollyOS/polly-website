import styled, {keyframes} from 'styled-components';


const fadeIn = keyframes`
    from {
        transform: scale(0.85) rotate(-20deg);
        opacity: 0;
    }
    to {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
`

const Wrapper = styled.div`
display: flex;
width: 100vw;
height: 100vh;
place-items: center;
> img {
    margin: 0 auto;
    max-width: 300px;
    height: auto;
    animation: ${fadeIn} 1s;
}
`

export default function Home(props){
    return <Wrapper>
        <img src='/img/logo.png'/>
    </Wrapper>
}