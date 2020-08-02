import React, {useState, useEffect} from 'react';
import { Button, Transition } from "semantic-ui-react";
import './Join.scss'
import Logo from './../../components/Logo/Logo'

const JoinRoom = ({ location, history }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const joinRoom = () => {
        let randomRoom = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i=0; i < 7; i++) {
            randomRoom += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        history.push({
            pathname: `/room/${randomRoom}`,
            state: { from: location }
        })

    }


    return (
        <div className='joinOuterContainer'>
            <Transition visible={mounted} animation='scale' duration={500}>
                <div className='joinInnerContainer'>
                    <Logo/>
                    <section>
                        <div className='mid'>
                            <h2>Watch videos with friends from the same room or far away!</h2>
                        </div>
                        <Button
                            content='Create a room'
                            className='button-join'
                            onClick={joinRoom}
                        />
                    </section>
                </div>
            </Transition>
        </div>
    )
}


export default JoinRoom;
