"use client"

import { toast } from "react-toastify";
import styles from "./userTable.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const UserTable = ({users1}) => {

    const [users, setUsers] = useState(users1);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/pages/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    /* useEffect(() => {
         fetchUsers();
     }, []); */

    const onDelete = async(e, id) => {
        console.log(id);

        e.preventDefault();

        try {

            const data = {id};

            const res = await axios.delete('/api/pages/users', {data});

            console.log("res = ", res)
            if (res.status === 201) {
                //console.log(res.data.message);//
                // setIsLoading(false);
                fetchUsers();
                toast.success(res.data.message, {
                    autoClose: 2000,
                    //onClose: () => {
                    //    route.push('/profile');
                    //}
                });
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (

        <div className={styles.tableContainer}>
        <table className={styles.userTable}>
            <thead>
            <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {users && users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className={styles.deleteButton}
                                onClick={(e) => onDelete(e, user._id)}
                            >
                            Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default UserTable;