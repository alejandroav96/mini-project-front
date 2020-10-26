import List from '@material-ui/core/List';
import React, { useEffect, useState } from "react";
import { ListUsers } from "../../components/ListUsers/ListUsers";
import { Loading } from '../../components/Loading/Loading';
import { User } from "../../models/User";
import { UsersService } from "../../services/users";
import './Home.scss';

export interface HomeProps { }
export const Home: React.FC<HomeProps> = () => {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        getData();
    });

    const getData = () => {
        if (users == null) {
            UsersService.getAll().then((res: any) => {
                setUsers(res.data);
            })
        }
    }

    const generateList = users?.map(
        user => (
            <ListUsers key={user.uid} user={user}></ListUsers>
        )
    )
    
    if (users){
        return (
            <div>
                <List className="list">
                    {generateList}
                </List>
            </div>
        )
    } else {
        return (<Loading />)
    }
    
}