import React, {useEffect, useState} from 'react'
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data: oneUser, loading: loadingOneUser} = useQuery(GET_USER, {variables: {
        id: 1
        }})
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)
    const [newUser] = useMutation(CREATE_USER)

    console.log(oneUser )

    useEffect(() => {
        if(!loading) {
            setUsers(data.getAllUsers )
        }
    }, [data])

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }

    const getAllUsers = e => {
        e.preventDefault()
        refetch()
    }

    return (<div>
            <form style={{margin: '0 auto'}}>
                <input type={`text`} placeholder={`user name`} value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <input type={`number`} placeholder={`age`} value={age} onChange={e => setAge(e.target.value)}/>
                <div>
                    <button onClick={e => addUser(e)}>Create</button>
                    <button onClick={e => getAllUsers(e)}>Get users</button>
                </div>
            </form>
            <div>
                {loading ? 'loadnig...' :
                    users.map(user => <>
                            <hr/>
                            <div>
                                <h1>{user.username}</h1>
                                <h3>{user.age}</h3>
                            </div>
                        </>)}
            </div>
        </div>)
}

export default App
