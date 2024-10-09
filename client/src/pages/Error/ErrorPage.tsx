import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage(): JSX.Element {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.errorContainer}>
      <img src="../../../public/errorPage/anton.png" alt="Error" className={styles.animatedImage} />
      {showText && <div className={styles.errorText}>ОЛОЛО НЕ ПРОЙДЕТ!!!</div>}
      {showText && (
        <button type="button" onClick={() => navigate(-1)} className={styles.errorButton}>
          Попробуй еще раз!
        </button>
      )}
    </div>
  );
}
