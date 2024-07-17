import style from "./guesMaser.module.css";

const GueMaster = () => {
    return (
      <form className={style.container}>
        <h2>Reservations</h2>
        <div className={style.formGroup}>
            <label for="booking-type">Booking Type:</label>
            <select id="booking-type" name="booking-type">
              <option value="internal-use">Internal Use</option>
            </select>
        </div>
        <div className={style.formGroup}>
            <label for="event-title">Event Title:</label>
            <input type="text" id="event-title" name="event-title" placeholder="Value"/>
        </div>
        <div className={style.formGroup}>
            <label for="from-date">From Date:</label>
            <input type="date" id="from-date" name="from-date"/>
        </div>
        <div className={style.formGroup}>
            <label for="from-time">From Time:</label>
            <input type="time" id="from-time" name="from-time"/>
        </div>
        <div className={style.formGroup}>
            <label for="faculty">Faculty:</label>
            <select id="faculty" name="faculty">
                <option value="faculty-of-technology">Faculty of Technology</option>
                </select>
        </div>
        <div className={style.formGroup}>
            <label for="organizer">Organizer:</label>
            <select id="organizer" name="organizer">
                <option value="admin">Admin</option>
                </select>
        </div>
        <div className={style.formGroup}>
            <label for="reservation-remarks">Reservation Remarks:</label>
            <textarea id="reservation-remarks" name="reservation-remarks" placeholder="Value"></textarea>
        </div>
        <div className={style.formGroup}>
            <label for="repeat">Repeat:</label>
            <select id="repeat" name="repeat">
                <option value="none">None</option>
            </select>
        </div>
      </form>

    );
  };
  
  export default GueMaster;