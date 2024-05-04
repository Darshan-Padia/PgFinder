import React, { useContext, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import AuthContext from '../context/AuthProvider';
import { authState } from './Atom/AuthStateAtom';
import { useRecoilValue } from 'recoil';
const TestPage = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        console.log('auth');
        console.log(auth);

    }, []);
    const testApi = () => {


        // header bearer
        axiosPrivate.get('/api/auth/test'

        ).then(
            (response) => {
                console.log(response.data);
            }

        )

    };

    return (
        <div>
            {console.log(auth)}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={testApi}>Test</button>
        </div>
    );
};

export default TestPage;
