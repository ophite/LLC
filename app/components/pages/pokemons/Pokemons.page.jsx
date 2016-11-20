import Pokemon from '../../pokemons/Pokemon.jsx';
import styles from './PokemonsPage.scss';
import { Button } from 'react-toolbox/lib/button';
import { Link } from 'react-router';


class PokemonsPage extends React.Component {
    render() {
        return (
            <article>
                <header className={styles.header}>
                    <h2 className={styles.title}>Data-grid demo</h2>
                    <ul className={styles.navList}>
                        <li>
                            <Link className={styles.navItem} to={'/grid'}>Data-grid</Link>
                            <Link className={styles.navItem} to={'/person'}>Personal data</Link>
                        </li>
                    </ul>
                </header>
                <section className={styles.content}>
                    <p>
                       React Toolbox is a set of React components that implements Google Material Design specification.
                       It's built on top of some the trendiest proposals like CSS Modules (written in SASS), Webpack and ES6.
                       The library harmoniously integrates with your Webpack workflow and it's easily customizable and very flexible.
                    </p>
                    <p>
                       Check our awesome documentation (which is built using React Toolbox) and try all the components with live examples.
                       We've created a playground so you don't need to install anything to fall in love with our components, so fun!
                    </p>
                    <a href="#/components">
                        <Button icon='bookmark' label='Try it now' raised primary />
                    </a>
                </section>
                <footer className={styles.footer}>
                    <p>LLC © 2016</p>
                </footer>
            </article>
        );
    }
}

PokemonsPage.propTypes = {
    pokemons: React.PropTypes.object,
    handleGetPokemons: React.PropTypes.func
};

export default PokemonsPage;
