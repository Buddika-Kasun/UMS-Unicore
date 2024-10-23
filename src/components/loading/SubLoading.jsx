import LoadingComp from '@/app/(all-pages)/loadingPage/page';
import styles from './subLoading.module.css';

const SubLoading = () => {
    return (
        <div className={styles.load}><LoadingComp /></div>
    );
}

export default SubLoading;