import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../../components/MiniGame/Timer/useCountdown';
import styles from "./ExploreCategories.module.css";

const ExpiredNotice = () => {
    return (
        <div className={styles.expired_notice}>
            <span>Expired!!!</span>
        </div>
    );
};

const ShowCounter = ({ hours, minutes, seconds }: any) => {
    return (
        <div className={styles.show_counter}>
            <a
                className={styles.countdown_link}
            >
                <DateTimeDisplay value={hours} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} isDanger={false} />
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
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;