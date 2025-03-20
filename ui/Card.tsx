"use client";

import React from "react";
import styles from "../styles/cardStyles.module.css";

export default function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardBody}> {body}</div>
    </div>
  );
}
