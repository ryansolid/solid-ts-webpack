import { A } from '@solidjs/router';
import './_style.scss';

export default () => {
    return (
        <div class="hello-world">
            <nav class="hello-world-navi-bar">
                <A
                    classList={{
                        'home-nav': true,
                        'navi-item': true,
                    }}
                    href="/"
                    activeClass="underlined" // 👈 Add the active class
                >
                    Home
                </A>
                <A
                    classList={{
                        'about-nav': true,
                        'navi-item': true,
                    }}
                    href="/about"
                    activeClass="underlined" // 👈 Add the active class
                >
                    About
                </A>
            </nav>

            <h1 class="hello-world-welcome">Welcome to Your Solid.js + TypeScript App</h1>
        </div>
    );
};
