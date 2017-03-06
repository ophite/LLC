import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-toolbox/lib/input';
import { Autocomplete, Button, Checkbox } from 'react-toolbox/';
import { ThemeProvider } from 'react-css-themr';
import { INPUT } from 'react-toolbox/lib/identifiers';
import { Tab, Tabs } from 'react-toolbox';


import BaseLayoutPage from '../baseLayout/Base.layout.page.jsx';

import inputCustom from '../../../assets/theme/_autocomplite.scss';
import styles from "../../../assets/styles/main.scss";

const tabs = ['Адрес для кореспонденции', 'Дополнительные атрибуты'];
const countriesArray = {
    '1': 'Текст 1',
    '2': 'Текст 2',
    '3': 'Текст 3',
    '4': 'Текст 4'
};

class PhysicalPersonEditing extends BaseLayoutPage {

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
        index: 0,
        values: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': '',
            '10': '',
            '11': '',
            '12': '',
            '13': '',
        },
        inputValues: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': '',
            '10': '',
            '11': '',
            '12': '',
            '13': '',
            '14': '',
            '16': '',
            '16': '',
            '17': '',
            '18': '',
            '19': '',
            '20': '',
        },
    };

    handleChange = (name, value) => {
        this.setState({ ...this.state, [name]: value });
    };

    handleInputChange = (id, value) => {
        const inputValues = JSON.parse(JSON.stringify(this.state.inputValues));
        inputValues[id] = value;

        this.setState({ inputValues });
    };

    handleSimpleChange = (id, value) => {
        const values = JSON.parse(JSON.stringify(this.state.values));
        const ids = value.split('$');
        values[id] = ids[ids.length - 1];

        this.setState({ values });
    };

    handleTabChange = (index) => {
        this.setState({ index });
    };

    renderAttributesTab() {
        return (
            <div>
                <Input type='text' label='Код клиента' name='name' value={this.state.inputValues['1']}
                       onChange={this.handleInputChange.bind(this, '1')}/>

                <Autocomplete
                    direction="down"
                    label="Тип клиента"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '3')}
                    source={countriesArray}
                    value={this.state.values['3']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Признак удаления"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '4')}
                    source={countriesArray}
                    value={this.state.values['4']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Пенсионер"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '5')}
                    source={countriesArray}
                    value={this.state.values['5']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Признак инсайдера"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '6')}
                    source={countriesArray}
                    value={this.state.values['6']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Планируемые обороты"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '7')}
                    source={countriesArray}
                    value={this.state.values['7']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Институционный сектор экономики"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '8')}
                    source={countriesArray}
                    value={this.state.values['8']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Форма владения"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '9')}
                    source={countriesArray}
                    value={this.state.values['9']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Корпоративность"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '10')}
                    source={countriesArray}
                    value={this.state.values['10']}
                    className={styles["input-autocomplete"]}
                />

                <Autocomplete
                    direction="down"
                    label="Должность"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '11')}
                    source={countriesArray}
                    value={this.state.values['11']}
                    className={styles["input-autocomplete"]}
                />

                <h2 className={styles["title"]}>Данные про регистрацию физичиской особы как предпринимателя</h2>

                <Autocomplete
                    direction="down"
                    label="Дата регистрации"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '12')}
                    source={countriesArray}
                    value={this.state.values['12']}
                    className={styles["input-autocomplete"]}
                />

                <Input type='text' label='Орган регистрации' name='name' value={this.state.inputValues['2']}
                       onChange={this.handleInputChange.bind(this, '2')}/>

                <Input type='text' label='№ записи в регистрации' name='name' value={this.state.inputValues['3']}
                       onChange={this.handleInputChange.bind(this, '3')}/>

                <Autocomplete
                    direction="down"
                    label="Вид экономической деятельности"
                    multiple={false}
                    onChange={this.handleSimpleChange.bind(this, '13')}
                    source={countriesArray}
                    value={this.state.values['13']}
                    className={styles["input-autocomplete"]}
                />

                <h2 className={styles["title"]}>Характеристика источника поступлений денежных средств и других ценностей
                    на счета клиентов</h2>

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

                <Input type='text' label='МФО/SWIFT' name='name' value={this.state.inputValues['4']}
                       onChange={this.handleInputChange.bind(this, '4')}/>

                <Input type='text' label='Номер счета' name='name' value={this.state.inputValues['5']}
                       onChange={this.handleInputChange.bind(this, '5')}/>

                <Input type='text' label='Валюта' name='name' value={this.state.inputValues['6']}
                       onChange={this.handleInputChange.bind(this, '6')}/>
            </div>
        );
    }

    renderAddressTab() {
        return (
            <div>
                <Input type='text' label='Индекс' name='name' value={this.state.inputValues['7']}
                       onChange={this.handleInputChange.bind(this, '7')}/>

                <Input type='text' label='Улица' name='name' value={this.state.inputValues['8']}
                       onChange={this.handleInputChange.bind(this, '8')}/>

                <Input type='text' label='Дом' name='name' value={this.state.inputValues['9']}
                       onChange={this.handleInputChange.bind(this, '9')}/>

                <Input type='text' label='Квартира' name='name' value={this.state.inputValues['10']}
                       onChange={this.handleInputChange.bind(this, '10')}/>

                <Input type='text' label='Страна' name='name' value={this.state.inputValues['11']}
                       onChange={this.handleInputChange.bind(this, '11')}/>

                <Input type='text' label='Страна' name='name' value={this.state.inputValues['12']}
                       onChange={this.handleInputChange.bind(this, '12')}/>

                <Input type='text' label='Район' name='name' value={this.state.inputValues['13']}
                       onChange={this.handleInputChange.bind(this, '13')}/>
            </div>
        );
    }

    render() {
        return (
            <div ref={(ref) => this.currentLayoutDom = ref}>
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
                                onChange={this.handleSimpleChange.bind(this, '1')}
                                source={countriesArray}
                                value={this.state.values['1']}
                                className={styles["input-autocomplete"]}
                            />

                            <Input type='text' label='Контактное имя' name='name' value={this.state.inputValues['14']}
                                   onChange={this.handleInputChange.bind(this, '14')}/>

                            <Input type='text' label='Идентификационный код' name='name'
                                   value={this.state.inputValues['15']}
                                   onChange={this.handleInputChange.bind(this, '15')}/>

                            <Autocomplete
                                direction="down"
                                label="Подразделение"
                                multiple={false}
                                onChange={this.handleSimpleChange.bind(this, '2')}
                                source={countriesArray}
                                value={this.state.values['2']}
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
                            <Input type='tel' label='Телефон' name='phone' value={this.state.inputValues['16']}
                                   onChange={this.handleInputChange.bind(this, '16')}/>

                            <Input type='email' label='e-mail' value={this.state.inputValues['17']}
                                   onChange={this.handleInputChange.bind(this, '17')}/>

                            <Input type='text' label='Факс' name='name' value={this.state.inputValues['18']}
                                   onChange={this.handleInputChange.bind(this, '18')}/>

                            <Input type='tel' label='Мобильный телефон' name='phone'
                                   value={this.state.inputValues['19']}
                                   onChange={this.handleInputChange.bind(this, '19')}/>

                            <Input type='text' label='Заметки' name='name' value={this.state.inputValues['20']}
                                   onChange={this.handleInputChange.bind(this, '20')}/>
                        </div>
                    </section>
                </div>

                <section className="section-full">

                    <div className="section-choose">
                        <Tabs index={this.state.index} onChange={this.handleTabChange} fixed>
                            <Tab label='Адрес для кореспонденции'>
                                {this.renderAddressTab()}
                            </Tab>
                            <Tab label='Дополнительные атрибуты'>
                                {this.renderAttributesTab()}
                            </Tab>
                        </Tabs>
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
