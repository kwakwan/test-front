import Head from "next/head";
import { FC, ReactNode } from "react";
import styles from '../../styles/Home.module.css';

interface LayoutProps {
    children: ReactNode;
    meta: {
        title: string;
        description: string;
    }
}

const Layout: FC<LayoutProps> = ({ children, meta }) => {

    const year = new Date().getFullYear()
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description}></meta>
            </Head>
            {children}
            <footer className={styles.footer}>
                &copy; leboncoin - {year}
            </footer>
        </>
    )

}

export default Layout;