import React, {useState, useEffect} from 'react';
import { Button, Transition } from "semantic-ui-react";

const JoinRoom = ({ location, history }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);



    return (
        <div className='joinOuterContainer'>
            <Transition visible={mounted} animation='scale' duration={500}>
                <div>
                    <section>
                        <div className='mid'>
                            <h2>Watch videos with friends from the same room or far away!</h2>
                        </div>
                        <Button
                            content='Start a room'
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
