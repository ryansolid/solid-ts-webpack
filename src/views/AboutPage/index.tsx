import { A } from '@solidjs/router';
import './_style.scss';

export default () => {
    return (
        <div class="about-page">
            <nav class="about-page-navi-bar">
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

            <p class="about-page-text">This is an about page</p>
        </div>
    );
};
