'use client'

import { Box, useTheme } from "@mui/material";
import styles from './section-title.module.scss';
import { FC } from "react";

export interface Props {
    maintitle: string
    subTitle: string
}

const SectionTitle: FC<Props> = ({ maintitle, subTitle }) => {

    const {
        palette: { home }
    } = useTheme()

    return (
        <Box component={'div'} className={styles.title}>
            <Box component={'div'} className={styles.maintitle} style={{ color: home.gray50 }}>
                {maintitle}
            </Box>
            <Box component={'div'} className={styles.subTitle} style={{ color: home.gray100 }}>
                {subTitle}
            </Box>
        </Box>
    )
}

export default SectionTitle; 
