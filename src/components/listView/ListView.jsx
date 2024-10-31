"use client"

import { useEffect, useState } from "react";
import styles from './listView.module.css';
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import SubLoading from "../loading/SubLoading";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const ListView = (
    {
        title,
        headers,
        initData,
        updatePath,
        reqPath,
        backPath
    }
) => {

    const router = useRouter();

    const [data, setData] = useState(initData);
    const [isloading, setIsLoading] = useState(false);

    // Check if there's data to display
    if (!data || data.length === 0) {
        return <div className={styles.container}>No data available</div>;
    }

    const fetchData = async () => {
        try {
            const res = await axios.get(`${reqPath}`);
            setData(res.data);
        } catch (error) {
            toast.error('An unexpected error occurred while fetching data.');
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        fetchData();
    },[initData]);

    const handleEdit = (docId) => {
        setIsLoading(true);
        router.push(`${updatePath}${docId}`);
        //setIsLoading(false);
    }

    /* const handleDelete = async(docId) => {
        setIsLoading(true);

        try {

            const res = await axios.delete( `${reqPath}`, {data: {docId}});

            if (res.status === 200) {

                fetchData();

                setIsLoading(false);

                toast.success(res.data.message, {
                    autoClose: 2000,
                });
            }
            else {
                throw new Error;
            }
        }
        catch(err) {
            setIsLoading(false);
            toast.error('An unexpected error occurred while processing.');
        }
    } */

    const goBack = () => {
        setIsLoading(true);
        router.push(`${backPath}`);
    }

    return (
        <div className={styles.container}>
            {isloading && <SubLoading />}
            {(title) && <h2 className={styles.title}>
                <button className={styles.backBtn} title="Create Location" onClick={goBack}><HiArrowLeft /></button>
                {title}
            </h2>}

            <div className={styles.tableContainer}>
            <table className={styles.table}>
            <thead>
                <tr>
                {headers.map((header) => (
                    <th key={header}>{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                    ))}
                    <td className={styles.edit}>
                        <button title="Edit" className={styles.editBtn} onClick={() => handleEdit(row.docID || row[0])}><MdEdit /></button>
                        {/* <button title="Delete" className={styles.deleteBtn} onClick={() => handleDelete(row.docID)}><MdDeleteForever /></button> */}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default ListView;
