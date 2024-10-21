import React from "react";
import styles from './catalog.module.css';

const ListView = () => {
    return (
      <>
      <div>
        <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Cost Center</th>
              <th>Location Type</th>
              <th>Active</th>
              <th>Building No</th>
              <th>Floor No</th>
              <th>Location Name</th>
              <th>Location Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Faculty of Technology</td>
              <td>Center 1</td>
              <td>Lecture hall</td>
              <td>✔️</td>
              <td>B1</td>
              <td>02</td>
              <td>Lecure Hall Complex</td>
              <td>SF 01</td>
            </tr>
            <tr>
              <td>Faculty of Engineering</td>
              <td>Center 2</td>
              <td>Auditorium</td>
              <td>❌</td>
              <td>A1</td>
              <td>GF</td>
              <td>Auditorium</td>
              <td>A 01</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        </div>
        </div>
      </>
    );
  };

  export default ListView;