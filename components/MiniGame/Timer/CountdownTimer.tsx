import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';
import styles from "./timer.module.css";

const ExpiredNotice = () => {
    return (
        <div className={styles.expired_notice}>
            <span>Expired!!!</span>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }: any) => {
    return (
        <div className={styles.show_counter}>
            <a
                className={styles.countdown_link}
            >
                <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            </a>
        </div>
    );
};

const CountdownTimer = ({ targetDate }: any) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;