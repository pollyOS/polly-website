import styled, {keyframes} from 'styled-components';
import Grid from 'styled-components-grid';
import content, {modules} from 'base/content/index';

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

const Wrapper = styled(Grid)`
width: 100vw;
height: 100vh;
place-items: top;
padding: 5vw;
justify-content: space-between;
box-sizing: border-box;
`

const Logo = styled.img`
    max-width: 100%;
    height: auto;
    animation: ${fadeIn} 1s;
`

export default function Home(props){
    return <Wrapper>
            <Grid.Unit size={{sm: 2/12}}>
                <Logo src='/img/logo.png'/>
            </Grid.Unit>
            <Grid.Unit size={{sm: 8/12}}>
                {content}
            </Grid.Unit>

            <Grid.Unit size={{sm: 3/12}}>
                <h4>On-chain</h4>
                {modules}
            </Grid.Unit>
            <Grid.Unit size={{sm: 3/12}}>
                <h4>Reusable</h4>
                {modules}
            </Grid.Unit>
            <Grid.Unit size={{sm: 3/12}}>
                <h4>Modules</h4>
                {modules}
            </Grid.Unit>
    </Wrapper>
}

export async function getStaticProps(){
    
    return {
        props: {}
    }
}