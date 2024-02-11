import { A } from '@solidjs/router';
import styles from './_style.module.scss';

export default () => {
    return (
        <div class={styles['hello-world']}>
            <nav class={styles['hello-world-navi-bar']}>
                <A
                    classList={{
                        'home-nav': true,
                        'navi-item': true,
                    }}
                    href="/" // 👈 Add the active class
                >
                    Home
                </A>
                <A
                    href="/about"
                    activeClass="underlined" // 👈 Add the active class
                >
                    About
                </A>
            </nav>

            <h1 class={styles['hello-world-welcome']}>Welcome to Your Solid.js + TypeScript App</h1>
        </div>
    );
};
