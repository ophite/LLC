import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/lib';
var faker = window.faker = require('faker');

var gen = (function () {

    var cache = {}

    return function (len) {
        if (cache[len]) {
            // return cache[len]
        }

        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push({
                id: i + 1,
                grade: Math.round(Math.random() * 10),
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                birthDate: faker.date.past(),
                country: faker.address.country(),
                city: faker.address.city()
            })
        }

        cache[len] = arr;
        return arr
    }
})();

var columns = [
    { name: 'index', title: '#', width: 150 },
    { name: 'firstName' },
    { name: 'country' },
    { name: 'grade' }
];

var LEN = 2000;
var data = gen(LEN);


class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.onColumnResize = this.onColumnResize.bind(this);
    }

    onColumnResize(firstCol, firstSize, secondCol, secondSize) {
        firstCol.width = firstSize;
        this.setState({})
    }

    render() {
        return (
            <div>
                <DataGrid
                    idProperty='id'
                    dataSource={data}
                    columns={columns}
                    groupBy={['country','grade']}
                    style={{height: 400}}
                    onColumnResize={this.onColumnResize}
                />
            </div>
        );
    }
}

export default App;
