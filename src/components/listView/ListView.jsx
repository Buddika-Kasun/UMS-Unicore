"use client"

import { useState } from "react";
import styles from './listView.module.css';
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import SubLoading from "../loading/SubLoading";

const ListView = ({ headers, data, path}) => {

    const router = useRouter();

    const [isloading, setIsLoading] = useState(false);

    // Check if there's data to display
    if (!data || data.length === 0) {
        return <div className={styles.container}>No data available</div>;
    };

    const handleEdit = (docId) => {
        setIsLoading(true);
        router.push(`${path}${docId}`);
    }

    const goBack = () => {
        setIsLoading(true);
        router.push('/gestor/master');
    }

    return (
        <div className={styles.container}>
            {isloading && <SubLoading />}
            <h2 className={styles.title}>
                <button className={styles.backBtn} title="Create Location" onClick={goBack}><HiArrowLeft /></button>
                Locations
            </h2>
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
                        <button className={styles.button} onClick={() => handleEdit(row.docID)}>Edit</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default ListView;
