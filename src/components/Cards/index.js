import { Row } from "antd";
import React from "react";
import { BsPinFill, BsFillPersonFill } from "react-icons/bs"
import { MdLocationPin } from "react-icons/md"
import styles from "./style.module.scss"

export const CategoryCard = ({ title, value, desc, pin, location, user }) => {
    return (
        <div className={styles.catg_card}>
            <Row className={styles.row}>
                <p className={styles.title}>{title}</p>
                <div className={styles.icon_div}>
                    {location && <MdLocationPin className={styles.icon} />}
                    {pin && <BsPinFill className={styles.icon} />}
                    {user && <BsFillPersonFill className={styles.icon} />}
                </div>
            </Row>
            <p className={styles.val}>{value}</p>
            <p className={styles.desc}>{desc}</p>
        </div>
    )
}
export const LayoutCard = ({ children }) => {
    return (
        <div className={styles.card_layout}>
            {children}
        </div>
    )
}