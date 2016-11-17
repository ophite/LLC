import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input';
import {Autocomplete, Button, Checkbox} from 'react-toolbox/';
import { ThemeProvider } from 'react-css-themr';
import { INPUT } from 'react-toolbox/lib/identifiers';

import inputCustom from '../../../assets/theme/_autocomplite.scss';
import styles from "../../../assets/styles/main.scss";

const countriesArray = ['Тестовый текст 1', 'Тестовый текст 2', 'Тестовый текст 3', 'Тестовый текст 4', 'Тестовый текст 5', 'Тестовый текст 6'];

class PhysicalPersonEditing extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
        check9: false,
        simple: 'Тестовый текст',

    };

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    handleSimpleChange = (value) => {
        this.setState({simple: value});
    };

    render() {
        return (

            <div>
                <h2 className={styles["title"]}>Редактирование контрагента физического лица</h2>
                <div className="section-wrap">

                    <section className="section-half">
                        <div className="section-header">
                            <h2 className={styles["title-section"]}>Общее</h2>
                        </div>

                        <div className="section-content">
                            <Autocomplete
                                direction="down"
                                label="Физическое лицо"
                                multiple={false}
                                onChange={this.handleSimpleChange}
                                source={countriesArray}
                                value={this.state.simple}
                                className={styles["input-autocomplete"]}
                            />

                            <Input type='text' label='Контактное имя' name='name' value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>

                            <Input type='text' label='Идентификационный код' name='name' value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>

                            <Autocomplete
                                direction="down"
                                label="Подразделение"
                                multiple={false}
                                onChange={this.handleSimpleChange}
                                source={countriesArray}
                                value={this.state.simple}
                                className={styles["input-autocomplete"]}
                            />

                            <Checkbox
                                checked={this.state.check1}
                                label="Резидент"
                                onChange={this.handleChange.bind(this, 'check1')}
                            />

                            <Checkbox
                                checked={this.state.check8}
                                label="Инсайдер"
                                onChange={this.handleChange.bind(this, 'check8')}
                            />
                        </div>
                    </section>

                    <section className="section-half">
                        <div className="section-header">
                            <h2 className={styles["title-section"]}>Контактная информация</h2>
                        </div>

                        <div className="section-content">
                            <Input type='tel' label='Телефон' name='phone' value={this.state.phone}
                                   onChange={this.handleChange.bind(this, 'phone')}/>

                            <Input type='email' label='e-mail' value={this.state.email}
                                   onChange={this.handleChange.bind(this, 'email')}/>

                            <Input type='text' label='Факс' name='name' value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>

                            <Input type='tel' label='Мобильный телефон' name='phone' value={this.state.phone}
                                   onChange={this.handleChange.bind(this, 'phone')}/>

                            <Input type='text' label='Заметки' name='name' value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>
                        </div>
                    </section>
                </div>

                <section className="section-full">

                    <div className="section-choose">
                        <ThemeProvider theme={{[INPUT]: inputCustom}}>
                            <Autocomplete
                                direction="down"
                                label="Регистрационная информация (выберите раздел для заполнения)"
                                multiple={false}
                                onChange={this.handleSimpleChange}
                                source={countriesArray}
                                value={this.state.simple}
                                className={styles["input-autocomplete"]}
                            />
                        </ThemeProvider>
                    </div>

                    <div className="section-content">
                        <Input type='text' label='Код клиента' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>

                        <Autocomplete
                            direction="down"
                            label="Тип клиента"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Признак удаления"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Пенсионер"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Признак инсайдера"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Планируемые обороты"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Институционный сектор экономики"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Форма владения"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Корпоративность"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Autocomplete
                            direction="down"
                            label="Должность"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <h2 className={styles["title"]}>Данные про регистрацию физичиской особы как предпринимателя</h2>

                        <Autocomplete
                            direction="down"
                            label="Дата регистрации"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <Input type='text' label='Орган регистрации' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>

                        <Input type='text' label='№ записи в регистрации' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>

                        <Autocomplete
                            direction="down"
                            label="Вид экономической деятельности"
                            multiple={false}
                            onChange={this.handleSimpleChange}
                            source={countriesArray}
                            value={this.state.simple}
                            className={styles["input-autocomplete"]}
                        />

                        <h2 className={styles["title"]}>Характеристика источника поступлений денежных средств и других ценностей на счета клиентов</h2>

                        <div className={styles["checkbox-container"]}>
                            <Checkbox
                                checked={this.state.check2}
                                label="Кредитный средства"
                                onChange={this.handleChange.bind(this, 'check2')}
                            />

                            <Checkbox
                                checked={this.state.check3}
                                label="Беспроцентная финансовая помощь"
                                onChange={this.handleChange.bind(this, 'check3')}
                            />

                            <Checkbox
                                checked={this.state.check4}
                                label="Наличные поступления"
                                onChange={this.handleChange.bind(this, 'check4')}
                            />

                            <Checkbox
                                checked={this.state.check5}
                                label="Заработная плата"
                                onChange={this.handleChange.bind(this, 'check5')}
                            />

                            <Checkbox
                                checked={this.state.check6}
                                label="Поступления из-за границы"
                                onChange={this.handleChange.bind(this, 'check6')}
                            />

                            <Checkbox
                                checked={this.state.check7}
                                label="Поступления с собственных счетов"
                                onChange={this.handleChange.bind(this, 'check7')}
                            />

                            <Checkbox
                                checked={this.state.check9}
                                label="Поступления от продажи имущества"
                                onChange={this.handleChange.bind(this, 'check9')}
                            />
                        </div>

                        <h2 className={styles["title"]}>Счет клиента который открыт в другом банке</h2>

                        <Input type='text' label='МФО/SWIFT' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>

                        <Input type='text' label='Номер счета' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>

                        <Input type='text' label='Валюта' name='name' value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>
                    </div>
                </section>

                <div className={styles["btn-right"]}>
                    <Button label='OK' raised primary className={styles["btn"]}/>
                    <Button label='Отмена' accent className={styles["btn"]}/>
                </div>
            </div>

        );
    }
}

export default PhysicalPersonEditing;